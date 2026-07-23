import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '@src/features/categories';
import HomeScreen from '@src/features/home';
import TaskDetailScreen from '@src/features/task-detail';


export default createStaticNavigation(createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    TaskDetail: TaskDetailScreen,
    Categories:CategoriesScreen
  },
  screenOptions:{
    headerShown:false,
  }
}));
