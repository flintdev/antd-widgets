import { Command } from 'gg-editor';
import React from 'react';
import { Tooltip } from 'antd';
import styles from './index.less';
import ButtonMap from '../../ButtonMap';

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
        <ButtonMap icon={icon || command}/>
      </Tooltip>
    </Command>
  );
};

export default ToolbarButton;
