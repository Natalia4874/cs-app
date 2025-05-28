interface iTask {
  id?: number | string
  title: string
  description: string
  status: 'to do' | 'in process' | 'completed'
  date: string
  completed: boolean
}

interface iTasksState {
  tasks: iTask[]
  loading: boolean
  error: string | null | undefined
  status: 'All' | 'to do' | 'in process' | 'completed'
}

export type { iTask, iTasksState }
