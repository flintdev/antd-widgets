import { Col, Row, notification } from 'antd';
import GGEditor, { Koni, RegisterCommand, withPropsAPI } from 'gg-editor';

import React from 'react';

import EditorMinimap from './components/EditorMinimap';
import { KoniContextMenu } from './components/EditorContextMenu';
import { KoniDetailPanel } from './components/EditorDetailPanel';
import { KoniItemPanel } from './components/EditorItemPanel';
import { KoniToolbar } from './components/EditorToolbar';
import styles from './index.modules.less';
import MyKoniCustomNode from './MyKoniCustomNode';
import MySave from './MySave';
import 'antd/dist/antd.less';
import MyLayout from './MyLayout';

GGEditor.setTrackable(false);
const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description
  });
};

export default class App extends React.Component<any> {
  ref: any;
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleAfterChange = this.handleAfterChange.bind(this);
  }

  handeGroupClick(data) {

  }

  handleAfterChange(data: any) {
    const {action, item} = data;
    const {customNodes} = this.props;
    const graph = this.ref.current.graph;
    if (action === "add") {
      if (item.type === "group") {
        const groupName = `group-${graph.getGroups().length}`;
        graph.update(item, {...{label: `group-${graph.getGroups().length}`}});
        openNotificationWithIcon('success', 'Create new group', groupName)
      } else if (item.type === "edge") {
        // ensure tree structure, node has only one parent
        const nodeHasParent = new Set(graph.getEdges().filter(e => e.id !== item.id).map(e => e.target.id));
        
        // enforce next node from customNode
        const source = item.source.model.name;
        const target = item.target.model.name;

        // ensure no direct to each other
        // TODO: ensure no cycle
        const nodeHasChildren = new Set(graph.getEdges().filter(e => e.id !== item.id && (e.source.id === item.target.model.id && e.target.id === item.source.model.id)));

        const next = customNodes?.find(customNode => customNode.name === source)?.next || "";
        if (nodeHasParent.has(item.target.model.id) || nodeHasChildren.size > 0) {
          graph.remove(item);
          openNotificationWithIcon('warning', 'Failed to create edge', 'This edge break the tree structure, each node has at most one parent.')
        } else if (next.length > 0 && next.indexOf(target) === -1) {
          graph.remove(item);
          openNotificationWithIcon('warning', 'Failed to create edge', `[${source}] cannot direct to [${target}].`)
        }
      }
    }
  }

  render() {
    const { data, customNodes, hidePanel, hideMimiMap, handleNodeClick, handleNodeDoubleClick, handeGroupClick, handleSave } = this.props;
    return (
      <GGEditor className={styles.editor}>
        <Row className={styles.editorHd}>
          <Col span={20}>
            <KoniToolbar hidePanel={hidePanel} />
          </Col>
          {!hidePanel && (
            <Col span={4}>
              <MySave handleSave={handleSave} />
              <MyLayout customNodes={customNodes}/>
            </Col>
          )}
        </Row>
        <Row className={styles.editorBd}>
          {!hidePanel && (
            <Col span={2} className={styles.editorSidebar}>
              <KoniItemPanel customNodes={customNodes} />
            </Col>
          )}
          <Col span={16} className={styles.editorContent}>
            <Koni className={styles.koni}
              data={data}
              {...(hidePanel ? { orbit: { satellite: [] } } : {})}
              ref={this.ref}
              //@ts-ignore
              onNodeDoubleClick={handleNodeDoubleClick}
              onNodeClick={handleNodeClick}
              onGroupClick={handeGroupClick}
              onAfterChange={this.handleAfterChange}
            />
          </Col>
          <Col span={6} className={styles.editorSidebar}>
            {!hideMimiMap && <EditorMinimap />}
            {!hidePanel && <KoniDetailPanel />}
          </Col>
        </Row>
        {!hidePanel && <KoniContextMenu />}
        <MyKoniCustomNode />
        <RegisterCommand {...(hidePanel ? { name: "delete", config: { shortcutCodes: ["delete"] }, extend: "delete" } : {})} />
      </GGEditor>

    )

  }
};