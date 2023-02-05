import { IconLogin, IconUserPlus } from "tabler-icons-react-native";
import React, { useMemo } from "react";

import { View, SafeAreaView, Text, Pressable, Image, KeyboardAvoidingView } from "react-native";

import SignInWithOAuth from "../../components/SignInWithOAuth";
import { LoginNavigationProps } from "./Auth";
import { useSession, useSignIn } from "@clerk/clerk-expo";
import { MotiPressable } from "moti/interactions";
import { colors } from "../../utils/colors";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";


export const Login = ({ navigation }: LoginNavigationProps) => {
    const { signIn, setSession, isLoaded } = useSignIn()

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleSignIn = async () => {
        if (!isLoaded) {
            return;
        }
        try {
            const completeSignIn = await signIn?.create({
                identifier: emailAddress,
                password
            })
            await setSession(completeSignIn.createdSessionId);

        } catch (error) {
            console.log("error", JSON.stringify(error));
        }

    }
    return (
        <SafeAreaView className="bg-background">
            <KeyboardAvoidingView className="h-full w-full p-12 flex flex-col justify-between">
                <View></View>
                <View>
                    <View className="flex flex-col space-y-3">
                        <Text className="text-white font-semibold text-2xl">
                            Giriş Yap
                        </Text>
                        <TextInput
                            onChangeText={(e) => setEmailAddress(e)}
                            autoCapitalize={"none"}
                            value={emailAddress}
                            className="rounded-xl bg-background-secondary w-full p-4 text-white placeholder:text-white" keyboardType="email-address" placeholderTextColor={"#808080"} placeholder="E-Posta Adresi" />
                        <TextInput
                            onChangeText={(e) => setPassword(e)}
                            autoCapitalize={"none"}
                            value={password}

                            className="rounded-xl bg-background-secondary w-full p-4 text-white placeholder:text-text-dark" placeholderTextColor={"#808080"} keyboardType="visible-password" secureTextEntry placeholder="Parola" />
                        <View className="flex flex-row items-center justify-between w-full">
                            <Pressable>
                                <Text className="underline text-white">
                                    Şifrenizi mi unuttunuz?
                                </Text>
                            </Pressable>
                            <Button
                                onPress={handleSignIn}
                                text={"Giriş Yap"}
                                disabled={(!emailAddress.includes(".com")) || (password.length < 8)}
                                icon={<IconLogin size={16} color="white" />}
                                color="primary"
                            />
                        </View>
                    </View>
                    <View className="mt-6 flex flex-col space-y-3">
                        <Text className="text-white text-center mb-3">
                            Hesabınız yok mu?
                        </Text>
                        <Button
                            style={{ width: "100%", marginTop: 12 }}
                            onPress={() => navigation.navigate("Register")}
                            text={"Hesap Oluştur"}
                            icon={<IconUserPlus size={16} color="white" />}
                            color="secondary"

                        />

                    </View>
                </View>
                <View className="flex flex-row items-center justify-center w-full">

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
