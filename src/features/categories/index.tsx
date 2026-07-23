import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { type NativeStackNavigationProp } from '@react-navigation/native-stack'
import { colors } from '@src/core/constance/colors'
import { typography } from '@src/core/constance/typography'
import type { RootStackParamsList } from '@src/core/navigation/types'
import { useTaskContext } from '@src/core/provider/TaskProvider'

type CategoriesNavigationProp = NativeStackNavigationProp<RootStackParamsList, 'Categories'>

export default function CategoriesScreen() {
  const navigation = useNavigation<CategoriesNavigationProp>()
  const { categories, addCategory, deleteCategory } = useTaskContext()
  const [name, setName] = useState('')

  const submitCategory = () => {
    const trimmed = name.trim()
    if (!trimmed) {
      return
    }

    addCategory(trimmed)
    setName('')
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[typography.title_sm_bold, styles.title]}>Categories</Text>
          <Text style={[typography.text_sm_regular, styles.subtitle]}>Add or manage the categories used to organize tasks.</Text>
        </View>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[typography.text_sm_bold, styles.backButtonText]}>Close</Text>
        </Pressable>
      </View>

      <View style={styles.addRow}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="New category"
          style={styles.input}
          placeholderTextColor={colors.slate400}
        />
        <Pressable style={styles.addButton} onPress={submitCategory}>
          <Text style={[typography.text_md_bold, styles.addButtonText]}>Add</Text>
        </Pressable>
      </View>

      {categories.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[typography.text_md_regular, styles.emptyText]}>No categories yet.</Text>
        </View>
      ) : (
        categories.map((category) => (
          <View key={category.id} style={styles.categoryRow}>
            <Text style={[typography.text_md_medium, styles.categoryName]}>{category.name}</Text>
            <Pressable style={styles.deleteButton} onPress={() => deleteCategory(category.id)}>
              <Text style={[typography.text_sm_bold, styles.deleteButtonText]}>Delete</Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: colors.slate900,
  },
  subtitle: {
    marginTop: 6,
    color: colors.slate600,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  backButtonText: {
    color: colors.brandPink700,
  },
  addRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: colors.slate50,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    color: colors.slate900,
  },
  addButton: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: colors.brandPink500,
    borderRadius: 18,
    justifyContent: 'center',
  },
  addButtonText: {
    color: colors.white,
  },
  emptyState: {
    paddingTop: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.slate600,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  categoryName: {
    color: colors.slate900,
  },
  deleteButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    color: colors.red600,
  },
})