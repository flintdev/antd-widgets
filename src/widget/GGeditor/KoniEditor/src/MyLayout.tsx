import React from "react";
import { withPropsAPI } from "gg-editor";
import { graphHandler, dataTreeHandler } from "./dataTreeHandler";
import { Button, Tooltip } from "antd";
import getIcon from "./ButtonMap";
  
class MyLayout extends React.Component<any> {
  handleClick = () => {
    const { propsAPI, customNodes } = this.props;
    const data = propsAPI.save();
    propsAPI.read(dataTreeHandler(graphHandler(data), customNodes));
    propsAPI.executeCommand("autoZoom");
  };

  render() {
    return (
      <Tooltip
        title={"Auto Layout"}
        placement="bottom"
      > 
        <Button type="link" icon={getIcon("layout")} onClick={this.handleClick}/>
      </Tooltip>
    );
  }
}

export default withPropsAPI(MyLayout);
