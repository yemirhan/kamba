import React from "react";

import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";

import { api } from "@acme/api/src/client";
import { useAuth } from "@clerk/clerk-expo";
import { ProtectedPageLink } from "@acme/app";



const CreatePost: React.FC = () => {
  const utils = api.useContext();


  const [title, onChangeTitle] = React.useState("");
  const [content, onChangeContent] = React.useState("");

  return (
    <View className="flex flex-col border-t-2 border-gray-500 p-4">
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={onChangeTitle}
        placeholder="Title"
      />
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={onChangeContent}
        placeholder="Content"
      />
      <TouchableOpacity
        className="rounded bg-[#cc66ff] p-2"

      >
        <Text className="font-semibold text-white">Publish post</Text>
      </TouchableOpacity>
    </View>
  );
};

export const HomeScreen = () => {

  const secretQuery = api.auth.getSecretMessage.useQuery();
  //not used -  const sessionQuery = trpc.auth.getSession.useQuery();
  const [showPost, setShowPost] = React.useState<string | null>(null);
  const { signOut } = useAuth();

  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-5xl font-bold text-white">
          Create <Text className="text-[#cc66ff]">T3</Text> Turbo
        </Text>
        <Button onPress={() => signOut()} title={"LOGOUT"} />
        <ProtectedPageLink />

        <Text className="mx-auto pb-2 text-5xl font-bold text-white">
          {JSON.stringify(secretQuery.data)}
        </Text>

        <View className="py-2">
          {showPost ? (
            <Text className="text-white">
              <Text className="font-semibold">Selected post:</Text>
              {showPost}
            </Text>
          ) : (
            <Text className="font-semibold italic text-white">
              Press on a post
            </Text>
          )}
        </View>

        <CreatePost />
      </View>
    </SafeAreaView>
  );
};
