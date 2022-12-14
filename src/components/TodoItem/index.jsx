import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as todoActionCreators from  '../../store/slices/todos';
import styles from './TodoItem.module.scss';
import cx from 'classnames';
import CONSTANTS from '../../constants';
const { THEMES } = CONSTANTS;

const TodoItem = (props) => {
    const theme = useSelector((state) => state.theme);
    const className = cx(styles.todoItem,  {
        [styles.darkTheme]: theme === THEMES.DARK,
        [styles.lightTheme]: theme === THEMES.LIGHTL,
    });

    const {todo : {id, text: title, isDone}} = props;
    const dispatch = useDispatch();

    const { setIsDone, remove } = bindActionCreators(
        { ...todoActionCreators },
        dispatch
    );

    return (
        <div className={className}>
            <div className={styles.todoItemTitle}>{title}</div>
            <input type="checkbox" 
                name={id} 
                checked={isDone} 
                onChange={ () => setIsDone(+id) }
                className={styles.checkBox}
            />
            <button type="button" name={id} onClick={() => remove(+id)} className={styles.deleteBtn}>X</button>
        </div>);   
}

export default TodoItem;
