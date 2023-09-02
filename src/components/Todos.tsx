import { type FC } from 'react'
import { type TodoId, type ListOfTodos, type Todo as TodoType } from '../types'
import { Todo } from './Todo.tsx'

interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
  onCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todos: FC<Props> = ({ todos, onRemoveTodo, onCompleteTodo }) => {
  return (
    <>
      <ul className='todo-list'>
        {todos.map(todo =>
          <li
            key={todo.id}
            className={`${todo.completed ? 'completed' : ''}`}
          >
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              onRemoveTodo={onRemoveTodo}
              onCompleteTodo={onCompleteTodo}
            />
          </li>
        )}
      </ul>
    </>
  )
}
