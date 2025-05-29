import styled from 'styled-components'

import type { iTask } from '../interfaces'
import Divider from './Divider'
import EditTask from './EditTask'

type iTaskItemProps = {
  item: iTask
}

const TaskItem = ({ item }: iTaskItemProps) => {
  return (
    <>
      <Divider />
      <Task>
        <TaskCell>{item.title}</TaskCell>
        {item.description ? <TaskCell>{item.description}</TaskCell> : <TaskCell>-</TaskCell>}
        {item.date && <TaskCell>{item.date}</TaskCell>}
        <TaskCell>{item.status}</TaskCell>
        <TaskCell>
          <EditTask task={item} />
        </TaskCell>
      </Task>
    </>
  )
}

export default TaskItem

const Task = styled.li({
  display: 'grid',
  padding: '12px 8px',
  alignItems: 'center',
  gridAutoFlow: 'column',
  columnGap: '16px',
  gridTemplateColumns: '120px 1fr 120px 120px 200px'
})
const TaskCell = styled.div({
  color: '#000',
  display: 'flex',
  position: 'relative',
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'center'
})
