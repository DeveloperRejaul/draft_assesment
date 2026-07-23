import React, { useMemo, useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { colors } from '@src/core/constance/colors'
import { GStyles } from '@src/core/constance/styles'
import { typography } from '@src/core/constance/typography'
import { router } from '@src/core/navigation/router'
import { useTaskContext } from '@src/core/provider/TaskProvider'

type SortOption = 'dueDate' | 'createdAt'

type StatusFilter = 'all' | 'open' | 'done'

export default function TasksScreen() {
  const { tasks, categories } = useTaskContext()
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortOption, setSortOption] = useState<SortOption>('dueDate')

  const categoryOptions = useMemo(() => [{ id: 'all', name: 'All' }, ...categories],[categories])

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => (categoryFilter === 'all' ? true : task.categoryId === categoryFilter))
      .filter((task) => (statusFilter === 'all' ? true : task.status === statusFilter))
      .sort((a, b) => {
        if (sortOption === 'dueDate') {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })
  }, [tasks, categoryFilter, statusFilter, sortOption])

  const renderTask = ({ item }: { item: typeof tasks[number] }) => {
    const categoryName = categories.find((category) => category.id === item.categoryId)?.name ?? 'Uncategorized'

    return (
      <Pressable style={styles.taskCard} onPress={() => router.navigate('TaskDetail', { taskId: item.id })}>
        <View style={[GStyles.rowBetween, styles.taskHeader]}>
          <Text style={[typography.text_md_semibold, styles.taskTitle]}>{item.title}</Text>
          <Text style={[typography.text_xs_medium, styles.statusText, item.status === 'done' ? styles.statusDone : styles.statusPending]}> {item.status}</Text>
        </View>
        <Text style={[typography.text_sm_regular, styles.taskMeta]}>{categoryName}</Text>
        <View style={[GStyles.rowBetween, styles.taskFooter]}>
          <Text style={[typography.text_xs_regular, styles.taskFooterText]}>Due {new Date(item.dueDate).toLocaleDateString()}</Text>
          <Text style={[typography.text_xs_regular, styles.taskFooterText]}>{item.starred ? '★ Starred' : 'Not starred'}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <View style={[GStyles.rowBetween, styles.pageHeader]}>
        <View>
          <Text style={[typography.title_xs_bold, styles.title]}>Task List</Text>
          <Text style={[typography.text_sm_regular, styles.subtitle]}>Filter by category, status, and sort by date.</Text>
        </View>
        <Pressable style={styles.linkButton} onPress={() => router.navigate('Categories')}>
          <Text style={[typography.text_sm_bold, styles.linkButtonText]}>Categories</Text>
        </Pressable>
      </View>

      <View style={styles.filtersRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {categoryOptions.map((category) => (
            <Pressable
              key={category.id}
              style={[styles.filterButton, categoryFilter === category.id && styles.filterButtonActive]}
              onPress={() => setCategoryFilter(category.id)}
            >
              <Text style={[typography.text_xs_medium, categoryFilter === category.id ? styles.filterTextActive : styles.filterText]}>{category.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={[GStyles.rowBetween, styles.sortRow]}>
        {(['all', 'open', 'done'] as StatusFilter[]).map((status) => (
          <Pressable
            key={status}
            style={[styles.sortButton, statusFilter === status && styles.sortButtonActive]}
            onPress={() => setStatusFilter(status)}
          >
            <Text style={[typography.text_xs_medium, statusFilter === status ? styles.sortTextActive : styles.sortText]}>{status}</Text>
          </Pressable>
        ))}
      </View>

      <View style={[GStyles.rowBetween, styles.sortRow]}> 
        {(['dueDate', 'createdAt'] as SortOption[]).map((option) => (
          <Pressable
            key={option}
            style={[styles.sortButton, sortOption === option && styles.sortButtonActive]}
            onPress={() => setSortOption(option)}
          >
            <Text style={[typography.text_xs_medium, sortOption === option ? styles.sortTextActive : styles.sortText]}>
              {option === 'dueDate' ? 'Due date' : 'Created'}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[typography.text_md_regular, styles.emptyText]}>No tasks match your filters.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.brandPink50,
  },
  pageHeader: {
    marginBottom: 18,
  },
  title: {
    color: colors.slate900,
  },
  subtitle: {
    marginTop: 6,
    color: colors.slate600,
  },
  linkButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  linkButtonText: {
    color: colors.brandPink700,
  },
  filtersRow: {
    marginBottom: 16,
  },
  filterScroll: {
    gap: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
  filterButtonActive: {
    backgroundColor: colors.brandPink500,
  },
  filterText: {
    color: colors.slate700,
  },
  filterTextActive: {
    color: colors.white,
  },
  sortRow: {
    marginBottom: 16,
    gap: 10,
  },
  sortButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
  sortButtonActive: {
    backgroundColor: colors.slate900,
  },
  sortText: {
    color: colors.slate700,
  },
  sortTextActive: {
    color: colors.white,
  },
  listContent: {
    paddingBottom: 24,
  },
  taskCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  taskHeader: {
    marginBottom: 8,
  },
  taskTitle: {
    color: colors.slate900,
    flex: 1,
  },
  statusText: {
    textTransform: 'capitalize',
  },
  statusDone: {
    color: colors.green700,
  },
  statusPending: {
    color: colors.orange700,
  },
  taskMeta: {
    color: colors.slate600,
    marginBottom: 10,
  },
  taskFooter: {
    marginTop: 8,
  },
  taskFooterText: {
    color: colors.slate500,
  },
  emptyState: {
    marginTop: 48,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.slate600,
  },
})