export type TaskStatus = 'open' | 'done'

export type TaskItem = {
  id: string
  title: string
  description: string
  categoryId: string
  status: TaskStatus
  starred: boolean
  dueDate: string
  createdAt: string
}

export type CategoryItem = {
  id: string
  name: string
}
