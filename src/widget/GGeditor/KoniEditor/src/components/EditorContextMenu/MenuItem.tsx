import { Command } from 'gg-editor';
import React from 'react';
import styles from './index.less';
import ButtonMap from '../../ButtonMap';

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
        <ButtonMap icon={icon || command}/>
        <span>{text || upperFirst(command)}</span>
      </div>
    </Command>
  );
};

export default MenuItem;
