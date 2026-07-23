import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { CategoryItem, TaskItem, TaskStatus } from './types'

export type TaskContextValue = {
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

const TaskContext = createContext<TaskContextValue | undefined>(undefined)

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

const initialCategories: CategoryItem[] = [
  { id: 'work', name: 'Work' },
  { id: 'personal', name: 'Personal' },
  { id: 'shopping', name: 'Shopping' },
]

const now = new Date().toISOString()
const initialTasks: TaskItem[] = [
  {
    id: '1',
    title: 'Design homepage layout',
    description: 'Build filters, task cards, and category shortcuts.',
    categoryId: 'work',
    status: 'open',
    starred: true,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    createdAt: now,
  },
  {
    id: '2',
    title: 'Buy groceries for dinner',
    description: 'Pick up tomatoes, basil, pasta, and olive oil.',
    categoryId: 'shopping',
    status: 'open',
    starred: false,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: '3',
    title: 'Review project notes',
    description: 'Mark completed items and schedule follow-up tasks.',
    categoryId: 'personal',
    status: 'done',
    starred: false,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
]

export function TaskProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks)
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories)

  const addCategory = (name: string) => {
    setCategories((previous) => [
      ...previous,
      {
        id: createId(),
        name,
      },
    ])
  }

  const deleteCategory = (categoryId: string) => {
    setCategories((previous) => previous.filter((category) => category.id !== categoryId))
  }

  const addTask = (task: Omit<TaskItem, 'id' | 'createdAt' | 'starred'>) => {
    setTasks((previous) => [
      {
        ...task,
        id: createId(),
        createdAt: new Date().toISOString(),
        starred: false,
      },
      ...previous,
    ])
  }

  const updateTask = (
    taskId: string,
    updates: Partial<Pick<TaskItem, 'title' | 'description' | 'categoryId' | 'dueDate'>>,
  ) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId
          ? {
            ...task,
            ...updates,
          }
          : task,
      ),
    )
  }

  const toggleTaskStatus = (taskId: string) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId
          ? {
            ...task,
            status: task.status === 'done' ? 'open' : 'done',
          }
          : task,
      ),
    )
  }

  const toggleTaskStarred = (taskId: string) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId
          ? {
            ...task,
            starred: !task.starred,
          }
          : task,
      ),
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks((previous) => previous.filter((task) => task.id !== taskId))
  }

  const getTaskById = (taskId: string) => tasks.find((task) => task.id === taskId)

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        addCategory,
        deleteCategory,
        addTask,
        updateTask,
        toggleTaskStatus,
        toggleTaskStarred,
        deleteTask,
        getTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider')
  }

  return context
}
