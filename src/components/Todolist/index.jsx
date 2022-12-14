import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from '../TodoItem';
import styles from './TodoList.module.scss';
import cx from 'classnames';
import CONSTANTS from '../../constants';
const { THEMES } = CONSTANTS;

const TodoList = () => {
    const theme = useSelector((state) => state.theme);
    const className = cx(styles.itemsList,  {
        [styles.darkTheme]: theme === THEMES.DARK,
        [styles.lightTheme]: theme === THEMES.LIGHTL,
      });
    const todos = useSelector((state) => state.todos.todosArr);
    const itemsList = todos.map( todo => <TodoItem key={todo.id} todo={todo}/>);
    return (    
        <div className={className}>
            {itemsList}  
        </div>
    );
}

export default TodoList;
