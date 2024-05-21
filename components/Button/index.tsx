import {ActivityIndicator, Pressable, StyleProp, Text, ViewProps,} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {colors, buttonColors} from "@utils/constants"
import {JSX, useMemo, useState} from "react"

import {useStyles} from "./styles"

interface IProps {
    text: string | JSX.Element
    disabled?: boolean
    type?: "primary" | "secondary"
    onPress?: () => void
    loading?: boolean
    style?: StyleProp<ViewProps>
    fontSize?: number
    outerStyle?: StyleProp<ViewProps>
}

export const Button = ({
       text = "",
       disabled = false,
       type = "primary",
       onPress = () => {},
       loading = false,
       style,
       fontSize,
       outerStyle,
   }: IProps) => {
    const styles = useStyles()

    const [isPressed, setIsPressed] = useState(false)

    const color = useMemo(
        () =>
            type === "primary"
                ? isPressed
                    ? buttonColors.primary.pressed
                    : buttonColors.primary.notPressed
                : buttonColors.secondary,
        [isPressed, type]
    )

    const handlePressed = () => {
        !disabled && setIsPressed((prev) => !prev)
    }

    return (
        <Pressable
            onPressIn={handlePressed}
            onPressOut={handlePressed}
            onPress={onPress}
            disabled={disabled || loading}
            style={outerStyle}
        >
            <LinearGradient
                start={{x: 1, y: 1}}
                end={{x: 0, y: 0}}
                colors={color}
                style={[styles.container, disabled && styles.disabledContainer, style]}
            >
                {typeof text === "string" ? (
                    <Text
                        style={[
                            styles.text,
                            isPressed && type === "secondary" && styles.pressedText,
                            fontSize ? {fontSize: fontSize} : null,
                        ]}
                    >
                        {text}
                    </Text>
                ) : (
                    text
                )}
                {loading && (
                    <ActivityIndicator size={"small"} color={colors.common.white}/>
                )}
            </LinearGradient>
        </Pressable>
    )
}
