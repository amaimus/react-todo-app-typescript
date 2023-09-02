import { type FC } from 'react'
import { type TodoTitle } from '../types'
import { CreateTodo } from './CreateTodo'

interface Props {
  saveTodo: ({ title }: TodoTitle) => void
}
export const Header: FC<Props> = ({ saveTodo }) => {
  return (
    <header className='header'>
      <h1>
        Todo
        <img
          style={{ width: '60px', height: 'auto' }}
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png'></img>
      </h1>

      <CreateTodo saveTodo={saveTodo}/>
    </header>
  )
}
