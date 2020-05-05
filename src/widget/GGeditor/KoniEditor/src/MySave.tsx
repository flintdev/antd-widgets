import React from "react";
import { withPropsAPI } from "gg-editor";
import { graphHandler } from "./dataTreeHandler";
import { Button, Tooltip } from "antd";
import getIcon from "./ButtonMap";

class Save extends React.Component<any> {
  handleClick = () => {
    const { propsAPI, handleSave } = this.props;
    const data = propsAPI.save();
    handleSave({grpah: data, tree: graphHandler(data)})
  };

  render() {
    return (
      <Tooltip
        title={"Save"}
        placement="bottom"
      > 
        <Button type="link" icon={getIcon("save")} onClick={this.handleClick}/>
      </Tooltip>
    );
  }
}

export default withPropsAPI(Save);
