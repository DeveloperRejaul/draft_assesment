import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { type RouteProp,useRoute } from '@react-navigation/native'
import { colors } from '@src/core/constance/colors'
import { GStyles } from '@src/core/constance/styles'
import { typography } from '@src/core/constance/typography'
import { router } from '@src/core/navigation/router'
import type { RootStackParamsList } from '@src/core/navigation/types'
import { useTaskContext } from '@src/core/provider/TaskProvider'

type TaskDetailRouteProp = RouteProp<RootStackParamsList, 'TaskDetail'>

const formatDate = (value: string) => new Date(value).toLocaleString()

export default function TaskDetailScreen() {
  const route = useRoute<TaskDetailRouteProp>()
  const { taskId } = route.params
  const { getTaskById, updateTask, toggleTaskStatus, toggleTaskStarred, deleteTask, categories } = useTaskContext()

  const task = useMemo(() => getTaskById(taskId), [getTaskById, taskId])
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
    }
  }, [task])

  if (!task) {
    return (
      <View style={[GStyles.centerFull, styles.emptyState]}>
        <Text style={[typography.text_lg_bold, styles.emptyTitle]}>Task not found</Text>
        <Pressable onPress={() => router.back}>
          <Text style={[typography.text_md_bold]}>Go back</Text>
        </Pressable>
      </View>
    )
  }

  const categoryName = categories.find((category) => category.id === task.categoryId)?.name ?? 'Uncategorized'

  const handleSave = () => {
    updateTask(task.id, { title, description })
    router.back()
  }

  const handleDelete = () => {
    Alert.alert('Delete task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteTask(task.id)
          router.back()
        },
      },
    ])
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[typography.title_sm_bold, styles.screenTitle]}>Task detail</Text>
          <Text style={[typography.text_sm_regular, styles.subTitle]}>Edit, complete, star, or delete your task.</Text>
        </View>
        <Pressable style={styles.linkButton} onPress={() => router.back()}>
          <Text style={[typography.text_sm_bold, styles.linkButtonText]}>Back</Text>
        </Pressable>
      </View>

      <View style={styles.detailsCard}>
        <View style={[GStyles.rowBetween, styles.statusRow]}>
          <Text style={[typography.text_md_bold, styles.sectionLabel]}>{task.status === 'done' ? 'Completed' : 'Open'}</Text>
          <Pressable style={[styles.tag, task.starred ? styles.starredTag : styles.unstarredTag]} onPress={() => toggleTaskStarred(task.id)}>
            <Text style={[typography.text_xs_medium, styles.tagText]}>{task.starred ? '★ Starred' : '☆ Star'}</Text>
          </Pressable>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[typography.text_sm_bold, styles.fieldLabel]}>Title</Text>
          <TextInput value={title} onChangeText={setTitle} style={styles.input} placeholder="Task title" />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[typography.text_sm_bold, styles.fieldLabel]}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.textArea]}
            placeholder="Task description"
            multiline
          />
        </View>

        <View style={styles.metaRow}>
          <Text style={[typography.text_xs_regular, styles.metaLabel]}>Category</Text>
          <Text style={[typography.text_xs_regular, styles.metaValue]}>{categoryName}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={[typography.text_xs_regular, styles.metaLabel]}>Created</Text>
          <Text style={[typography.text_xs_regular, styles.metaValue]}>{formatDate(task.createdAt)}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={[typography.text_xs_regular, styles.metaLabel]}>Due</Text>
          <Text style={[typography.text_xs_regular, styles.metaValue]}>{formatDate(task.dueDate)}</Text>
        </View>
      </View>

      <Pressable style={styles.primaryButton} onPress={handleSave}>
        <Text style={[typography.text_md_bold, styles.primaryButtonText]}>Save changes</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => toggleTaskStatus(task.id)}>
        <Text style={[typography.text_md_bold, styles.secondaryButtonText]}>{task.status === 'done' ? 'Reopen task' : 'Mark complete'}</Text>
      </Pressable>
      <Pressable style={styles.dangerButton} onPress={handleDelete}>
        <Text style={[typography.text_md_bold, styles.dangerButtonText]}>Delete task</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  emptyState: {
    padding: 24,
  },
  emptyTitle: {
    color: colors.slate900,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  screenTitle: {
    color: colors.slate900,
  },
  subTitle: {
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
  detailsCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  statusRow: {
    marginBottom: 18,
  },
  sectionLabel: {
    color: colors.slate900,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  starredTag: {
    backgroundColor: colors.yellow200,
  },
  unstarredTag: {
    backgroundColor: colors.slate100,
  },
  tagText: {
    color: colors.slate900,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    marginBottom: 10,
    color: colors.slate700,
  },
  input: {
    backgroundColor: colors.slate50,
    borderRadius: 16,
    padding: 16,
    color: colors.slate900,
    minHeight: 48,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  metaLabel: {
    color: colors.slate500,
  },
  metaValue: {
    color: colors.slate700,
  },
  primaryButton: {
    backgroundColor: colors.brandPink500,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: colors.white,
  },
  secondaryButton: {
    backgroundColor: colors.slate100,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: colors.slate900,
  },
  dangerButton: {
    backgroundColor: colors.red500,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: colors.white,
  },
})