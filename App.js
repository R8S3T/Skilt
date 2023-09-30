import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, NavigationContainerRefContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './src/screens/StartScreen';
import BottomTabs from './src/components/BottomTabs';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Start'>
          <Stack.Screen name='Start' component={StartScreen} />
          <Stack.Screen name='MainApp' component={BottomTabs} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
