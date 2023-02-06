import { Tabs } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const WorkspaceTabs = ({ route }: { route: any }) => {
    console.log(route.params.workspaceId);

    return (
        <Tabs
            initialRouteName='tables'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                    }

                    // You can return any component that you like here!
                    return null;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerTitle: "Tables",
            })}
        >
            {/* <Tabs.Screen
                name="workspace/tables"

            /> */}
        </Tabs>
    )
}
export default WorkspaceTabs