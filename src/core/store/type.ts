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
  selectedCategory: string,
  isInitializeing:boolean
  isRefreshing:boolean
  lastSyncAt: Date | null
  isOffline: boolean
  selectedStatus: 'all' | 'open' | 'done',
  sortMode: 'dueDate' | 'createdAt' | 'starred'
  setSelectedCategory: (data:TaskStoreType['selectedCategory']) => void
  setSelectedStatus: (data:TaskStoreType['selectedStatus']) => void
  setSortMode: (data:TaskStoreType['sortMode']) => void
  addCategory: (name: string) => void
  renameCategory: (id:string, name: string) => void
  deleteCategory: (categoryId: string) => void
  updateTask: (taskId: string, updates: Partial<Pick<TaskItem, 'title' | 'description' | 'categoryId' | 'dueDate'>>) => void
  toggleTaskStatus: (taskId: string) => void
  toggleTaskStarred: (taskId: string) => void
  deleteTask: (taskId: string) => void
  getTaskById: (taskId: string) => TaskItem | undefined
  init: () => void
  getFilteredtask: () => TaskItem[]
  onInternet(): Promise<void>
  syncFromServer(): Promise<void>
  getCachedData(): {tasks: TaskItem[], categories: CategoryItem[]} | null
  setNetStatus(): Promise<void>
}

export interface TaskServerResponceType {
  id: string
  title: string
  description: string
  category_id: string
  status: string
  due_date: string
  created_at: string
}

export interface SupabaseRes<T> {
  success: boolean
  error: any
  data: T[]
  count: any
  status: number
  statusText: string
}

export interface TaskServerResponceType {
  id: string
  title: string
  description: string
  category_id: string
  status: string
  due_date: string
  created_at: string
}
