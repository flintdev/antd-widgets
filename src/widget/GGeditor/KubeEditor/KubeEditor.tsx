import * as React from 'react';
import { Widget, WidgetProps } from "@flintdev/widget-builder";
import KubeEditorDev from './src';
import * as _ from 'lodash'

interface Params {
  data: any,
  customNodes?: any[],
  hideMimiMap?: string,
  hidePanel?: string
}

interface Events {
  onNodeSelect?: (args: object) => void,
  onNodeDoubleClick?: (args: object) => void,
  onSave?: (args: object) => void
}

export interface Props extends WidgetProps {
  params: Params,
  events?: Events
}

export default class Demo extends Widget<Props> {
  handleNodeClick = (data: any) => {
    const { events } = this.props;
    if (!!events?.onNodeSelect) events.onNodeSelect(_.get(data, ["item", "model"], {}));
  };

  handleNodeDoubleClick = (data: any) => {
    const { events } = this.props;
    if (!!events?.onNodeDoubleClick) events.onNodeDoubleClick(_.get(data, ["item", "model"], {}));
  };

  handleSave = (data: any) => {
    const { events } = this.props;
    if (!!events?.onSave) events.onSave(data);
  };

  renderCustomComponent() {
    const { params } = this.props;
    const { data, customNodes, hideMimiMap, hidePanel } = params;
    return (
      <>
        {!!data && (
          <KubeEditorDev
            data={data}
            customNodes={customNodes}
            hideMimiMap={hideMimiMap === "hide"}
            hidePanel={hidePanel === "hide"}
            handleNodeClick={this.handleNodeClick}
            handleNodeDoubleClick={this.handleNodeDoubleClick}
            handleSave={this.handleSave}
          />
        )}
      </>
    )
  }
};
