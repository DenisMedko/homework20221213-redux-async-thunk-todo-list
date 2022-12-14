import './App.css';
import Header from './components/Header';
import InputForm from './components/InputForm';
import TodoList from './components/Todolist';
import styles from './App.module.scss';
import cx from 'classnames';
import CONSTANTS from './constants';
import { useSelector } from 'react-redux';
const { THEMES } = CONSTANTS;

function App() {
  const theme = useSelector((state) => state.theme);
    const className = cx('todo-container',  {
        [styles.darkTheme]: theme === THEMES.DARK,
        [styles.lightTheme]: theme === THEMES.LIGHTL,
      });
  return (
    <div className={className}>
      <Header />
      <InputForm />
      <TodoList />
    </div>   
  );
}

export default App;
