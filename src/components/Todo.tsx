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
    <div className='view' style={{ userSelect: 'none' }}>
      <input
        id={`todo${id}`}
        className='toggle'
        style={{ cursor: 'pointer' }}
        type='checkbox'
        checked={completed }
        onChange={handleChangeCheckbox}
      />

      <label
        htmlFor={`todo${id}`}
        style={{ cursor: 'pointer' }}
      >
        {title}
      </label>

      <button
        className='destroy'
        style={{ cursor: 'pointer' }}
        onClick={() => { onRemoveTodo({ id }) }}
      />
    </div>
  )
}
