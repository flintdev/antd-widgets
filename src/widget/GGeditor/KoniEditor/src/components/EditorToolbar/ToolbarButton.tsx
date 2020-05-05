import { Command } from 'gg-editor';
import React from 'react';
import { Tooltip, Button } from 'antd';
import styles from './index.modules.less';
import ButtonMap from '../../ButtonMap';
import getIcon from '../../ButtonMap';

const upperFirst = (str: string) =>
  str.toLowerCase().replace(/( |^)[a-z]/g, (l: string) => l.toUpperCase());

interface ToolbarButtonProps {
  command: string;
  icon?: string;
  text?: string;
}
const ToolbarButton: React.FC<ToolbarButtonProps> = (props) => {
  const { command, icon, text } = props;

  return (
    <Command name={command}>
      <Tooltip
        title={text || upperFirst(command)}
        placement="bottom"
        overlayClassName={styles.tooltip}
      > 
        <Button type="link" icon={getIcon(icon || command)}/>
      </Tooltip>
    </Command>
  );
};

export default ToolbarButton;
