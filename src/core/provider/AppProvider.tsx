/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AppLoading from '../components/AppLoading';
import { GStyles } from '../constance/styles';
import { useTaskStore } from '../store/taskStore';
import { supabase } from '../utils/supabase';

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({children,}: Readonly<AppProviderProps>) {

  const init = useTaskStore((store) => store.init);
  const isInitializing = useTaskStore((store) => store.isInitializeing);
  const onInternet = useTaskStore((store) => store.onInternet);
  const setNetStatus = useTaskStore((store) => store.setNetStatus);


  useEffect(() => {
    init();

    // Listen for internet connectivity changes
    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      setNetStatus();
      if (state.isConnected && state.isInternetReachable) {
        onInternet();
      }
    });

    // Listen for Supabase Realtime changes
    // const channel = supabase
    //   .channel('task-manager').on('postgres_changes',{event: '*',schema: 'public',table: 'tasks'},() => {
    //     onInternet()
    //   })
    //   .on('postgres_changes', {event: '*',schema: 'public',table: 'categories'},() => {
    //     onInternet()
    //   })
    //   .subscribe();

    return () => {
      unsubscribeNetInfo();
      // supabase.removeChannel(channel);
    };
  }, []);

  return (
    <View style={GStyles.flex}>
      {isInitializing ? <AppLoading /> : children}
    </View>
  );
}