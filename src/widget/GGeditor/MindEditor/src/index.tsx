import { Col, Row } from 'antd';
import GGEditor, { Mind } from 'gg-editor';
import React from 'react';
import EditorMinimap from './components/EditorMinimap';
import { MindContextMenu } from './components/EditorContextMenu';
import { MindDetailPanel } from './components/EditorDetailPanel';
import { MindToolbar } from './components/EditorToolbar';
import styles from './index.less';
import MySave from './MySave';

GGEditor.setTrackable(false);
export default ({data}) => (
    <GGEditor className={styles.editor}>
      <Row className={styles.editorHd}>
        <Col span={20}>
          <MindToolbar />
        </Col>
        <Col span={4}>
          <MySave />
        </Col>
      </Row>
      <Row className={styles.editorBd}>
        <Col span={20} className={styles.editorContent}>
          <Mind data={data} className={styles.mind} />
        </Col>
        <Col span={4} className={styles.editorSidebar}>
          <MindDetailPanel />
          <EditorMinimap />
        </Col>
      </Row>
      <MindContextMenu />
    </GGEditor>
);
