import { View, Text, Alert } from 'react-native'
import React, { useCallback } from 'react'
import { useFonts } from "expo-font";
import { Stack } from 'expo-router'
import GlobalProvider from '../context/GlobalProvider';

 function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Amita-Regular": require('../assets/fonts/Amita-Regular.ttf'),
    "Amita-Bold": require('../assets/fonts/Amita-Bold.ttf'),
    "DancingScript-Bold": require('../assets/fonts/DancingScript-Bold.ttf'),
    "DancingScript-Regular": require('../assets/fonts/DancingScript-Regular.ttf'),
  });


  if (!fontsLoaded) {

    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }}/>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(routes)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
    </Stack>
    </GlobalProvider>
  )
}
export default RootLayout;