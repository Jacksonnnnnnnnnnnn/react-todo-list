import {useState, useRef} from 'react'
import './App.css';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import logo from './logo.svg';

const Wrapper = styled.div`
  font-family: "MV Boli",cursive;
  text-align: center;
  color: white;
`

const Title = styled.div`
  font-size: 25px;
`
const Button = styled.button`
  cursor: pointer;
  font-family: "MV Boli",cursive;

  & + & {
    margin-left: 5px;
  }
`

const Input = styled.input`
  height: 21px;
`

const Img = styled.img`
  height: 15vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    & {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

function App() {
  const [todos, setTodos] = useState([
    {id: 1, content: 'Play ESLint', isDone: true},
    {id: 2, content: 'lunch with Huli', isDone: false}
  ])
  const [value, setValue] = useState('')
  const [filter, setFilter] = useState('all')
  const id = useRef(3)

  const handleButtonClick = () => {
    setTodos(
      [{
      id: id.current,
      content: value
      }, ...todos]
    )
    setValue('')
    id.current++
  }

  const handleDeleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleInputChange = e => {
    setValue(e.target.value)
  }

  const handleEnterInput = e => {
    if(!e.target.value) return
    if(e.key === 'Enter') {
      handleButtonClick()
    }
  }

  const handleToggleClick = id => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }

  const getAll = () => {
    setFilter('all')
  }

  const getUnfinished = () => {
    setFilter('undone')
  }

  const getFinished = () => {
    setFilter('done')
  }

  const cleanAll = () => {
    setTodos([])
  }

  document.body.style.backgroundColor = '#282c34'

  return (
    <Wrapper>
      <Title>Todo List</Title>
      <div><Img src={logo} alt="logo" /></div>
      <Input 
        value={value}
        type="text"
        placeholder="add todo"
        onChange={handleInputChange}
        onKeyDown={handleEnterInput}
      />
      <Button onClick={handleButtonClick}>
        Add Todo
      </Button>
      <div>
        <Button onClick={getAll}>All</Button>
        <Button onClick={getUnfinished}>In progress</Button>
        <Button onClick={getFinished}>Done</Button>
        <Button onClick={cleanAll}>Clean All</Button>
      </div>
      {
        todos
          .filter(todo => {
            if (filter === "done") return todo.isDone
            if (filter === "undone") return !todo.isDone
            return todo
          })
          .map((todo) => 
            <TodoItem 
              key={todo.id}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}  
              handleToggleClick={handleToggleClick}
            />)
      }
    </Wrapper>
  );
}

export default App;
