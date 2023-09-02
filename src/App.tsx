import { useState } from 'react'
import { Todos } from './components/Todos'
import { mockTodos } from './mocks/index.js'
import { type TodoId } from './types.js'

function App (): JSX.Element {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <h1>Todos</h1>
      <Todos
        todos={todos}
        onRemoveTodo={handleRemove}
      />
    </div>
  )
}

export default App
