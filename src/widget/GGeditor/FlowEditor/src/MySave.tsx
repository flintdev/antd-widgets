import React from "react";
import { withPropsAPI } from "gg-editor";
import { Button } from "antd";
import {
    SaveFilled
  } from '@ant-design/icons';
  
class Save extends React.Component<any> {
  handleClick = () => {
    const { propsAPI } = this.props;

    console.log(propsAPI.save());
  };

  render() {
    return (
        <Button
                icon={<SaveFilled/>}
                type="link"
                onClick={this.handleClick}
        />
    );
  }
}

export default withPropsAPI(Save);
