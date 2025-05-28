import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'

import type { iTask } from '../interfaces'
import { addTask, editTask, removeTask } from '../store/slices/tasks'

type iTaskFormProps = {
  initialData?: iTask
  onSuccess?: () => void
  onCancel?: () => void
  onSubmit: (data: iTask) => void
}

const schema = yup.object().shape({
  title: yup.string().required('Task name is required').min(3).max(100),
  description: yup.string().max(500),
  status: yup.string().required('Status is required')
})

const TaskForm = ({ initialData, onSuccess, onCancel, onSubmit }: iTaskFormProps) => {
  const dispatch = useDispatch()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const isEditMode = !!initialData

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<iTask>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: initialData || {
      title: '',
      description: '',
      status: 'To Do'
    }
  })

  const handleFormSubmit = async (data: iTask) => {
    try {
      setSubmitError(null)

      const taskData = {
        ...data,
        id: initialData?.id || uuidv4().split('-')[0],
        date: initialData?.date || new Date().toISOString().split('T')[0]
      }

      if (isEditMode) {
        dispatch(editTask(taskData))
      } else {
        dispatch(addTask(taskData))
      }

      const method = isEditMode ? 'PUT' : 'POST'
      const url = isEditMode
        ? `http://localhost:3001/tasks/${taskData.id}`
        : 'http://localhost:3001/tasks'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      })

      if (!response.ok) {
        if (isEditMode && initialData) {
          dispatch(editTask(initialData))
        } else {
          dispatch(removeTask(taskData.id))
        }

        const errorData = await response.json()

        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([field, message]) => {
            setError(field, { type: 'server', message })
          })
        } else {
          setSubmitError(errorData.message || 'Submission failed')
        }
        return
      }

      onSubmit(taskData)

      reset()

      onSuccess?.()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to add task')
    }
  }

  return (
    <Container>
      {submitError && <div>{submitError}</div>}

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormTitle>{isEditMode ? 'Edit Task' : 'Add New Task'}</FormTitle>
        <FormInput id="title" type="text" {...register('title')} placeholder="Task Name" />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

        <FormTextarea
          id="description"
          {...register('description')}
          placeholder="Task Description"
          rows={3}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

        <FormSelect
          id="status"
          {...register('status')}
          aria-invalid={errors.status ? 'true' : 'false'}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </FormSelect>
        {errors.status && <ErrorMessage>{errors.status.message}</ErrorMessage>}

        {isEditMode ? (
          <FormButtons>
            <Button type="submit">Save Changes</Button>
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
          </FormButtons>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </Button>
        )}
      </Form>
    </Container>
  )
}

export default TaskForm

const commonStyles = css`
  width: 100%;
  padding: 8px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    border-color: #aaa;
    outline: none;
  }
`
const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  background: '#fff',
  border: '1px solid #ccc',
  borderRadius: 8,
  padding: '40px'
})
const Form = styled.form({
  width: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: 16
})
const FormTitle = styled.h2({
  fontSize: 24,
  margin: 0
})
const ErrorMessage = styled.p({
  margin: 0,
  fontSize: 14,
  color: 'red'
})
const FormInput = styled.input`
  ${commonStyles}
`
const FormTextarea = styled.textarea`
  ${commonStyles}
  resize: vertical;
`
const FormSelect = styled.select`
  ${commonStyles}
`
const FormButtons = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 16
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
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16);',

  '&:hover': {
    backgroundColor: '#ff5a8a',
    cursor: 'pointer'
  }
})
