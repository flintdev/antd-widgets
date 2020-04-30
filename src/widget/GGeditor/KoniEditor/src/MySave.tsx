import React from "react";
import { withPropsAPI } from "gg-editor";
import ButtonMap from "./ButtonMap";
  
class Save extends React.Component<any> {
  handleClick = () => {
    const { propsAPI, handleSave } = this.props;
    handleSave(propsAPI.save())
  };

  render() {
    return (
        <ButtonMap icon={"save"} handleClick={this.handleClick}/>
    );
  }
}

export default withPropsAPI(Save);
