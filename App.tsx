/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { colors } from '@src/core/constance/colors';
import Navigation from '@src/core/navigation/Navigation';
import { navigationRef } from '@src/core/navigation/router';
import { TaskProvider } from '@src/core/provider/TaskProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />
      <TaskProvider>
        <Navigation  ref={navigationRef}/>
      </TaskProvider>
    </SafeAreaProvider>
  );
}

export default App;
