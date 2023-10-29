import React, { useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LearnAreas from '../screens/LearnAreas';
import LearnScreen from '../screens/LearnScreen';
import Chapters from '../screens/Chapters';
import Subchapters from '../screens/Subchapters';

const LearnStack = createNativeStackNavigator();

const LearnStackNavigator = ({ setHeaderTitle }) => {
    const onLearnMainFocus = useCallback(() => setHeaderTitle('Lernen'), [setHeaderTitle]);
    const onLearnAreasFocus = useCallback(() => setHeaderTitle('LernFelder'));

    return (
        <LearnStack.Navigator initialRouteName='LearnMain'>
            <LearnStack.Screen
                name='LearnMain'
                component={LearnScreen}
                listeners={{
                    focus: onLearnMainFocus,
                }}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name='LearnAreas'
                component={LearnAreas}
                listeners={{
                    focus: onLearnAreasFocus,
                }}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name='Chapters'
                component={Chapters}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name='Subchapters'
                component={Subchapters}
                options={{ headerShown: false }}
            />
        </LearnStack.Navigator>
    )
}

export default LearnStackNavigator;