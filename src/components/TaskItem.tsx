import styled from 'styled-components'

import type { iTask } from '../interfaces'
import Divider from './Divider'

interface TaskItemProps {
  item: iTask
}

interface TodoCellProps {
  center?: boolean
}

export const TaskItem = ({ item }: TaskItemProps) => {
  return (
    <>
      <Divider />
      <Todo>
        <TodoCell>{item.title}</TodoCell>
        {item.description && <TodoCell>{item.description}</TodoCell>}
        <TodoCell center>28.05.</TodoCell>
        <TodoCell center>{item.status}</TodoCell>
        <TodoCell center>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </TodoCell>
      </Todo>
    </>
  )
}

const Todo = styled.li({
  display: 'grid',
  padding: '12px 8px',
  alignItems: 'center',
  gridAutoFlow: 'column',
  columnGap: '16px',
  gridTemplateColumns: '120px 1fr 120px 120px 200px'
})
const TodoCell = styled.div<TodoCellProps>(({ center }) => ({
  color: '#000',
  display: 'flex',
  gap: '16px',
  justifyContent: center ? 'center' : 'flex-start',
  alignItems: 'center'
}))
const Button = styled.button({
  backgroundColor: '#ff719f',
  transition: 'all 0.3s ease',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  fontSize: '16px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16);',

  '&:hover': {
    backgroundColor: '#ff5a8a'
  }
})
