import { useEffect, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import type { AppDispatch, RootState } from '../store'
import { fetchTasks } from '../store/slices/tasks'
import { FilterIcon, SortAscIcon, SortDefaultIcon, SortDescIcon } from './Icons'
import { TaskItem } from './TaskItem'

type SortableField = 'title' | 'date' | 'status'
type SortDirection = 'ascending' | 'descending'

interface SortConfig {
  key: SortableField
  direction: SortDirection
}

const TasksList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const loading = useSelector((state: RootState) => state.tasks.loading)
  const error = useSelector((state: RootState) => state.tasks.error)
  const dispatch = useDispatch<AppDispatch>()
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({
    key: 'date',
    direction: 'descending'
  })

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

  const sortedTasks = useMemo(() => {
    if (!sortConfig) return tasks

    return [...tasks].sort((a, b) => {
      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()

        return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA
      }

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }, [tasks, sortConfig])

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
        <HeaderCell onClick={() => requestSort('title')} active={sortConfig?.key === 'title'}>
          Title
          {renderSortIcon('title')}
        </HeaderCell>
        <HeaderCell>Description</HeaderCell>
        <HeaderCell onClick={() => requestSort('date')} active={sortConfig?.key === 'date'}>
          Created
          {renderSortIcon('date')}
        </HeaderCell>
        <HeaderCell>
          Status
          <FilterIcon />
        </HeaderCell>
        <HeaderCell>Manage</HeaderCell>
      </Headers>
      <List>
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} item={task} />
        ))}
      </List>
    </Container>
  )

  function renderSortIcon(field: SortableField) {
    if (sortConfig?.key !== field) return <SortDefaultIcon />

    return sortConfig.direction === 'ascending' ? <SortAscIcon /> : <SortDescIcon />
  }
}

export default TasksList

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px'
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
const HeaderCell = styled.div<{ active?: boolean }>`
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
