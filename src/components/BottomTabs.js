import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import LearnStackNavigator from "./LearnStackNavigator";
import { Keyboard } from "react-native";

const Tab = createBottomTabNavigator();

function BottomTabs() {
    const [headerTitle, setHeaderTitle] = useState('Lernen');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#2b4353'},
                headerTintColor: '#f6f5f5',
                tabBarActiveTintColor: '#e8630a',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: isKeyboardVisible ? { display: 'none' } : {},
                headerTitle: headerTitle,
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
            children={() => <LearnStackNavigator setHeaderTitle={setHeaderTitle} />}
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