import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import LearnStackNavigator from "./LearnStackNavigator";
import { Keyboard } from "react-native";
import useFetchUserName from "../screens/LearnScreen/fetchUserName";

const Tab = createBottomTabNavigator();

function BottomTabs() {
    const userName = useFetchUserName();
    const defaultTitle = 'Lernen';
    const headerTitle = userName ? `Hallo, ${userName}` : defaultTitle;

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
                headerStyle: { backgroundColor: '#f6f5f5'},
                headerTintColor: '#2b4353',
                tabBarActiveTintColor: '#e8630a',
                tabBarInactiveTintColor: 'gray',
                headerTitle: headerTitle,
            }}
        >
            <Tab.Screen
                name="Lernen"
                children={() => <LearnStackNavigator setHeaderTitle={(title) => {}} />}
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