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
            fill: '#182026',
            textAlign: 'center',
            fontSize: 15,
            text: model.label
            }
        });

        group.addShape('image', {
          attrs: {
            x: -40,
            y: -40,
            width: 80,
            height: 80,
            img: model.icon,
          },
        });

        return keyShape;
      },
    };

    return <RegisterNode name="k8s-object" config={config} extend={"flow-circle"}/>;
  }
}

export default MyKoniCustomNode;
