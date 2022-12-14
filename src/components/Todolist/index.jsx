import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from '../TodoItem';
import styles from './TodoList.module.scss';
import cx from 'classnames';
import CONSTANTS from '../../constants';
import { getTodos } from '../../store/slices/todos';

const { THEMES } = CONSTANTS;

const TodoList = () => {
    const theme = useSelector((state) => state.theme);
    const className = cx(styles.itemsList,  {
        [styles.darkTheme]: theme === THEMES.DARK,
        [styles.lightTheme]: theme === THEMES.LIGHTL,
    });
    //const todos = useSelector((state) => state.todos.todosArr);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTodos('Hello there'));
        }, []);
        
    const { todosArr: todos, isLoading, error } = useSelector((state) => state.todos);      
    const todoList = todos.map( todo => <TodoItem key={todo.id} todo={todo}/>);
    return (    
        <div className={className}>
            {isLoading && <div>Loading</div>}
            {error && <div>Error</div>}
            {todos.length > 0 && todoList}  
        </div>
    );
}

export default TodoList;
