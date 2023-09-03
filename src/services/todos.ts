import { type ListOfTodos } from '../types'

const API_URL = 'https://api.jsonbin.io/v3/b/64f4586ed972192679bdd6db'

export const fetchTodos = async (): Promise<ListOfTodos> => {
  const res = await fetch(API_URL)
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message)
  }
  const { record: todos } = await res.json()
  return todos.todos as ListOfTodos
}
