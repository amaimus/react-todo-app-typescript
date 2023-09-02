import { useState } from 'react'
import { Todos } from './components/Todos'
import { mockTodos } from './mocks/index.js'

function App (): JSX.Element {
  const [todos, setTodos] = useState(mockTodos)

  return (
    <div className='todoapp'>
      <h1>TODO TS App</h1>
      <Todos todos={todos} />
    </div>
  )
}

export default App
