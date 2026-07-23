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

export type TaskStoreType = {
   tasks: TaskItem[]
   categories: CategoryItem[]
   addCategory: (name: string) => void
   deleteCategory: (categoryId: string) => void
   addTask: (task: Omit<TaskItem, 'id' | 'createdAt' | 'starred'>) => void
   updateTask: (taskId: string, updates: Partial<Pick<TaskItem, 'title' | 'description' | 'categoryId' | 'dueDate'>>) => void
   toggleTaskStatus: (taskId: string) => void
   toggleTaskStarred: (taskId: string) => void
   deleteTask: (taskId: string) => void
   getTaskById: (taskId: string) => TaskItem | undefined
}
