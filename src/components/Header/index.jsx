import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import CONSTANTS from '../../constants';
import styles from './Header.module.scss';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as themeActionCreators from  '../../store/slices/themes';
const { THEMES } = CONSTANTS;

function Header() {
  const theme = useSelector((state) => state.theme);
  
  const dispatch = useDispatch();
  
  const { setTheme } = bindActionCreators(
      { ...themeActionCreators },
      dispatch
  );
  
  const className = cx(styles.header, {
    [styles.darkTheme]: theme === THEMES.DARK,
    [styles.lightTheme]: theme === THEMES.LIGHTL,
  });

  return (
    <header className={className}>
      <h1>My Site</h1>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navListItem}>Link 1</li>
          <li className={styles.navListItem}>Link 2</li>
          <li className={styles.navListItem}>Link 3</li>
        </ul>
      </nav>
      <div>
        <button onClick={() => setTheme() }>Switch Theme</button>
      </div>
    </header>
  );
}

export default Header;
