import { useEffect, useReducer } from 'react'
import { type TodoId, type Todo, type FilterValue, type TodoTitle, type ListOfTodos } from '../types.js'
import { TODO_FILTERS } from '../consts.js'
import { fetchTodos } from '../services/todos.js'

const initialState = {
  todos: [],
  filterSelected: TODO_FILTERS.ALL
}
interface State {
  todos: ListOfTodos
  filterSelected: FilterValue
}

type Action =
  | { type: 'INIT_TODOS', payload: { todos: ListOfTodos } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'COMPLETED', payload: { id: string, completed: boolean } }
  | { type: 'FILTER_CHANGE', payload: { filter: FilterValue } }
  | { type: 'REMOVE', payload: { id: string } }
  | { type: 'SAVE', payload: { title: string } }
  | { type: 'UPDATE_TITLE', payload: { id: string, title: string } }

const reducer = (state: State, action: Action): State => {
  if (action.type === 'INIT_TODOS') {
    const { todos } = action.payload
    return {
      ...state,
      todos
    }
  }

  if (action.type === 'CLEAR_COMPLETED') {
    return {
      ...state,
      todos: state.todos.filter((todo) => !todo.completed)
    }
  }

  if (action.type === 'COMPLETED') {
    const { id, completed } = action.payload
    return {
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed
          }
        }

        return todo
      })
    }
  }

  if (action.type === 'FILTER_CHANGE') {
    const { filter } = action.payload
    return {
      ...state,
      filterSelected: filter
    }
  }

  if (action.type === 'REMOVE') {
    const { id } = action.payload
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id)
    }
  }

  if (action.type === 'SAVE') {
    const { title } = action.payload
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    return {
      ...state,
      todos: [...state.todos, newTodo]
    }
  }

  if (action.type === 'UPDATE_TITLE') {
    const { id, title } = action.payload
    return {
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title
          }
        }

        return todo
      })
    }
  }

  return state
}

export const useTodos = () => {
  const [{ todos, filterSelected }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchTodos()
      .then(todos => {
        dispatch({ type: 'INIT_TODOS', payload: { todos } })
      })
      .catch(err => { console.error(err) })
  }, [])

  const handleRemove = ({ id }: TodoId) => {
    dispatch({ type: 'REMOVE', payload: { id } })
  }

  const handleCompleted = (
    /* { id, completed }: { id: TodoId, completed: TodoCompleted } ?? not working */
    { id, completed }: Pick<Todo, 'id' | 'completed'>
  ) => {
    dispatch({ type: 'COMPLETED', payload: { id, completed } })
  }

  const handleFilterChange = (filter: FilterValue) => {
    dispatch({ type: 'FILTER_CHANGE', payload: { filter } })
  }

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' })
  }

  const handleAddTodo = ({ title }: TodoTitle) => {
    dispatch({ type: 'SAVE', payload: { title } })
  }

  const handleEditTodo = ({ id, title }: Pick<Todo, 'title' | 'id'>) => {
    dispatch({ type: 'UPDATE_TITLE', payload: { id, title } })
  }

  const completedCount = todos.filter(todo => todo.completed).length

  const activeCount = todos.length - completedCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return {
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
  }
}
