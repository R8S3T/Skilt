import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import LearnStackNavigator from "./LearnStackNavigator";
import useFetchUserName from "../screens/LearnScreen/fetchUserName";

const Tab = createBottomTabNavigator();

function BottomTabs() {
    const userName = useFetchUserName();
    const [headerTitle, setHeaderTitle] = useState('');

    useEffect(() => {
        if (userName) {
            setHeaderTitle(`Hello, ${userName}`);
        }
    }, [userName]);

    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#f6f5f5'},
                headerTintColor: '#2b4353',
                tabBarActiveTintColor: '#e8630a',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name="Lernen"
                component={LearnStackNavigator}
                options={{
                    tabBarLabel: 'Lernen',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                    headerTitle: headerTitle,
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