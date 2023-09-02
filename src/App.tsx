import { useState } from 'react'
import { Todos } from './components/Todos'
import { mockTodos } from './mocks/index.js'
import { type TodoId, type Todo } from './types.js'

function App (): JSX.Element {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = (
    /* { id, completed }: { id: TodoId, completed: TodoCompleted } ?? not working */
    { id, completed }: Pick<Todo, 'id' | 'completed'>
  ) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })

    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <h1>Todos</h1>
      <Todos
        todos={todos}
        onRemoveTodo={handleRemove}
        onCompleteTodo={handleCompleted}
      />
    </div>
  )
}

export default App
