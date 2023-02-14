import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Navigator } from "./screens/Navigator";
import { View } from "react-native";
// Find this in your Dashboard.
const clerk_frontend_api = "clerk.nice.macaque-25.lcl.dev";

export const App = () => {
  return (

    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ClerkProvider frontendApi={clerk_frontend_api} tokenCache={tokenCache}>
            <TRPCProvider>
              <ClerkLoaded>
                <Navigator />
              </ClerkLoaded>
              <ClerkLoading>
                <SafeAreaView className="bg-background">
                  <View className="flex flex-col w-full h-full"></View>
                </SafeAreaView>
              </ClerkLoading>
            </TRPCProvider>
          </ClerkProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>

  );
};
