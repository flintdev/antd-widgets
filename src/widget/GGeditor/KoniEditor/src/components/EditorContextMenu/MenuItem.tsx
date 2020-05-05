import { Command } from 'gg-editor';
import React from 'react';
import styles from './index.modules.less';
import ButtonMap from '../../ButtonMap';
import getIcon from '../../ButtonMap';
import { Button } from 'antd';

const upperFirst = (str: string) =>
  str.toLowerCase().replace(/( |^)[a-z]/g, (l: string) => l.toUpperCase());

interface MenuItemProps {
  command: string;
  icon?: string;
  text?: string;
}
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { command, icon, text } = props;

  return (
    <Command name={command}>
      <div className={styles.item}>
        <Button type="link" icon={getIcon(icon || command)}/>
        <span>{text || upperFirst(command)}</span>
      </div>
    </Command>
  );
};

export default MenuItem;
