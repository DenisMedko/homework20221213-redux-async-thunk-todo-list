import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from '../TodoItem';
import styles from './TodoList.module.scss';
import cx from 'classnames';
import CONSTANTS from '../../constants';
import { getOnServer } from '../../store/slices/todos';

const { THEMES } = CONSTANTS;

const TodoList = () => {
    const theme = useSelector((state) => state.theme);
    const className = cx(styles.itemsList,  {
        [styles.darkTheme]: theme === THEMES.DARK,
        [styles.lightTheme]: theme === THEMES.LIGHTL,
    });
    
    const dispatch = useDispatch();
    
    const { todosArr: todos, isLoading, error } = useSelector((state) => state.todos);   

    useEffect(() => {
        dispatch(getOnServer('Hello there'));
        }, []);

    const todoList = todos.map( (todo, index) => 
        <TodoItem key={todo.id} todo={todo} index={index}/>
    );
    
    return (    
        <div className={className}>
            {isLoading && <div>Loading</div>}
            {error && <div>{error}</div>}
            {todos.length > 0 && todoList}  
        </div>
    );
}

export default TodoList;
