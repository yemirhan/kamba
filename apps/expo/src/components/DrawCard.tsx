import React, { useMemo } from 'react'
import { ImageBackground, Pressable, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { IconCalendar, IconChevronRight, IconClock, IconMapPin, IconUsers } from 'tabler-icons-react-native';
import { MotiPressable } from 'moti/interactions';

export const DrawCard = () => {
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

            transition={{ type: "timing", duration: 100, }}

        >
            <ImageBackground
                className='w-full h-44 rounded-xl overflow-hidden mt-2'
                source={{ uri: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/photo_1517336714731_489689fd1ca8_9.jpeg" }}>
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
                            42
                        </Text>
                    </View>
                    <View className='flex flex-col absolute bottom-0 left-0 right-0 space-y-2 p-3'>
                        <Text className='font-semibold text-white text-lg'>
                            MacBook Çekilişi
                        </Text>
                        <View className='flex flex-row items-center space-x-2'>
                            <IconCalendar size={16} color="white" />
                            <Text className='text-white'>
                                16 Kasım 2022
                            </Text>
                        </View>
                        <View className='flex flex-row items-center space-x-2'>
                            <IconClock size={16} color="white" />
                            <Text className='text-white'>
                                10:00
                            </Text>
                        </View>

                    </View>
                    <View className='flex flex-col justify-end items-end space-y-2 absolute bottom-2 right-2'>

                        <View className='flex flex-row space-x-2 items-center'>
                            <Text className='font-semibold text-white'>
                                Daha fazla bilgi
                            </Text>
                            <IconChevronRight size={16} color="white" />
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </MotiPressable>
    )
}
