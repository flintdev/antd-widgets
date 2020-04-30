import { Col, Row } from 'antd';
import GGEditor, { Koni, RegisterCommand } from 'gg-editor';

import React from 'react';

import EditorMinimap from './components/EditorMinimap';
import { KoniContextMenu } from './components/EditorContextMenu';
import { KoniDetailPanel } from './components/EditorDetailPanel';
import { KoniItemPanel } from './components/EditorItemPanel';
import { KoniToolbar } from './components/EditorToolbar';
import styles from './index.less';
import MyKoniCustomNode from './MyKoniCustomNode';
import MySave from './MySave';

GGEditor.setTrackable(false);
export default ({ data, customNodes, hidePanel, hideMimiMap, handleNodeClick, handleNodeDoubleClick, handleSave }: any) => (
  <GGEditor className={styles.editor}>
    <Row className={styles.editorHd}>
      <Col span={20}>
        <KoniToolbar hidePanel={hidePanel}/>
      </Col>
      {!hidePanel && (
        <Col span={4}>
          <MySave handleSave={handleSave} />
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
          {...(hidePanel ? {orbit: {satellite: []}} : {})}
          //@ts-ignore
          onNodeDoubleClick={handleNodeDoubleClick}
          onNodeClick={handleNodeClick}
        />
      </Col>
      <Col span={6} className={styles.editorSidebar}>
        {!hideMimiMap && <EditorMinimap />}
        {!hidePanel && <KoniDetailPanel />}
      </Col>
    </Row>
      {!hidePanel && <KoniContextMenu /> }
    <MyKoniCustomNode />
    <RegisterCommand {...(hidePanel ? {name:"delete", config: { shortcutCodes: ["delete"] }, extend:"delete"} : {})} />
  </GGEditor>

);
