import { type FilterValue } from '../types'
import { Filters } from './Filters'
import { type FC } from 'react'

interface Props {
  activeCount: number
  completedCount: number
  filterSelected: FilterValue
  onClearCompleted: () => void
  handleFilterChange: (filter: FilterValue) => void
}

export const Footer: FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  filterSelected,
  onClearCompleted,
  handleFilterChange
}) => {
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{activeCount}</strong> pending tasks
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
      {
        completedCount > 0 && (
          <button className='clear-completed' onClick={onClearCompleted}>
            Delete completed
          </button>
        )
      }
    </footer>
  )
}
