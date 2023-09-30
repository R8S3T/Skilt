import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LearnScreen from "../screens/LearnScreen";
import LearnAreas from "../screens/LearnAreas";
import Chapters from "../screens/Chapters";
import Subchapters from "../screens/Subchapters";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();

const LearnStack = createNativeStackNavigator();

const LearnStackNavigator = () => {
    return (
        <LearnStack.Navigator initialRouteName='LearnMain'>
            <LearnStack.Screen
                name='LearnMain'
                component={LearnScreen}
                options={{ headerShown: false }}
            />
            <LearnStack.Screen
                name='LearnAreas'
                component={LearnAreas}
            />
            <LearnStack.Screen
                name='Chapters'
                component={Chapters}
            />
            <LearnStack.Screen
                name='Subchapters'
                component={Subchapters}
            />
        </LearnStack.Navigator>
    )
}
function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2b4353',
                },
                headerTintColor: '#f6f5f5',
                tabBarActiveTintColor: '#e8630a',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: [
                    {
                        display: 'flex'
                    },
                    null
                ]
            }}
        >
        <Tab.Screen
            name="Startseite"
            component={HomeScreen}
            options={{
            tabBarLabel: 'Startseite',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
            )
            }}
        />
        <Tab.Screen
            name="Lernen"
            component={LearnStackNavigator}
            options={{
            tabBarLabel: 'Lernen',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="book" size={size} color={color} />
            )
            }}
        />
        <Tab.Screen
            name="Einstellungen"
            component={SettingsScreen}
            options={{
            tabBarLabel: 'Einstellungen',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" size={size} color={color} />
            )
            }}
        />
        </Tab.Navigator>
    );
}

export default BottomTabs;