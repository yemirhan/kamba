import { Text } from "moti"
import { MotiPressable, MotiPressableProps } from "moti/interactions"
import { useMemo } from "react"
import { colors } from "../utils/colors"

type ButtonProps = { color?: keyof typeof colors, disabled?: boolean, icon?: React.ReactNode, text: string | number, style?: Record<string, any> } & Omit<MotiPressableProps, "style">

export const Button = ({ color = "primary", disabled = false, icon = null, text, style = {}, ...rest }: ButtonProps) => {
    return <MotiPressable
        // onPress={onPress}
        style={{
            borderRadius: 12, display: "flex", flexDirection: "row",
            alignItems: "center", marginTop: 16, rowGap: 8,
            justifyContent: "center",
            paddingHorizontal: 16, paddingVertical: 12, width: "100%", ...style
        }}
        disabled={disabled}

        onPress={rest.onPress}
        animate={useMemo(
            () => ({ hovered, pressed }) => {
                'worklet'

                return {
                    scale: pressed ? 0.95 : 1,
                    opacity: pressed ? 0.8 : 1,
                    backgroundColor: disabled ? colors["background"] : colors[color]
                }
            },
            [color, disabled]
        )}
        transition={{ type: "timing", duration: 200 }}
        {...rest}
    >
        {icon}
        <Text className="text-white">
            {text}
        </Text>
    </MotiPressable>
}