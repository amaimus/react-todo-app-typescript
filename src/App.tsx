import { useState } from 'react'
import { Todos } from './components/Todos'
import { Footer } from './components/Footer.js'
import { mockTodos } from './mocks/index.js'
import { type TodoId, type Todo, type FilterValue } from './types.js'
import { TODO_FILTERS } from './consts.js'

function App (): JSX.Element {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

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

  const handleFilterChange = (filter: FilterValue) => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter(todo => !todo.completed).length

  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return (
    <div className='todoapp'>
      <h1>Todos</h1>

      <Todos
        todos={filteredTodos}
        onRemoveTodo={handleRemove}
        onCompleteTodo={handleCompleted}
      />

      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        onClearCompleted={() => {}}
      />
    </div>
  )
}

export default App
