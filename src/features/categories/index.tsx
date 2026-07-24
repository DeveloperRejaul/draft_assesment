/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {createForm} from 'zustic/hook-form'
import { colors } from '@src/core/constance/colors';
import { GStyles } from '@src/core/constance/styles';
import { typography } from '@src/core/constance/typography';
import { router } from '@src/core/navigation/router';
import { useTaskStore } from '@src/core/store/taskStore';

const useForm  = createForm({
  defaultValues :{
    category:{
      value:""
    }
  }
});


export default function CategoryScreen() {
  const { Controller, getValues, handleSubmit, setValue, reset} = useForm();
  const categories = useTaskStore((state) => state.categories);
  const addCategory = useTaskStore((state) => state.addCategory);
  const deleteCategory = useTaskStore((state) => state.deleteCategory);
  const renameCategory = useTaskStore((state) => state.renameCategory);
  
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef<{ id: string} | null>(null);

  const handleAddCategory = (data: ReturnType<typeof getValues>) => {
    if(typeof data === 'string')  return

    if(isEditing && editRef.current) {
      renameCategory(editRef.current.id, data.category);
      setIsEditing(false);
      editRef.current = null;
    } else {
      addCategory(data.category);
    }
    reset()
  };


  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.heroCard}>
        <Text style={[typography.text_sm_semibold, styles.eyebrow]}>Categories</Text>
        <Text style={[typography.title_sm_bold, styles.title]}>Organize your tasks</Text>
        <Text style={[typography.text_md_regular, styles.subtitle]}>Create categories and keep every task grouped in one place.</Text>
      </View>

      <View style={styles.card}>
        <Text style={[typography.text_lg_semibold, styles.cardTitle]}>Add a category</Text>
        <Controller 
          field='category'   
          render={({value, onChange}) => {
            return (
              <TextInput
                value={value}
                onChangeText={(v) => onChange(v)}
                placeholder="Category name"
                style={styles.input}
                placeholderTextColor={colors.slate400}
              />
            )}}
        />
        <TouchableOpacity onPress={handleSubmit(handleAddCategory)} style={styles.primaryAction}>
          <Text style={styles.primaryActionText}>{isEditing ? 'Rename category' : 'Create category'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={[typography.text_lg_semibold, styles.cardTitle]}>Categories</Text>
        {categories.length === 0 ? <Text style={[typography.text_md_regular, styles.emptyText]}>No categories yet. Create one to get started.</Text>: (
          categories.map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <Text style={[typography.text_md_semibold, styles.categoryName]}>{category.name}</Text>
              <View style={GStyles.row}>
                <TouchableOpacity 
                  onPress={() => {
                    editRef.current = { id: category.id};
                    setValue('category', category.name);
                    setIsEditing(true);
                  }} 
                  style={styles.renameButton}
                >
                  <Text style={styles.renameButtonText}>Rename</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteCategory(category.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 36,
    backgroundColor: colors.brandPink50,
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
  subtitle: {
    color: colors.slate600,
    lineHeight: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: colors.slate800,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    color: colors.slate800,
  },
  primaryAction: {
    backgroundColor: colors.brandPink500,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 999,
  },
  primaryActionText: {
    color: colors.white,
    fontWeight: '600',
  },
  emptyText: {
    color: colors.slate500,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.slate200,
  },
  categoryName: {
    color: colors.slate800,
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.red50,
  },
  renameButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.blue50,
  },
  deleteButtonText: {
    color: colors.red600,
    fontWeight: '600',
  },
  renameButtonText: {
    color: colors.blue600,
    fontWeight: '600',
  },
});