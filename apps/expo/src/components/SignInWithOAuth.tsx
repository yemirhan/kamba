import { useSignIn } from "@clerk/clerk-expo";
import React from "react";
import { View } from "react-native";

import * as AuthSession from "expo-auth-session";
import { Button } from "./Button";

const SignInWithOAuth = () => {
  const { signIn, setSession, isLoaded } = useSignIn();

  const onPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      // Create a redirect url for the current platform and environment.
      //
      // This redirect URL needs to be whitelisted for your instance via
      // https://clerk.dev/docs/reference/backend-api/tag/Redirect-URLs#operation/CreateRedirectURL
      //
      // For more information go to:
      // https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturi
      const redirectUrl = AuthSession.makeRedirectUri({
        path: "/login",
      });

      await signIn.create({
        strategy: "oauth_google",
        redirectUrl,
      });

      const {
        firstFactorVerification: { externalVerificationRedirectURL },
      } = signIn;

      const result = await AuthSession.startAsync({
        authUrl: externalVerificationRedirectURL!.toString(),
        returnUrl: redirectUrl,
      });

      // @ts-ignore
      const { type, params } = result || {};

      // Check all the possible AuthSession results
      // https://docs.expo.dev/versions/latest/sdk/auth-session/#returns-7
      if (type !== "success") {
        throw "Something went wrong during the OAuth flow. Try again.";
      }

      // Get the rotatingTokenNonce from the redirect URL parameters
      const { rotating_token_nonce: rotatingTokenNonce } = params;

      await signIn.reload({ rotatingTokenNonce });

      const { createdSessionId } = signIn;

      if (!createdSessionId) {
        throw "Something went wrong during the Sign in OAuth flow. Please ensure that all sign in requirements are met.";
      }

      await setSession(createdSessionId);
      return;
    } catch (err: any) {
      console.error(err);
    }
  }, []);

  return (
    <View className="mt-2">
      <Button text="Sign in with Google" color="secondary" onPress={onPress} />
    </View>
  );
};

export default SignInWithOAuth;
