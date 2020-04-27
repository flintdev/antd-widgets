import * as React from 'react';
import { Widget, WidgetProps } from "@flintdev/widget-builder";
import FlowEditorDev from './src';
import * as _ from 'lodash'

interface Params {
  data: any,
  viewOnly: boolean,
  customNode?: any[],
  showMimiMap: boolean
}

interface Events {
  onNodeSelect: (args: object) => void,
}

export interface Props extends WidgetProps {
  params: Params,
  events: Events
}

export default class Demo extends Widget<Props> {
  handleNodeClick = (data: any) => {
      const {events} = this.props;
      if (!!events?.onNodeSelect) events.onNodeSelect(_.get(data, ["item","model"], {}));
  };

  renderCustomComponent() {
    const { params } = this.props;
    const { data, viewOnly, customNode, showMimiMap } = params;
    return (
      <>
        {!!data && (
          <FlowEditorDev
            data={data} viewOnly={viewOnly} customNode={customNode} showMimiMap={showMimiMap}  handleNodeClick={this.handleNodeClick}
          />
        )}
      </>
    )
  }
};
