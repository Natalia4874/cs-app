import { useState } from 'react'

import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import TaskForm from '../forms/TaskForm'
import type { iTask } from '../interfaces'
import { editTask } from '../store/slices/tasks'

type iEditTaskProps = {
  task: iTask
}

const EditTask = ({ task }: iEditTaskProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()

  const handleCancel = () => {
    setIsEdit(false)
  }

  const handleSubmit = (formData: iTask) => {
    dispatch(editTask(formData))
    setIsEdit(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      {isEdit && (
        <FormWrapper>
          <TaskForm initialData={task} onCancel={handleCancel} onSubmit={handleSubmit} />
        </FormWrapper>
      )}
      <Button onClick={() => setIsEdit(true)}>Edit</Button>
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

const Button = styled.button({
  backgroundColor: '#ff719f',
  transition: 'all 0.3s ease',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  fontSize: '16px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)',

  '&:hover': {
    backgroundColor: '#ff5a8a',
    cursor: 'pointer'
  }
})
