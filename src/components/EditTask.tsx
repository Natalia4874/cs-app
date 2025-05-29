import { useState } from 'react'

import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import TaskForm from '../forms/TaskForm'
import type { iTask } from '../interfaces'
import { editTask, removeTask } from '../store/slices/tasks'

type iEditTaskProps = {
  task: iTask
}

const EditTask = ({ task }: iEditTaskProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancel = () => {
    setIsEdit(false)
  }

  const handleSubmit = (formData: iTask) => {
    dispatch(editTask(formData))
    setIsEdit(false)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Failed to delete task')
        }

        dispatch(removeTask(task.id))
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {isEdit && (
        <FormWrapper>
          <TaskForm initialData={task} onCancel={handleCancel} onSubmit={handleSubmit} />
        </FormWrapper>
      )}
      <ButtonWrapper>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ButtonWrapper>
    </div>
  )
}

export default EditTask

const FormWrapper = styled.div({
  position: 'absolute',
  zIndex: 3,
  right: 0,
  top: -150,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)'
})
const ButtonWrapper = styled.div({
  display: 'flex',
  position: 'relative',
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'center'
})
const Button = styled.button({
  width: '100%',
  backgroundColor: '#ff719f',
  transition: 'all 0.3s ease',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  fontSize: '16px',

  '&:hover': {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)',
    backgroundColor: '#ff5a8a',
    cursor: 'pointer'
  }
})
