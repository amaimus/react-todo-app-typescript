import { type FC } from 'react'
import { type ListOfTodos } from '../types'
import { Todo } from './Todo.tsx'

interface Props {
  todos: ListOfTodos
}

export const Todos: FC<Props> = ({ todos }) => {
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
            />
          </li>
        )}
      </ul>
    </>
  )
}
