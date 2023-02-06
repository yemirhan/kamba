import { Text } from "moti"
import { MotiPressable } from "moti/interactions"
import { useMemo } from "react"
import { colors } from "../utils/colors"


export const Button = ({ onPress, color = "primary", disabled = false, style = {}, icon = null, text }: { onPress: () => void, color?: keyof typeof colors, disabled?: boolean, style?: Record<string, any>, icon?: React.ReactNode, text: string | number }) => {
    return <MotiPressable
        // onPress={onPress}
        style={{ borderRadius: 12, display: "flex", flexDirection: "row", alignItems: "center", rowGap: 8, justifyContent: "center", paddingHorizontal: 16, paddingVertical: 12, ...style }}
        disabled={disabled}

        onPress={onPress}
        animate={useMemo(
            () => ({ hovered, pressed }) => {
                'worklet'

                return {
                    scale: pressed ? 0.95 : 1,
                    opacity: pressed ? 0.8 : 1,
                    backgroundColor: disabled ? colors["background-secondary"] : colors[color]
                }
            },
            [color, disabled]
        )}
        transition={{ type: "timing", duration: 200 }}
    >
        {icon}
        <Text className="text-white">
            {text}
        </Text>
    </MotiPressable>
}