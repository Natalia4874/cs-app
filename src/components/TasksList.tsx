import { useEffect, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import type { iTask } from '../interfaces'
import type { AppDispatch, RootState } from '../store'
import { fetchTasks } from '../store/slices/tasks'
import { FilterIcon, SortAscIcon, SortDefaultIcon, SortDescIcon } from './Icons'
import TaskItem from './TaskItem'

type SortableField = 'date'
type SortDirection = 'ascending' | 'descending'

interface SortConfig {
  key: SortableField
  direction: SortDirection
}

interface HeaderCellProps {
  active?: boolean
}

type StatusFilter = 'All' | 'To Do' | 'In Progress' | 'Completed'

const STATUS_FILTERS: StatusFilter[] = ['All', 'To Do', 'In Progress', 'Completed']

const TasksList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const loading = useSelector((state: RootState) => state.tasks.loading)
  const error = useSelector((state: RootState) => state.tasks.error)
  const dispatch = useDispatch<AppDispatch>()
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({
    key: 'date',
    direction: 'descending'
  })
  const [showStatusFilter, setShowStatusFilter] = useState(false)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const requestSort = (key: SortableField) => {
    let direction: SortDirection = 'ascending'

    if (sortConfig?.key === key) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
    }

    setSortConfig({ key, direction })
  }

  const filteredAndSortedTasks = useMemo(() => {
    let filteredTasks = tasks as iTask[]
    if (statusFilter !== 'All') {
      filteredTasks = tasks.filter((task) => task.status === statusFilter)
    }

    if (!sortConfig) return filteredTasks

    return [...filteredTasks].sort((a: iTask, b: iTask) => {
      if (sortConfig.key === 'date') {
        const dateA = a.date ? new Date(a.date).getTime() : 0
        const dateB = b.date ? new Date(b.date).getTime() : 0

        return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA
      }

      return 0
    })
  }, [tasks, sortConfig, statusFilter])

  const toggleStatusFilter = () => {
    setShowStatusFilter((prev) => !prev)
  }

  const handleStatusFilterChange = (filter: StatusFilter) => {
    setStatusFilter(filter)
    setShowStatusFilter(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>An error occured: {error}</div>
  }

  return (
    <Container>
      <Title>TasksList</Title>
      <Headers>
        <HeaderCell>Title</HeaderCell>
        <HeaderCell>Description</HeaderCell>
        <HeaderCell onClick={() => requestSort('date')} active={sortConfig?.key === 'date'}>
          Created
          {renderSortIcon('date')}
        </HeaderCell>
        <HeaderCell>
          <StatusFilterWrapper>
            Status
            <FilterButton onClick={toggleStatusFilter}>
              <FilterIcon />
            </FilterButton>
            {showStatusFilter && (
              <StatusDropdown>
                {STATUS_FILTERS.map((status) => (
                  <StatusOption
                    key={status}
                    onClick={() => handleStatusFilterChange(status)}
                    active={status === statusFilter}
                  >
                    {status}
                  </StatusOption>
                ))}
              </StatusDropdown>
            )}
          </StatusFilterWrapper>
        </HeaderCell>
        <HeaderCell>Manage</HeaderCell>
      </Headers>
      <List>
        {filteredAndSortedTasks.map((task) => (
          <TaskItem key={task.id} item={task} />
        ))}
      </List>
    </Container>
  )

  function renderSortIcon(field: SortableField) {
    if (!sortConfig || sortConfig.key !== field) return <SortDefaultIcon />

    return sortConfig.direction === 'ascending' ? <SortAscIcon /> : <SortDescIcon />
  }
}

export default TasksList

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px',
  position: 'relative'
})
const Title = styled.h2({
  fontSize: 24,
  margin: 0
})
const Headers = styled.div({
  marginTop: 20,
  display: 'grid',
  padding: '12px 8px',
  alignItems: 'center',
  gridAutoFlow: 'column',
  columnGap: '16px',
  gridTemplateColumns: '120px 1fr 120px 120px 200px'
})
const HeaderCell = styled.div<HeaderCellProps>`
  color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  user-select: none;

  svg {
    opacity: ${(props) => (props.active ? 1 : 0.3)};
    transition: opacity 0.2s;
  }

  &:hover svg {
    opacity: 1;
  }
`
const List = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  listStyleType: 'none',
  margin: 0,
  padding: 0
})
const StatusFilterWrapper = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: 4
})
const FilterButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  svg {
    opacity: 0.3;
    transition: opacity 0.2s;
  }

  &:hover svg {
    opacity: 1;
  }
`
const StatusDropdown = styled.div({
  minWidth: 160,
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: 8,
  zIndex: 10,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)'
})
const StatusOption = styled.div<{ active?: boolean }>`
  padding: 8px 12px;
  color: #000;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#f0f0f0' : '#fff')};
  &:hover {
    background-color: #ccc;
  }
  &:first-child {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
  &:last-child {
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
`
