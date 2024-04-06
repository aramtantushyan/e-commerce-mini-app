import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import { ICustomTheme } from "../../utils/constants/themes";

interface ILoaderProps {
    overlay?: boolean,
    opacity?: number,
    indicatorColor?: string,
    overlayBackgroundColor?: string,
    size?: "large" | "small"
}

const Loader: React.FC<ILoaderProps> = ({
    overlay, opacity, indicatorColor,
    overlayBackgroundColor = "rgba(0, 0, 0, 0.3)", size
}) => {
    const { colors } = useTheme() as ICustomTheme;

    return (
        <View style={
            overlay 
            ? [
                styles.overlay, 
                { opacity: opacity || 0.65 },
                { backgroundColor: overlayBackgroundColor || "#000" }
            ] : styles.container
        }>
            <ActivityIndicator 
                size={size || (overlay ? "large" : "small")}
                color={indicatorColor || colors.brandColor}
            />
        </View>
    )
}
export default Loader;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 20,
    },
    overlay: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000000
    },
});