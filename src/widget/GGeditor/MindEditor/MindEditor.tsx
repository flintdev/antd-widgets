import * as React from 'react';
import { Widget, WidgetProps } from "@flintdev/widget-builder";
import MindEditorDev from './src';
import * as _ from 'lodash'

interface Params {
  data: any
}

interface Events {
  onNodeSelect: (args: object) => void,
  onSave?: (args: object) => void,
}

export interface Props extends WidgetProps {
  params: Params,
  events: Events
}

export default class Demo extends Widget<Props> {
  handleNodeClick = (data: any) => {
    const { events } = this.props;
    if (!!events?.onNodeSelect) events.onNodeSelect(_.get(data, ["item", "model"], {}));
  };

  handleSave = (data: any) => {
    const { events } = this.props;
    if (!!events?.onSave) events.onSave(data);
  };

  renderCustomComponent() {
    const { params } = this.props;
    const { data } = params;
    return (
      <>
        {!!data && (
          <MindEditorDev
            data={data}
            handleNodeClick={this.handleNodeClick}
            handleSave={this.handleSave}
          />
        )}
      </>
    )
  }
};
