import { motify, useAnimationState } from 'moti';
import React, { useEffect, useState } from 'react'

import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native'
import { colors } from '../config/colors';


const MotiTextInput = motify(RNTextInput)();

type TextInputProps = RNTextInputProps
export const TextInput: React.FunctionComponent<TextInputProps> = ({ value, ...rest }) => {
    const [blurred, setBlurred] = useState(false)
    const [focused, setFocused] = useState(false)
    const animationState = useAnimationState({
        initial: {
            borderColor: colors.gray[8],
            borderWidth: 2
        },
        focused: {
            borderColor: colors.teal[6],
            borderWidth: 2,
        },
        success: {
            borderColor: colors.green[6],
            borderWidth: 2,
        },
        fail: {
            borderColor: colors.red[6],
            borderWidth: 2,
        },
    });
    useEffect(() => {
        if (blurred) {
            if (value?.length === 0) {
                animationState.transitionTo('fail')
            }
            else {
                animationState.transitionTo('success')
            }
        }
        if (focused) {
            if (value?.length || 0 > 0) {
                animationState.transitionTo('success')
            }
            else {
                animationState.transitionTo('focused')
            }
        }
    }, [value, blurred])
    useEffect(() => {
        animationState.transitionTo("initial")
    }, [])
    return (
        <MotiTextInput
            value={value}
            onBlur={() => {
                setFocused(false)
                setBlurred(true)
            }}
            onFocus={() => {
                setBlurred(false)
                setFocused(true)
                animationState.transitionTo('focused')
            }}
            {...rest}
            placeholderTextColor={colors.gray[2]}
            transition={{ type: 'timing', duration: 300 }}
            state={animationState} className="rounded-xl bg-background-secondary shadow-md bg-gray-9 w-10/12 p-4 text-white placeholder:text-white" />
    )
}
