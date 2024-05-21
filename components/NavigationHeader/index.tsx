import { Text, View } from "react-native"
import React, { JSX } from "react"

import { useStyles } from "./styles"

interface IProps {
    leftSide?: any
    title?: string | JSX.Element
    rightSide?: any
}

export const Header = ({ leftSide, title = "", rightSide }: IProps) => {
    const styles = useStyles()

    return (
        <View style={styles.container}>
            <View style={styles.leftSide}>{leftSide}</View>
            {typeof title === "string" ? (
                <Text style={styles.title}>{title}</Text>
            ) : (
                title
            )}
            <View style={styles.rightSide}>{rightSide}</View>
        </View>
    )
}
