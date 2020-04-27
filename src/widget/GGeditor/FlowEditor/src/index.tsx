import { Col, Row, Modal, Tooltip, Button } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import MySave from "./MySave";

import React from 'react';
import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { KoniItemPanel } from './components/EditorItemPanel';
import { FlowToolbar } from './components/EditorToolbar';
import MyKoniCustomNode from './MyKoniCustomNode';
import './index.less';

GGEditor.setTrackable(false);

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { data, viewOnly, showMimiMap, showContainer, customNode, handleNodeClick } = this.props;

    return (
      <GGEditor className={`editor`}>
        <MyKoniCustomNode />
        <Row className={`editorHd`} style={{ marginBottom: 20 }}>
          <Col span={20}>
            <FlowToolbar viewOnly={viewOnly} />
          </Col>
          {!viewOnly && <Col span={4}>
            <Tooltip
              title={"title"}
              placement="bottom"
              overlayClassName={`tooltip`}
            >
              <MySave />
            </Tooltip>
          </Col>
          }
        </Row>

        <Row className={`editorBd`}>
          {!viewOnly && <Col span={2} className={`editorSidebar`}>
            <KoniItemPanel customItems={customNode} />
          </Col>
          }
          <Col span={18 + ((!!showMimiMap || !!showContainer) ? 0 : 4) + (!viewOnly ? 0 : 2)} className={`editorContent`}>
            <Flow
              data={data}
              className={`flow`}
              // @ts-ignore
              onNodeClick={handleNodeClick}
            />
          </Col>
          {(!!showMimiMap || !!showContainer) &&
            <Col span={4} className={`editorSidebar`}>
              {!!showMimiMap && <EditorMinimap />}
              {!viewOnly && <FlowDetailPanel />}
            </Col>
          }
        </Row>
        {!viewOnly && <FlowContextMenu />}
      </GGEditor>
    )
  }
};
