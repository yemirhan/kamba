import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MenuCategoryRouter } from "./MenuCategories";
import { Tables } from "./Tables";
import { IconChevronLeft, IconMenu2 } from "tabler-icons-react-native";
import { Pressable } from "react-native";
const Tabs = createBottomTabNavigator();

export const Menu = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#202020",
          borderTopColor: "transparent",
        },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#E4692A",
      }}
      initialRouteName="Tables"
    >
      <Tabs.Screen
        name="Tables"
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#202020",
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          headerTintColor: "#fff",

          headerLeft: () => {
            return (
              <Pressable onPress={() => navigation.openDrawer()}>
                <IconMenu2 color="white" className="ml-3 text-white" />
              </Pressable>
            );
          },
        })}
        component={Tables}
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#202020",
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          headerTintColor: "#fff",
        }}
        name="Categories"
        component={MenuCategoryRouter}
      />
    </Tabs.Navigator>
  );
};
