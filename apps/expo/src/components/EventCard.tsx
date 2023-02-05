import React, { useMemo } from 'react'
import { ImageBackground, Pressable, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { IconCalendar, IconChevronRight, IconClock, IconMapPin, IconUsers } from 'tabler-icons-react-native';
import { MotiPressable } from 'moti/interactions';
import { RouterOutputs } from '@acme/api';
import { useNavigation } from '@react-navigation/native';
import { HomeListScreenNavigationProps, HomeStackParamsList } from '../screens/HomeScreen';

export const EventCard = ({ _count, id, place, name, startsAt, ...rest }: RouterOutputs["events"]["all"][number]) => {
    const { navigate } = useNavigation<HomeListScreenNavigationProps["navigation"]>()
    return (
        <MotiPressable
            animate={useMemo(
                () => ({ hovered, pressed }) => {
                    'worklet'

                    return {
                        scale: pressed ? 0.95 : 1,
                        opacity: pressed ? 0.8 : 1,
                    }
                },
                []
            )}
            onPress={() => {
                navigate("EventDetails", { id })
            }}
            transition={{ type: "timing", duration: 100, }}

        >
            <ImageBackground
                className='w-full h-44 rounded-xl overflow-hidden mt-2'
                source={{ uri: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" }}>
                <LinearGradient
                    colors={['#00000000', '#000000ff']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: '100%'
                    }}
                >
                    <View className='absolute top-2 right-2 rounded-xl p-2 bg-background-secondary flex flex-row space-x-2'>
                        <IconUsers size={16} color="white" />
                        <Text className='font-semibold text-white'>
                            {_count?.attendees || 0}
                        </Text>
                    </View>
                    <View className='flex flex-col absolute bottom-0 left-0 right-0 space-y-2 p-3'>
                        <Text className='font-semibold text-white text-lg'>
                            {name}
                        </Text>
                        <View className='flex flex-row items-center space-x-2'>
                            <IconCalendar size={16} color="white" />
                            <Text className='text-white'>
                                {startsAt.toISOString()}
                            </Text>
                        </View>
                        <View className='flex flex-row items-center space-x-2'>
                            <IconClock size={16} color="white" />
                            <Text className='text-white'>
                                10:00
                            </Text>
                            <IconMapPin size={16} color="white" />
                            <Text className='text-white'>
                                {place}
                            </Text>
                        </View>

                    </View>
                    <View className='flex flex-col justify-end items-end space-y-2 absolute bottom-2 right-2'>
                        <Text className='font-semibold text-2xl text-white'>
                            10 TL
                        </Text>
                        <View className='flex flex-row space-x-2 items-center'>
                            <Text className='font-semibold text-white'>
                                Detaylar
                            </Text>
                            <IconChevronRight size={16} color="white" />
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </MotiPressable>
    )
}
