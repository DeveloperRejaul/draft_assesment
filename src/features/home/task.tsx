import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { bottomSheet } from '@src/core/components/BottomSheet';
import Button from '@src/core/components/Button';
import Header from '@src/core/components/Header';
import { colors } from '@src/core/constance/colors';
import { GStyles } from '@src/core/constance/styles';
import { typography } from '@src/core/constance/typography';
import { router } from '@src/core/navigation/router';
import { useTaskStore } from '@src/core/store/taskStore';
import FilterBottomSheet from './filter-botom-sheet';


export default function TaskScreen() {
  const {getFilteredtask,toggleTaskStatus,toggleTaskStarred, isRefreshing, isOffline,lastSyncAt} = useTaskStore()
  const tasks = getFilteredtask();


  return (
    <View style={styles.container}>
      {/* header part */}
      <Header title='Task Manager' rightComponent={(
        <Button title='Goto Category' titleStyle={styles.counter} onPress={() => router.navigate('Categories')}/>
      )} />
      <Text>{isRefreshing ? 'Refreshing...' : ''}</Text>
      <Text>{isOffline ? 'Offline' : 'Online'}</Text>
      <Text>Last Refreshed: {lastSyncAt ? lastSyncAt.toLocaleString() : 'Never'}</Text>
      <FlatList
        data={tasks}
        contentContainerStyle={styles.sectionCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={(
          <View style={[GStyles.rowBetween, styles.sectionHeader]}>
            <Text style={[typography.text_lg_semibold, styles.sectionTitle]}>Tasks</Text>
            <Button 
              title='Filter' 
              titleStyle={styles.counter} 
              onPress={() => {
                bottomSheet.show({
                  render: <FilterBottomSheet />
                })
              }}/>
          </View>
        )}
        renderItem={({item: task}) => {
          return (
            <TouchableOpacity 
              key={task.id} 
              onPress={() => router.navigate('TaskDetail', { taskId: task.id })}
              style={styles.taskItem}
            >
              <View style={styles.taskMain}>
                <TouchableOpacity 
                  onPress={() => toggleTaskStatus(task.id)} 
                  style={styles.statusButton}
                >
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

              <TouchableOpacity 
                onPress={() => toggleTaskStarred(task.id)}
                style={styles.starButton}
              >
                <Text style={styles.starIcon}>{task.starred ? 'star' : 'unstar'}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )
        }}
      />
    </View>
   
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 36,
    backgroundColor: colors.brandPink50,
    paddingHorizontal: 20
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
    backgroundColor: colors.blue600,
    padding: 5,
    borderRadius: 4,
  },
  starIcon: {
    fontSize: 11,
    color: colors.yellow500,
    fontWeight: 'bold',
  },
});