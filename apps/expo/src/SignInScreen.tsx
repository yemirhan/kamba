import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { styles } from "./Styles";
import { Button } from "./components/Button"
import { TextInput } from "./components/Input";
import { IconLogin } from "tabler-icons-react-native"
import { SignInWithOauth } from "./components/SignInOAuth";

export default function SignInScreen() {
  const { signIn, setSession, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    console.log("buttonTest")
    try {
      console.log(emailAddress);

      const completeSignIn = await signIn.create({
        identifier: emailAddress,

        password,
      });
      console.log(completeSignIn)
      await setSession(completeSignIn.createdSessionId);
    } catch (err) {
      //LOG IT
      console.log(JSON.stringify(err));

    }
  };

  return (
    <View className="flex flex-col items-center justify-center w-full h-full bg-gray-9 space-y-4">
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."

        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />

      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <Button style={{ width: "100%" }} text={"Sign In"} icon={<IconLogin size={16} />} onPress={() => { }} disabled={emailAddress.length === 0 || !emailAddress.includes("@") || password.length > 6} ></Button>
      <SignInWithOauth />
    </View>
  );
}
