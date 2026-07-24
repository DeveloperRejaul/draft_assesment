import { create } from "zustic";
import { supabase } from '@src/core/utils/supabase';
import { type TaskStoreType } from "./type";
import { persist } from "../middlewares/persist";
import storage from "../storage/storage";
import { showNativeAlert } from "../utils/alert";
import net from "../utils/net";

export const useTaskStore = create<TaskStoreType>((set, get) => ({
  /** List of all tasks. */
  tasks: [],
  /** List of all categories. */
  categories: [],
  isInitializeing: false,
  isRefreshing: false,
  lastSyncAt: null,
  isOffline: false,
  selectedCategory: 'all',
  selectedStatus: 'all',
  sortMode: 'dueDate',


  /**
 * Initializes the task store.
 *
 * Loads cached data from local storage first for fast startup,
 * then synchronizes data with Supabase when internet is available.
 */
  async init() {
    try {
      set({ isInitializeing: true });

      // Load cached data first
      const cache = get().getCachedData();

      // If online, refresh from server
      const isConnected = await net.isConnected();
    

      if (cache) {
        set({
          tasks: cache.tasks ?? [],
          categories: cache.categories ?? [],
          isOffline: !isConnected
        });
      }

    

      if (isConnected) {
        await get().syncFromServer();
      }
    } catch (e) {
      console.error(e);
    } finally {
      set({ isInitializeing: false });
    }

  },

  /**
   * 
   */
  async setNetStatus() {
    const isConnected = await net.isConnected();
    set({isOffline: !isConnected})
  },

  /**
 * Retrieves cached task data from local storage.
 *
 * @returns Cached store data or `null` if no cache exists.
 */
  getCachedData () {
    const cache = storage.getItem('app_store');
    if(cache) {
      const parse = JSON.parse(cache)
      return parse
    };
    return null
  },

  /**
 * Handles internet reconnection events.
 *
 * Refreshes the local store with the latest
 * data from Supabase.
 */
  async onInternet() {
    try {
      set({ isRefreshing: true });
      await get().syncFromServer();
    } catch (error) {
      console.log(error);
    }
    finally{
      set({ isRefreshing: false });
    }
  }, 

  /**
 * Synchronizes tasks and categories from Supabase.
 *
 * Maps database fields into application models
 * and preserves local-only fields such as starred status.
 */
  async syncFromServer() {
    const { data: categoriesData, error: categoriesError } = await supabase.from('categories').select('*')
    const { data: tasksData, error: tasksError } = await supabase.from('tasks').select('*')

    if(categoriesError || tasksError) { 
      return
    }
    const cache = get().getCachedData(); 
    const tasks = tasksData?.map((task) => ({ 
      ...task,dueDate: task.due_date,
      createdAt: task.created_at,
      categoryId: task.category_id, 
      starred: cache?.tasks?.find((t) => t.id === task.id)?.starred || false 
    }))
    set({
      tasks,
      categories: categoriesData ?? [],
      lastSyncAt: new Date(),
    })
  },


  /**
 * Updates the selected task category filter.
 * @param data Selected category identifier.
 */
  setSelectedCategory: (data: TaskStoreType['selectedCategory']) => set({ selectedCategory: data }),

  /**
 * Updates the selected task status filter.
 * @param data Selected task status.
 */
  setSelectedStatus: (data: TaskStoreType['selectedStatus']) => set({ selectedStatus: data }),

  /**
 * Updates the task sorting mode.
 * @param data Selected sorting option.
 */
  setSortMode: (data: TaskStoreType['sortMode']) => set({ sortMode: data }),


  /**
 * Renames an existing category.
 *
 * Updates the category name locally first for an instant UI update,
 * then synchronizes the change with Supabase when internet is available.
 *
 * @param id Category identifier.
 * @param name New category name.
 */
  async renameCategory (id: string, name: string) {
    try {
      const res = await supabase
        .from('categories')
        .update({ name })
        .eq('id', id);

      if(res.success) {
        set({categories: get().categories.map((cat) => cat.id === id ? {...cat, name} : cat)})
        return
      }
      showNativeAlert({
        title: 'Error',
        body: 'Failed to update category'
      })
      
    } catch (error) {
      if(error) {
        showNativeAlert({
          title: 'Error',
          body: 'Failed to update category'
        })
      }
    }
  },
  /**
   * Creates a new category.
   *
   * @param name Category name.
   */
  async addCategory(name) {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    try {
      const res = await supabase
        .from('categories')
        .insert({name: trimmedName})
        .select()
        .single();  
          
      // update category id
      if(res.success) {
        set({categories: get().categories.map((cat) => cat.id === res.data.id ? {...cat, id: res.data.id} : cat)})
        return
      }
      showNativeAlert({
        title: 'Error',
        body: 'Failed to add category'
      })
    } catch {
      showNativeAlert({
        title: 'Error',
        body: 'Failed to add category'
      })
    }
  },

  /**
   * Deletes a category by its ID.
   *
   * @param categoryId Category identifier.
   */
  async deleteCategory(categoryId) {
    try {
      const res = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if(res.success) {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== categoryId),
          tasks: state.tasks.filter((task) => task.categoryId !== categoryId),
        }));
        return
      }
      showNativeAlert({
        title: 'Error',
        body: 'Failed to delete category'
      })
    } catch (error) {
      console.log(error);
      showNativeAlert({
        title: 'Error',
        body: 'Failed to delete category'
      })
    }
  },

  /**
   * Deletes a task.
   *
   * @param taskId Task identifier.
   */
  async deleteTask(taskId) {
    const {tasks, getTaskById} = get()
    const task = getTaskById(taskId);
    if(!task) return;
  
    try {
      const res = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if(res.success) {
        set({tasks: tasks.filter((t) => t.id !== taskId)});
        return
      }
      showNativeAlert({
        title: 'Error',
        body: 'Failed to delete task'
      })
    
    } catch (error) {
      console.log(error);
      showNativeAlert({
        title: 'Error',
        body: 'Failed to delete task'
      })
    }
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
    set({tasks: get().tasks.map((task) => task.id === taskId ? { ...task, starred: !task?.starred } : task)});
  },

  /**
   * Toggles the task status between
   * `open` and `done`.
   *
   * @param taskId Task identifier.
   */
  async toggleTaskStatus(taskId) {
    const { getTaskById, tasks } = get();
    const task = getTaskById(taskId);

    if (!task) return;
    const newStatus = task.status === 'open' ? 'done' : 'open';

    try {
      const res = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId);

      if(res.success)  {
        set({
          tasks: tasks.map((item) =>item.id === taskId? {
            ...item,
            status: newStatus,
          }: item)
        });
        return
      }
      showNativeAlert({
        title: 'Error',
        body: 'Failed to update task status'
      })
      
    } catch (error){
      console.log(error);
      showNativeAlert({
        title: 'Error',
        body: 'Failed to update task status'
      })
    }
  },

  /**
   * Updates editable fields of a task.
   *
   * @param taskId Task identifier.
   * @param updates Fields to update.
   */
  async updateTask(taskId, updates) {
    try {
      const res = await supabase
        .from('tasks')
        .update({ 
          category_id: updates.categoryId,
          title: updates.title,
          description: updates.description
        })
        .eq('id', taskId);

      if(res.success) {
        set({tasks: get().tasks.map((task) =>task.id === taskId ? { ...task, ...updates } : task)});
        return
      }
      showNativeAlert({
        title: 'Error',
        body: 'Failed to update task'
      })
      
    } catch (error) {
      console.log(error);
      showNativeAlert({
        title: 'Error',
        body: 'Failed to update task'
      })
    }
  },

  /**
 * Returns filtered and sorted tasks based on current store settings.
 *
 * Applies:
 * - Category filter
 * - Status filter
 * - Sorting mode
 *
 * @returns Filtered and sorted task list.
 */
  getFilteredtask() {
    const {
      tasks,
      selectedCategory,
      selectedStatus,
      sortMode,
    } = get();

    let filtered = [...tasks];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((task) => task.categoryId === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((task) => task.status === selectedStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortMode) {
      case 'dueDate': {
        const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
        const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
        return aTime - bTime;
      }
      case 'createdAt':
        return ( new Date(b.createdAt).getTime() -new Date(a.createdAt).getTime());

      case 'starred':
        return Number(b.starred) - Number(a.starred);
      default:
        return 0;
      }
    });

    return filtered;
  }

}), [persist('app_store')]);