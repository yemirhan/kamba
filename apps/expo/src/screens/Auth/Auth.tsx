import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import { IconChevronLeft } from 'tabler-icons-react-native';
import { Login } from './Login';

export type Genders = "MALE" | "FEMALE" | "OTHER"
type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    RegisterStepTwo: {
        name: string,
        birthdate: string,
        departmentId: string,
        grade: number,
        gender: Genders,
        universityId: string
    };
    RegisterStepThree: undefined;
};
export type RegisterNavigationProps = StackScreenProps<RootStackParamList, 'Register'>;
export type RegisterStepTwoNavigationProps = StackScreenProps<RootStackParamList, 'RegisterStepTwo'>;
export type RegisterStepThreeNavigationProps = StackScreenProps<RootStackParamList, 'RegisterStepThree'>;
export type LoginNavigationProps = StackScreenProps<RootStackParamList, 'Login'>;

const Stack = createStackNavigator<RootStackParamList>();
const Auth = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Login" options={{
                    headerShown: false
                }} component={Login} />


            </Stack.Navigator>

        </>
    )
}

export default Auth