import { Tree } from 'antd';
import * as React from 'react';
import { Widget, WidgetProps } from "@flintdev/widget-builder";

interface Params {
  data: any[]
  handleOnSelect: (selectedKeys: any, info: any) => void,
  handleOnCheck: (selectedKeys: any, info: any) => void,
  checkable: boolean
}

export interface Props extends WidgetProps {
  params: Params
}

export default class Dempo extends Widget<Props> {
  renderCustomComponent() {
    const { params } = this.props;
    const { data, checkable, handleOnSelect, handleOnCheck } = params;
    return (
      <Tree
        checkable={checkable}
        onSelect={handleOnSelect}
        onCheck={handleOnCheck}
        treeData={data}
      />
    )
  }
};