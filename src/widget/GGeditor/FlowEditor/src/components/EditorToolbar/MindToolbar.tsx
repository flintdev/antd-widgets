import { Divider } from 'antd';
import React from 'react';
import { Toolbar } from 'gg-editor';
import ToolbarButton from './ToolbarButton';
import './index.less';

const FlowToolbar = () => (
  <Toolbar className={`toolbar`}>
    <ToolbarButton command="undo" />
    <ToolbarButton command="redo" />

    <ToolbarButton command="zoomIn" icon="zoom-in" text="Zoom In" />
    <ToolbarButton command="zoomOut" icon="zoom-out" text="Zoom Out" />
    <ToolbarButton command="autoZoom" icon="fit-map" text="Fit Map" />
    <ToolbarButton command="resetZoom" icon="actual-size" text="Actual Size" />

    <ToolbarButton command="append" text="Topic" />
    <ToolbarButton command="appendChild" icon="append-child" text="Subtopic" />

    <ToolbarButton command="collapse" text="Fold" />
    <ToolbarButton command="expand" text="Unfold" />
  </Toolbar>
);

export default FlowToolbar;
