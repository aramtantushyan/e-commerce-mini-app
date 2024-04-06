import { PropsWithChildren, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { UIContext } from "./UIContext";
import { LightTheme } from "../../utils/constants/themes";

const UIContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isLoadingState, setIsLoadingState] = useState(false);

    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar style={"dark"} />
            <ThemeProvider value={LightTheme}>
                <UIContext.Provider value={{
                    isLoadingState,
                    setIsLoadingState,
                }}>
                    {children}
                </UIContext.Provider>
            </ThemeProvider>
            {/* {(isLoadingState) && (
                <LoaderScreen color={LightTheme.colors.border} overlay/>
            )} */}
        </SafeAreaProvider>
    );
};


export default UIContextProvider;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})