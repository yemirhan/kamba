import { SignedOut, useUser } from '@clerk/clerk-expo'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { TRPCProvider } from '../utils/trpc'
import Auth from './Auth/Auth'
import { Manager } from './Manager'


export const Navigator = () => {
    const { isSignedIn } = useUser()
    return (
        <NavigationContainer>
            {
                isSignedIn ?
                    <Manager />
                    :
                    <Auth />
            }

        </NavigationContainer>
    )
}
