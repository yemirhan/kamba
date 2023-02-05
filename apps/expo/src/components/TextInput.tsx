import { motify, useAnimationState } from 'moti';
import React, { useEffect, useState } from 'react'

import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native'
import { colors } from '../utils/colors';


const MotiTextInput = motify(RNTextInput)();

type TextInputProps = RNTextInputProps
export const TextInput: React.FunctionComponent<TextInputProps> = ({ value, ...rest }) => {
    const [blurred, setBlurred] = useState(false)
    const [focused, setFocused] = useState(false)
    const animationState = useAnimationState({
        initial: {
            borderColor: colors["background-secondary"],
            borderWidth: 2
        },
        focused: {
            borderColor: colors.primary,
            borderWidth: 2,
        },
        success: {
            borderColor: colors.success,
            borderWidth: 2,
        },
        fail: {
            borderColor: colors.danger,
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

            transition={{ type: 'timing', duration: 300 }}
            state={animationState} className="rounded-xl bg-background-secondary w-full p-4 text-white placeholder:text-white" />
    )
}
