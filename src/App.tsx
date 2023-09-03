import { Todos } from './components/Todos'
import { Footer } from './components/Footer.js'
import { Header } from './components/Header.js'
import { useTodos } from './hooks/useTodos.js'

function App (): JSX.Element {
  const {
    activeCount,
    completedCount,
    filterSelected,
    handleClearCompleted,
    handleCompleted,
    handleFilterChange,
    handleRemove,
    handleAddTodo,
    handleEditTodo,
    todos: filteredTodos
  } = useTodos()

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
