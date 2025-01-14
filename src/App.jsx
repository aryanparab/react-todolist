import { useState,useEffect } from "react"
import Todoinput from "./components/Todoinput"
import Todolist from "./components/Todolist"

function App() {

const [todos,setTodos] = useState([])
const [todoValue,setTodoValue] = useState('')

function persisData(newList){
  localStorage.setItem('todos',JSON.stringify({todos:newList}))
}
function handleAddTodos(newTodo){
  const newTodoList = [...todos,newTodo]
  setTodos(newTodoList)
  persisData(newTodoList)
}

function handleDeleteTodo(index){
  const newTodoList = [...todos].filter((todo,todoIndex)=>{
    return todoIndex !== index
  })
  setTodos(newTodoList)
  persisData(newTodoList)
}

function handleEditTodo(index){
  const valueTobeEdited = todos[index]
  setTodoValue(valueTobeEdited)
  handleDeleteTodo(index)

}

useEffect(()=>{
  if(!localStorage){
    return
  }
  let localTodos = localStorage.getItem('todos')
  if(!localTodos){
    return
  }
  localTodos = JSON.parse(localTodos).todos
  setTodos(localTodos)

},[])


  return (
    <>
     <Todoinput todoValue={todoValue} setTodoValue = {setTodoValue} handleAddTodos={handleAddTodos}/>
     <Todolist todos={todos} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo}/>
    </>
  )
}

export default App
