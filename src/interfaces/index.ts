interface iTask {
  id: string
  title?: string
  description?: string
  status?: 'To Do' | 'In process' | 'Completed'
  date?: string
  completed?: boolean
}

interface iTasksState {
  tasks: iTask[]
  loading: boolean
  error: string | null | undefined
  status: 'All' | 'To Do' | 'In process' | 'Completed'
}

export type { iTask, iTasksState }
