import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCAuthContext } from "./utils/trpc";

import { HomeScreen } from "./screens/home";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "./cache";
import SignInScreen from "./SignInScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const clerk_frontend_api = "clerk.nice.macaque-25.lcl.dev";

export const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider
        frontendApi={clerk_frontend_api}
        tokenCache={tokenCache} //THIS IS REQUIRED!!!!
      >
        <SignedIn>
          <TRPCAuthContext>
            <SafeAreaProvider>
              <HomeScreen />
              <StatusBar />
            </SafeAreaProvider>
          </TRPCAuthContext>
        </SignedIn>
        <SignedOut>
          <SignInScreen />
        </SignedOut>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
};
