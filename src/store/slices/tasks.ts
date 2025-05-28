import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { iTask, iTasksState } from '../../interfaces'

const API_BASE_URL = 'http://localhost:3001'

const initialState: iTasksState = {
  tasks: [],
  loading: false,
  error: null,
  status: 'All'
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        console.log('fetchTasks.pending')
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<iTask[]>) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong'
      })
  }
})

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`)

  if (!response.ok) throw new Error('Failed to fetch')

  return await response.json()
  // const data = await response.json()

  // return data.map((task: iTask) => ({
  //   id: task.id,
  //   title: task.title,
  //   description: '',
  //   status: task.completed ? 'completed' : 'to do',
  //   date: new Date(),
  //   completed: false
  // }))
})

export const {} = tasksSlice.actions
export default tasksSlice.reducer
