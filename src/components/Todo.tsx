import { type FC } from 'react'

import { type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
}

export const Todo: FC<Props> = ({ id, title, completed, onRemoveTodo }) => {
  return (
    <div className='view'>
      <input
        id={`todo${id}`}
        className='toggle'
        type='checkbox'
        checked={completed }
        onChange={() => {}}
      />
      <label htmlFor={`todo${id}`}>{title}</label>
      <button
        className='destroy'
        onClick={() => { onRemoveTodo({ id }) }}
      />
    </div>
  )
}
