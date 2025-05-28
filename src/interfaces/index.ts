interface iTask {
  id?: number | string
  title?: string
  description?: string
  status?: 'To do' | 'In process' | 'Completed'
  date?: string
  completed?: boolean
}

interface iTasksState {
  tasks: iTask[]
  loading: boolean
  error: string | null | undefined
  status: 'All' | 'To do' | 'In process' | 'Completed'
}

export type { iTask, iTasksState }
