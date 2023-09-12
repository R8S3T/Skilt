import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LearnScreen from "../screens/LearnScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

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
            component={LearnScreen}
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