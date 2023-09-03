import { useState, type FC } from 'react'
import { type TodoId, type ListOfTodos, type Todo as TodoType } from '../types'
import { Todo } from './Todo.tsx'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
  onCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  onEditTodo: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void
}

export const Todos: FC<Props> = ({ todos, onRemoveTodo, onCompleteTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState('')
  const [parent] = useAutoAnimate()

  return (
    <>
      <ul className='todo-list' ref={parent}>
        {todos.map(todo =>
          <li
            key={todo.id}
            className={`
              ${todo.completed ? 'completed' : ''}
              ${isEditing === todo.id ? 'editing' : ''}
            `}
            onDoubleClick={() => { setIsEditing(todo.id) }}
          >
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              onRemoveTodo={onRemoveTodo}
              onCompleteTodo={onCompleteTodo}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              onEditTodo={onEditTodo}
            />
          </li>
        )}
      </ul>
    </>
  )
}
