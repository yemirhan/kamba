import React from "react";

import { Button, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";

import { api } from "@acme/api/src/client";
import { useAuth } from "@clerk/clerk-expo";
import { ProtectedPageLink } from "@acme/app";
import { useLink } from "expo-router";





export const HomeScreen = () => {

  const { data: workspaces } = api.workspace.getAll.useQuery();
  console.log(workspaces);
  const link = useLink();

  //not used -  const sessionQuery = trpc.auth.getSession.useQuery();
  const [showPost, setShowPost] = React.useState<string | null>(null);
  const { signOut } = useAuth();

  return (
    <SafeAreaView className="bg-background h-full">
      <View className="flex flex-col space-y-2 p-4">
        <Text className="text-3xl text-white" >
          Your Workspaces
        </Text>
        {(workspaces || []).map(workspace => {
          return <Pressable
            key={workspace.id}
            onPress={() => {
              link.push(`/${workspace.id}`);
            }}
          >
            <View className="flex flex-col w-full text-white bg-gray-700 rounded-lg shadow-md border border-slate-300 p-4 ">
              <Text className="text-white font-semibold text-xl">
                {workspace.name}
              </Text>
            </View>
          </Pressable>
        })}
      </View>
    </SafeAreaView>
  );
};
