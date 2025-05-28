import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'

import type { iTask } from '../interfaces'
import { addTask, removeTask, updateTask } from '../store/slices/tasks'

type iTaskFormProps = {
  initialData?: iTask
  onSuccess?: () => void
}

const schema = yup.object().shape({
  title: yup.string().required('Task name is required').min(3).max(100),
  description: yup.string().max(500),
  status: yup.string().required('Status is required')
})

const TaskForm = ({ initialData, onSuccess }: iTaskFormProps) => {
  const dispatch = useDispatch()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const isEditMode = !!initialData

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: initialData || {
      title: '',
      description: '',
      status: 'To Do'
    }
  })

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitError(null)

      const taskData = {
        ...data,
        id: initialData?.id || uuidv4().split('-')[0],
        date: initialData?.date || new Date().toISOString().split('T')[0]
      }

      if (isEditMode) {
        dispatch(updateTask(taskData))
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
          dispatch(updateTask(initialData))
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

      reset()

      onSuccess?.()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to add task')
    }
  }

  return (
    <Container>
      {submitError && <div className="form__error">{submitError}</div>}

      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>{isEditMode ? 'Edit Task' : 'Add New Task'}</FormTitle>
        <FormInput id="title" type="text" {...register('title')} placeholder="Task Name" />
        {errors.title && (
          <ErrorMessage className="form__error">{errors.title.message}</ErrorMessage>
        )}

        <FormTextarea
          id="description"
          {...register('description')}
          placeholder="Task Description"
          rows={3}
        />
        {errors.description && (
          <ErrorMessage className="form__error">{errors.description.message}</ErrorMessage>
        )}

        <FormSelect
          id="status"
          {...register('status')}
          aria-invalid={errors.status ? 'true' : 'false'}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </FormSelect>
        {errors.status && (
          <ErrorMessage className="form__error">{errors.status.message}</ErrorMessage>
        )}

        <FormButtons>
          <Button className="form__btn" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isEditMode
                ? 'Saving...'
                : 'Adding...'
              : isEditMode
                ? 'Save Changes'
                : 'Add Task'}
          </Button>
          {isEditMode && (
            <Button className="form__btn" type="submit">
              Cancel
            </Button>
          )}
        </FormButtons>
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
