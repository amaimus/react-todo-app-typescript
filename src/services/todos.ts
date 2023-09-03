import { type ListOfTodos } from '../types'

const API_URL = 'https://api.jsonbin.io/v3/b/64f46c41d972192679bddc0c'
const ACCESS_KEY = '$2b$10$yBkMrjAjqxmBwaZpm8PJ1eJt3s/x2hiVy.N0FrQlz8Q2pbyMPEU9W'

export const fetchTodos = async (): Promise<ListOfTodos> => {
  const res = await fetch(API_URL)
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message)
  }
  const { record: todos } = await res.json()
  return todos.todos as ListOfTodos
}

export const updateTodos = async ({ todos }: { todos: ListOfTodos }): Promise<boolean> => {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-ACCESS-Key': ACCESS_KEY
    },
    body: JSON.stringify({ todos })
  })

  return res.ok
}
