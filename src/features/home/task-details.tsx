import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@src/core/constance/colors';
import { typography } from '@src/core/constance/typography';
import { type RootStackParamsList } from '@src/core/navigation/types';
import { useTaskStore } from '@src/core/store/taskStore';

type TaskDetailRouteProp = RouteProp<RootStackParamsList, 'TaskDetail'>;
type TaskDetailNavigationProp = NativeStackNavigationProp<RootStackParamsList>;

export default function TaskDetailsScreen() {
  const route = useRoute<TaskDetailRouteProp>();
  const navigation = useNavigation<TaskDetailNavigationProp>();
  const task = useTaskStore((state) => state.getTaskById(route.params.taskId));
  const categories = useTaskStore((state) => state.categories);
  const updateTask = useTaskStore((state) => state.updateTask);
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);
  const toggleTaskStarred = useTaskStore((state) => state.toggleTaskStarred);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [dueDate, setDueDate] = useState(task?.dueDate ?? '');
  const [categoryId, setCategoryId] = useState(task?.categoryId ?? '');

  const categoryName = useMemo(() => categories.find((item) => item.id === task?.categoryId)?.name ?? 'Uncategorized', [categories, task?.categoryId]);

  if (!task) {
    return (
      <View style={styles.emptyState}>
        <Text style={[typography.title_sm_bold, styles.emptyTitle]}>Task not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSave = () => {
    if (!task) return;
    updateTask(task.id, {
      title,
      description,
      categoryId,
      dueDate,
    });
  };

  const handleDelete = () => {
    if (!task) return;
    deleteTask(task.id);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.heroCard}>
        <View style={styles.rowBetween}>
          <Text style={[typography.text_sm_semibold, styles.eyebrow]}>Task details</Text>
          <TouchableOpacity onPress={() => toggleTaskStarred(task.id)} style={styles.starButton}>
            <Text style={styles.starIcon}>{task.starred ? '★' : '☆'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={[typography.title_sm_bold, styles.title]}>{task.title}</Text>
        <Text style={[typography.text_md_regular, styles.description]}>{task.description || 'No description added yet.'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={[typography.text_lg_semibold, styles.cardTitle]}>Edit task</Text>
        <TextInput value={title} onChangeText={setTitle} placeholder="Task title" style={styles.input} placeholderTextColor={colors.slate400} />
        <TextInput value={description} onChangeText={setDescription} placeholder="Task description" style={[styles.input, styles.textArea]} multiline placeholderTextColor={colors.slate400} />
        <TextInput value={dueDate} onChangeText={setDueDate} placeholder="Due date" style={styles.input} placeholderTextColor={colors.slate400} />

        <Text style={[typography.text_sm_medium, styles.label]}>Category</Text>
        <View style={styles.categoryList}>
          {categories.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => setCategoryId(item.id)} style={[styles.categoryChip, categoryId === item.id && styles.activeCategoryChip]}>
              <Text style={[typography.text_sm_medium, categoryId === item.id ? styles.activeCategoryText : styles.categoryText]}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={handleSave} style={styles.primaryAction}>
          <Text style={styles.primaryActionText}>Save changes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={[typography.text_lg_semibold, styles.cardTitle]}>Quick actions</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={() => toggleTaskStatus(task.id)} style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>{task.status === 'done' ? 'Re-open task' : 'Complete task'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteAction}>
            <Text style={styles.deleteActionText}>Delete task</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.metaGrid}>
          <MetaItem label="Category" value={categoryName} />
          <MetaItem label="Due date" value={task.dueDate || 'No due date'} />
          <MetaItem label="Created" value={new Date(task.createdAt).toLocaleDateString()} />
          <MetaItem label="Status" value={task.status === 'done' ? 'Done' : 'Open'} />
        </View>
      </View>
    </ScrollView>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaItem}>
      <Text style={[typography.text_sm_medium, styles.metaLabel]}>{label}</Text>
      <Text style={[typography.text_md_semibold, styles.metaValue]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 36,
    backgroundColor: colors.brandPink50,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.brandPink50,
  },
  emptyTitle: {
    color: colors.slate800,
    marginBottom: 12,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginBottom: 12,
  },
  backButtonText: {
    color: colors.brandPink700,
    fontSize: 16,
    fontWeight: '600',
  },
  heroCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
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
  description: {
    color: colors.slate600,
    lineHeight: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: colors.slate800,
  },
  starButton: {
    padding: 4,
  },
  starIcon: {
    fontSize: 24,
    color: colors.yellow500,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10,
    color: colors.slate800,
  },
  textArea: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  label: {
    color: colors.slate600,
    marginTop: 12,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.slate100,
  },
  activeCategoryChip: {
    backgroundColor: colors.brandPink500,
  },
  categoryText: {
    color: colors.slate600,
  },
  activeCategoryText: {
    color: colors.white,
  },
  metaGrid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    minWidth: '45%',
    backgroundColor: colors.slate50,
    borderRadius: 14,
    padding: 12,
  },
  metaLabel: {
    color: colors.slate500,
    marginBottom: 4,
  },
  metaValue: {
    color: colors.slate800,
  },
  actionsRow: {
    marginTop: 12,
    gap: 12,
  },
  primaryAction: {
    backgroundColor: colors.brandPink500,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 14,
  },
  primaryActionText: {
    color: colors.white,
    fontWeight: '600',
  },
  secondaryAction: {
    borderWidth: 1,
    borderColor: colors.brandPink200,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    flex: 1,
  },
  secondaryActionText: {
    color: colors.brandPink700,
    fontWeight: '600',
  },
  deleteAction: {
    borderWidth: 1,
    borderColor: colors.red200,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    flex: 1,
  },
  deleteActionText: {
    color: colors.red600,
    fontWeight: '600',
  },
});