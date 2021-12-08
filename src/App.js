import React, {useState ,useEffect} from 'react';
import './App.css';
// importing components
import Form from "./components/Form";
import Todo from './components/Todo';
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText]  = useState("");                                            //inputText is actual value and setInputText is function which allows you to change that value 
  const [todos,setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //Run once when the App starts
  useEffect(() => {
    getLocalTodos();
  },[]);
//USE EFFECT
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos,status]);
//Functions
  const filterHandler = () =>
  {
      switch(status){
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.completed ===true));
          break;
          case "uncompleted":
            setFilteredTodos(todos.filter((todo) => todo.completed ===false));
            break;
          default:
            setFilteredTodos(todos);
           break;

      }
  };

  //Save to local
  const saveLocalTodos = () => {
   
      localStorage.setItem('todos',JSON.stringify(todos));
    
  };

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos',JSON.stringify([]));
   }
   else
   {
     let todoLocal = JSON.parse(localStorage.getItem("todos"));
     setTodos(todoLocal);
     
   }

  };
   return (
    <div className="App">
     <header>
     <h1>Nitu's TO-DO List</h1>
     </header>
     <Form inputText = {inputText} todos = {todos} setTodos = {setTodos} setInputText={setInputText} setStatus={setStatus} />    
     <TodoList setTodos = {setTodos} filteredTodos={filteredTodos} todos={todos} />
    </div>
  );
}

export default App;
