import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

import { loadFonts } from './src/utilities/font';
import useDatabaseInitialization from './src/utilities/useDatabaseInit';

import StartScreen from './src/screens/StartScreen';
import IntroSlider from './src/components/IntroSlider';
import LearnScreen from './src/screens/LearnScreen/LearnScreen';
import BottomTabs from './src/components/BottomTabs';


const dbAsset = require('./assets/skilt.db');
const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const isDatabaseInitialized = useDatabaseInitialization(dbAsset);

  useEffect(() => {
    async function prepare() {
      await loadFonts();
      // You can perform other loading tasks here if necessary
      setAppIsReady(true);
    }

    prepare();
  }, []);

  if (!appIsReady || !isDatabaseInitialized) {
    return null; // Return null or a placeholder while loading
  }

  SplashScreen.hideAsync(); // Hide the splash screen when ready


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Start'>
          <Stack.Screen name='Start' component={StartScreen} />
          <Stack.Screen name='IntroSlider' component={IntroSlider} options={{headerShown: false}} />
          <Stack.Screen name='LearnScreen' component={LearnScreen} options={{ headerShown: false }} />
          <Stack.Screen name='MainApp' component={BottomTabs} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
