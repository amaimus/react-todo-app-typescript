import React, { type FC } from 'react'

import { type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todo: FC<Props> = ({ id, title, completed, onRemoveTodo, onCompleteTodo }) => {
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCompleteTodo({ id, completed: event.target.checked })
  }

  return (
    <div className='view'>
      <input
        id={`todo${id}`}
        className='toggle'
        type='checkbox'
        checked={completed }
        onChange={handleChangeCheckbox}
      />
      <label htmlFor={`todo${id}`}>{title}</label>
      <button
        className='destroy'
        onClick={() => { onRemoveTodo({ id }) }}
      />
    </div>
  )
}
