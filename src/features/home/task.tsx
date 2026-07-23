import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@src/core/constance/colors';
import { GStyles } from '@src/core/constance/styles';
import { typography } from '@src/core/constance/typography';
import { type RootStackParamsList } from '@src/core/navigation/types';
import { useTaskStore } from '@src/core/store/taskStore';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamsList>;

export default function TaskScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const categories = useTaskStore((state) => state.categories);
  const tasks = useTaskStore((state) => state.tasks);
  const addCategory = useTaskStore((state) => state.addCategory);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);
  const toggleTaskStarred = useTaskStore((state) => state.toggleTaskStarred);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'open' | 'done'>('all');
  const [sortMode, setSortMode] = useState<'dueDate' | 'createdAt'>('dueDate');

  useEffect(() => {
    if (categories.length === 0) {
      addCategory('Work');
      addCategory('Personal');
    }

    if (tasks.length === 0 && categories.length === 0) {
      const workCategory = useTaskStore.getState().categories.find((item) => item.name === 'Work');
      const personalCategory = useTaskStore.getState().categories.find((item) => item.name === 'Personal');

      if (workCategory) {
        addTask({
          title: 'Design task screen',
          description: 'Workflow and layout review',
          categoryId: workCategory.id,
          status: 'open',
          dueDate: '2026-07-25',
        });
      }

      if (personalCategory) {
        addTask({
          title: 'Plan weekend',
          description: 'Prepare an easy and restful schedule',
          categoryId: personalCategory.id,
          status: 'done',
          dueDate: '2026-07-24',
        });
      }
    }
  }, [addCategory, addTask, categories.length, tasks.length]);

  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const categoryMatch = selectedCategory === 'all' || task.categoryId === selectedCategory;
      const statusMatch = selectedStatus === 'all' || task.status === selectedStatus;
      return categoryMatch && statusMatch;
    });

    return [...filtered].sort((a, b) => {
      const valueA = a[sortMode];
      const valueB = b[sortMode];
      return valueA.localeCompare(valueB);
    });
  }, [selectedCategory, selectedStatus, sortMode, tasks]);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerCard}>
        <Text style={[typography.text_sm_semibold, styles.eyebrow]}>Task list</Text>
        <Text style={[typography.title_sm_bold, styles.title]}>Track work by category and status</Text>
        <Text style={[typography.text_md_regular, styles.subtitle]}>
          Filter your tasks, sort quickly, and update progress from one place.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Categories')} style={styles.headerAction}>
          <Text style={styles.headerActionText}>Manage categories</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionCard}>
        <Text style={[typography.text_lg_semibold, styles.sectionTitle]}>Filters</Text>
        <View style={styles.filterRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
            <FilterChip label="All" active={selectedCategory === 'all'} onPress={() => setSelectedCategory('all')} />
            {categories.map((category) => (
              <FilterChip
                key={category.id}
                label={category.name}
                active={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.filterRow}>
          <FilterChip label="All" active={selectedStatus === 'all'} onPress={() => setSelectedStatus('all')} />
          <FilterChip label="Open" active={selectedStatus === 'open'} onPress={() => setSelectedStatus('open')} />
          <FilterChip label="Done" active={selectedStatus === 'done'} onPress={() => setSelectedStatus('done')} />
        </View>

        <View style={styles.filterRow}>
          <FilterChip label="Due date" active={sortMode === 'dueDate'} onPress={() => setSortMode('dueDate')} />
          <FilterChip label="Created time" active={sortMode === 'createdAt'} onPress={() => setSortMode('createdAt')} />
        </View>
      </View>

      <View style={styles.sectionCard}>
        <View style={[GStyles.rowBetween, styles.sectionHeader]}>
          <Text style={[typography.text_lg_semibold, styles.sectionTitle]}>Tasks</Text>
          <Text style={[typography.text_sm_medium, styles.counter]}>{filteredTasks.length} items</Text>
        </View>

        {filteredTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[typography.text_md_medium, styles.emptyText]}>No tasks match these filters.</Text>
          </View>
        ) : (
          filteredTasks.map((task) => (
            <TouchableOpacity key={task.id} onPress={() => navigation.navigate('TaskDetail', { taskId: task.id })} style={styles.taskItem}>
              <View style={styles.taskMain}>
                <TouchableOpacity onPress={() => toggleTaskStatus(task.id)} style={styles.statusButton}>
                  <Text style={styles.statusIcon}>{task.status === 'done' ? '✓' : '○'}</Text>
                </TouchableOpacity>

                <View style={styles.taskTextWrap}>
                  <Text style={[typography.text_md_semibold, styles.taskTitle]}>{task.title}</Text>
                  <Text style={[typography.text_sm_regular, styles.taskMeta]}>
                    {task.description || 'No description'}
                  </Text>
                  <Text style={[typography.text_xs_medium, styles.taskMeta]}>
                    Due: {task.dueDate || 'No date'} • {new Date(task.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => toggleTaskStarred(task.id)} style={styles.starButton}>
                <Text style={styles.starIcon}>{task.starred ? '★' : '☆'}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.chip, active && styles.activeChip]}>
      <Text style={[typography.text_sm_medium, active ? styles.activeChipText : styles.chipText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 36,
    backgroundColor: colors.brandPink50,
  },
  headerCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  eyebrow: {
    color: colors.brandPink600,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  title: {
    color: colors.slate900,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.slate600,
    lineHeight: 24,
    marginBottom: 12,
  },
  headerAction: {
    alignSelf: 'flex-start',
    backgroundColor: colors.brandPink50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  headerActionText: {
    color: colors.brandPink700,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sectionTitle: {
    color: colors.slate800,
  },
  filterRow: {
    marginTop: 12,
  },
  chipsRow: {
    gap: 8,
    paddingRight: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.slate100,
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: colors.brandPink500,
  },
  chipText: {
    color: colors.slate600,
  },
  activeChipText: {
    color: colors.white,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  counter: {
    color: colors.brandPink600,
  },
  emptyState: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.slate500,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.slate200,
  },
  taskMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.brandPink400,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statusIcon: {
    color: colors.brandPink600,
    fontSize: 14,
  },
  taskTextWrap: {
    flex: 1,
  },
  taskTitle: {
    color: colors.slate800,
    marginBottom: 2,
  },
  taskMeta: {
    color: colors.slate500,
    marginTop: 2,
  },
  starButton: {
    marginLeft: 10,
  },
  starIcon: {
    fontSize: 20,
    color: colors.yellow500,
  },
});