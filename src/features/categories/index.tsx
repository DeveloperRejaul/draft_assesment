import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@src/core/constance/colors';
import { typography } from '@src/core/constance/typography';
import { type RootStackParamsList } from '@src/core/navigation/types';
import { useTaskStore } from '@src/core/store/taskStore';

type CategoryNavigationProp = NativeStackNavigationProp<RootStackParamsList>;

export default function CategoryScreen() {
  const navigation = useNavigation<CategoryNavigationProp>();
  const categories = useTaskStore((state) => state.categories);
  const addCategory = useTaskStore((state) => state.addCategory);
  const deleteCategory = useTaskStore((state) => state.deleteCategory);
  const [name, setName] = useState('');

  const handleAddCategory = () => {
    addCategory(name);
    setName('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.heroCard}>
        <Text style={[typography.text_sm_semibold, styles.eyebrow]}>Categories</Text>
        <Text style={[typography.title_sm_bold, styles.title]}>Organize your tasks</Text>
        <Text style={[typography.text_md_regular, styles.subtitle]}>Create categories and keep every task grouped in one place.</Text>
      </View>

      <View style={styles.card}>
        <Text style={[typography.text_lg_semibold, styles.cardTitle]}>Add a category</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Category name"
          style={styles.input}
          placeholderTextColor={colors.slate400}
        />
        <TouchableOpacity onPress={handleAddCategory} style={styles.primaryAction}>
          <Text style={styles.primaryActionText}>Create category</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={[typography.text_lg_semibold, styles.cardTitle]}>Categories</Text>
        {categories.length === 0 ? (
          <Text style={[typography.text_md_regular, styles.emptyText]}>No categories yet. Create one to get started.</Text>
        ) : (
          categories.map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <Text style={[typography.text_md_semibold, styles.categoryName]}>{category.name}</Text>
              <TouchableOpacity onPress={() => deleteCategory(category.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
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
  deleteButtonText: {
    color: colors.red600,
    fontWeight: '600',
  },
});