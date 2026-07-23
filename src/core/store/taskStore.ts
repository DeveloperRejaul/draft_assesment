import { create } from "zustic";
import { type TaskStoreType } from "./type";

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Global task store.
 *
 * Manages:
 * - Tasks
 * - Categories
 * - CRUD operations
 * - Task status
 * - Starred tasks
 */
export const useTaskStore = create<TaskStoreType>((set, get) => ({
  /** List of all tasks. */
  tasks: [],

  /** List of all categories. */
  categories: [],

  /**
   * Creates a new category.
   *
   * @param name Category name.
   */
  addCategory(name) {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    set((state) => ({
      categories: [
        ...state.categories,
        {
          id: createId(),
          name: trimmedName,
        },
      ],
    }));
  },

  /**
   * Deletes a category by its ID.
   *
   * @param categoryId Category identifier.
   */
  deleteCategory(categoryId) {
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== categoryId),
      tasks: state.tasks.filter((task) => task.categoryId !== categoryId),
    }));
  },

  /**
   * Adds a new task.
   *
   * The store generates the task ID, creation date,
   * and initializes `starred` to `false`.
   *
   * @param task Task data.
   */
  addTask(task) {
    const trimmedTitle = task.title.trim();
    if (!trimmedTitle) return;

    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: createId(),
          title: trimmedTitle,
          description: task.description.trim(),
          categoryId: task.categoryId,
          status: task.status,
          starred: false,
          dueDate: task.dueDate,
          createdAt: new Date().toISOString(),
        },
      ],
    }));
  },

  /**
   * Deletes a task.
   *
   * @param taskId Task identifier.
   */
  deleteTask(taskId) {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },

  /**
   * Returns a task by its ID.
   *
   * @param taskId Task identifier.
   * @returns The matching task or `undefined`.
   */
  getTaskById(taskId) {
    return get().tasks.find((task) => task.id === taskId);
  },

  /**
   * Toggles the starred state of a task.
   *
   * @param taskId Task identifier.
   */
  toggleTaskStarred(taskId) {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, starred: !task.starred } : task,
      ),
    }));
  },

  /**
   * Toggles the task status between
   * `open` and `done`.
   *
   * @param taskId Task identifier.
   */
  toggleTaskStatus(taskId) {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: task.status === 'open' ? 'done' : 'open' } : task,
      ),
    }));
  },

  /**
   * Updates editable fields of a task.
   *
   * @param taskId Task identifier.
   * @param updates Fields to update.
   */
  updateTask(taskId, updates) {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task,
      ),
    }));
  },
}));