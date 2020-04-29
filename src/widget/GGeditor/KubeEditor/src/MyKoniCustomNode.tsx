import React from 'react';
import { RegisterNode } from 'gg-editor';

class MyKoniCustomNode extends React.Component {
  render() {
    const config = {
      //@ts-ignore
      draw(item: any) {
        item.model.size = "70";
        //@ts-ignore
        const keyShape = this.drawKeyShape(item);

        // draw image
        const group = item.getGraphicGroup();
        const model = item.getModel();
        
        group.addShape('text', {
            attrs: {
            x: 0,
            y: 60,
            fill: 'black',
            textAlign: 'center',
            fontSize: 15,
            text: model.label
            }
        });

        group.addShape('image', {
          attrs: {
            x: -45,
            y: -45,
            width: 90,
            height: 90,
            img: model.icon,
          },
        });

        return keyShape;
      },
    };

    return <RegisterNode name="k8s-object" config={config} extend={"koni-custom-node"}/>;
  }
}

export default MyKoniCustomNode;
