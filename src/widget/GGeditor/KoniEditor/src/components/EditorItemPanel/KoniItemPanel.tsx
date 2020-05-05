import { Item, ItemPanel } from 'gg-editor';

import { Card } from 'antd';
import React from 'react';
import styles from './index.modules.less';
const getSVG = (name: string, color: string, icon: string) => {
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18.04 17.5'><defs/><path fill='${color}' d='M8.96.46a1.14 1.13 0 00-.44.11L2.58 3.41a1.14 1.13 0 00-.61.77L.5 10.55a1.14 1.13 0 00.16.86 1.14 1.13 0 00.06.1l4.11 5.1a1.14 1.13 0 00.9.43h6.58a1.14 1.13 0 00.9-.43l4.1-5.1a1.14 1.13 0 00.22-.96l-1.47-6.38a1.14 1.13 0 00-.61-.76L9.5.57a1.14 1.13 0 00-.55-.1z'/><text x='10' y='16.8' style='line-height:6.61458349px' fill='white' stroke-width='.3' font-family='monospace' font-size='10.6' font-weight='400' letter-spacing='0' transform='translate(-1 -1.2)' word-spacing='0'><tspan x='10' y='16.8' font-family='monospace' font-size='2.8' text-anchor='middle'>${name}</tspan></text>${icon}</svg>`
}

const KoniItemPanel = ({ customNodes }) => (
  <ItemPanel className={styles.itemPanel}>
    <Card bordered={false}>
      {customNodes.map((item, i) => {
        const svg = getSVG(item.name, item.color || "rgb(51,113,227)", item.icon);
        return (
          <Item
            key={i}
            type="node"
            size="70"
            shape="hex-object"
            model={{
              name: item.name,
              label: item.label,
              icon: svg
            }}
            src={svg}
          />
          )
      })}
    </Card>
  </ItemPanel>
);

export default KoniItemPanel;
