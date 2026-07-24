import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import FilterChip from '@src/core/components/filter-clip'
import { colors } from '@src/core/constance/colors';
import { typography } from '@src/core/constance/typography';
import { useTaskStore } from '@src/core/store/taskStore';



export default function FilterBottomSheet() {
  const categories = useTaskStore((state) => state.categories);
  const selectedCategory =  useTaskStore(state=> state.selectedCategory)
  const selectedStatus =  useTaskStore(state=> state.selectedStatus)
  const sortMode =  useTaskStore(state=> state.sortMode)

  const setSelectedCategory =  useTaskStore(state=> state.setSelectedCategory)
  const setSelectedStatus =  useTaskStore(state=> state.setSelectedStatus)
  const setSortMode =  useTaskStore(state=> state.setSortMode)


  return (
    <View style={styles.sectionCard}>
      <Text style={[typography.text_lg_semibold, styles.sectionTitle]}>Filters</Text>
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          <FilterChip
            label="All" 
            active={selectedCategory === 'all'} 
            onPress={() => setSelectedCategory('all')} />
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              label={category.name}
              active={selectedCategory === category.id}
              onPress={() =>setSelectedCategory(category.id)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.filterRow}>
        <FilterChip 
          label="All" 
          active={selectedStatus === 'all'} 
          onPress={() => setSelectedStatus('all')} 
        />
        <FilterChip 
          label="Open" 
          active={selectedStatus === 'open'} 
          onPress={() => setSelectedStatus('open')}
        />
        <FilterChip label="Done" 
          active={selectedStatus === 'done'} 
          onPress={() => setSelectedStatus('done')} 
        />
      </View>
    
      <View style={styles.filterRow}>
        <FilterChip label="Due date" active={sortMode === 'dueDate'} onPress={() => setSortMode('dueDate')} />
        <FilterChip label="Created time" active={sortMode === 'createdAt'} onPress={() => setSortMode('createdAt')} />
        <FilterChip label="Started" active={sortMode === 'starred'} onPress={() => setSortMode('starred')} />
      </View>
    </View>
    
  )
}


const styles = StyleSheet.create({

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
});