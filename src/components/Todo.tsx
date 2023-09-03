import React, { useState, useEffect, type FC, useRef } from 'react'

import { type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  onEditTodo: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void
  isEditing: string
  setIsEditing: (completed: string) => void
}

export const Todo: FC<Props> = (
  { id, title, completed, onRemoveTodo, onCompleteTodo, isEditing, setIsEditing, onEditTodo }
) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCompleteTodo({ id, completed: event.target.checked })
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        onEditTodo({ id, title: editedTitle })
      }

      if (editedTitle === '') onRemoveTodo({ id })
      setIsEditing('')
    }

    if (event.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  return (
    <>
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
      <input
        className='edit'
        value={editedTitle}
        onChange={e => { setEditedTitle(e.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') }}
        ref={inputEditTitle}
      />
    </>
  )
}
