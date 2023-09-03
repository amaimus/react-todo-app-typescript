import { useState } from 'react'
import { Todos } from './components/Todos'
import { Footer } from './components/Footer.js'
import { mockTodos } from './mocks/index.js'
import { type TodoId, type Todo, type FilterValue, type TodoTitle } from './types.js'
import { TODO_FILTERS } from './consts.js'
import { Header } from './components/Header.js'
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

  const handleClearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = ({ title }: TodoTitle) => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [
      newTodo,
      ...todos
    ]

    setTodos(newTodos)
  }

  const handleEditTodo = ({ id, title }: Pick<Todo, 'title' | 'id'>) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }
      return todo
    })
    setTodos(newTodos)
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
      <Header saveTodo={handleAddTodo} />

      <Todos
        todos={filteredTodos}
        onRemoveTodo={handleRemove}
        onCompleteTodo={handleCompleted}
        onEditTodo={handleEditTodo}
      />

      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  )
}

export default App
