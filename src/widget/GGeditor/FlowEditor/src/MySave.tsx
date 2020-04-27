import React from "react";
import { withPropsAPI } from "gg-editor";
import { Button } from "antd";
import {
    SaveOutlined
  } from '@ant-design/icons';
  
class Save extends React.Component<any> {
  handleClick = () => {
    const { propsAPI } = this.props;

    console.log(propsAPI.save());
  };

  render() {
    return (
        <Button
                icon={<SaveOutlined style={{ fontSize: 25 }} />}
                type="link"
                onClick={this.handleClick}
        />
    );
  }
}

export default withPropsAPI(Save);
