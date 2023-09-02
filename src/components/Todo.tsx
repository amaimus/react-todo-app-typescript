import { type FC } from 'react'

import { type Todo as TodoType } from '../types'

export const Todo: FC<TodoType> = ({ id, title, completed }) => {
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
        onClick={() => {}}
      />
    </div>
  )
}
