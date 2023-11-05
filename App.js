import React, { useEffect } from 'react';
import { NavigationContainer, NavigationContainerRefContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './src/screens/StartScreen';
import BottomTabs from './src/components/BottomTabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useDatabaseInitialization from './src/utilities/useDatabaseInit';

const dbAsset = require('./assets/skilt.db');

const Stack = createNativeStackNavigator();

function App() {
  const isDatabaseInitialized = useDatabaseInitialization(dbAsset);

  if (!isDatabaseInitialized) {
    return <GestureHandlerRootView style={{ flex: 1 }}>
    {/* Render a loading indicator or splash screen */}
  </GestureHandlerRootView>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Start'>
          <Stack.Screen name='Start' component={StartScreen} />
          <Stack.Screen name='MainApp' component={BottomTabs} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
