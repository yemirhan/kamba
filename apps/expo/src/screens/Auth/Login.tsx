import { IconLogin, IconUserPlus } from "tabler-icons-react-native";
import React, { useMemo } from "react";

import {
  View,
  SafeAreaView,
  Text,
  Pressable,
  Image,
  KeyboardAvoidingView,
} from "react-native";

import SignInWithOAuth from "../../components/SignInWithOAuth";
import { LoginNavigationProps } from "./Auth";
import { useSession, useSignIn } from "@clerk/clerk-expo";
import { MotiPressable } from "moti/interactions";
import { colors } from "../../utils/colors";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Login = ({ navigation }: LoginNavigationProps) => {
  const { signIn, setSession, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSignIn = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignIn = await signIn?.create({
        identifier: emailAddress,
        password,
      });
      await setSession(completeSignIn.createdSessionId);
    } catch (error) {
      console.log("error", JSON.stringify(error));
    }
  };
  return (
    <SafeAreaView className="bg-background">
      <KeyboardAvoidingView className="flex h-full w-full flex-col justify-between p-12">
        <View></View>
        <View>
          <View className="flex flex-col space-y-3">
            <Text className="text-2xl font-semibold text-white">Giriş Yap</Text>
            <TextInput
              onChangeText={(e) => setEmailAddress(e)}
              autoCapitalize={"none"}
              value={emailAddress}
              className="bg-background-secondary w-full rounded-xl p-4 text-white placeholder:text-white"
              keyboardType="email-address"
              placeholderTextColor={"#808080"}
              placeholder="E-Posta Adresi"
            />
            <TextInput
              onChangeText={(e) => setPassword(e)}
              autoCapitalize={"none"}
              value={password}
              className="bg-background-secondary placeholder:text-text-dark w-full rounded-xl p-4 text-white"
              placeholderTextColor={"#808080"}
              keyboardType="ascii-capable"
              secureTextEntry
              placeholder="Parola"
            />
            <View className="flex w-full flex-row items-center justify-between">
              <Pressable>
                <Text className="text-white underline">
                  Şifrenizi mi unuttunuz?
                </Text>
              </Pressable>
              <Button
                onPress={handleSignIn}
                text={"Giriş Yap"}
                disabled={!emailAddress.includes(".com") || password.length < 8}
                icon={<IconLogin size={16} color="white" />}
                color="primary"
              />
            </View>
          </View>
          <View className="mt-6 flex flex-col space-y-3">
            <Text className="mb-3 text-center text-white">
              Hesabınız yok mu?
            </Text>
            <Button
              style={{ width: "100%", marginTop: 12 }}
              onPress={() => navigation.navigate("Register")}
              text={"Hesap Oluştur"}
              icon={<IconUserPlus size={16} color="white" />}
              color="secondary"
            />
            <SignInWithOAuth />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
