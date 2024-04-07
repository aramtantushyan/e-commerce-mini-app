import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from 'react-native';

import { readDataFromAsyncStorage } from "../src/utils/helpers/async-storage.helper";
import UserContextProvider from "../src/contexts/user/UserContextProvider";
import UIContextProvider from "../src/contexts/ui/UIContextProvider";

const _layout = () => {
    const [accessToken, setAccessToken] = useState<null | string>();
    const [fontsLoaded, fontError] = useFonts({
        GothamLight: require("../assets/fonts/GothamLight.otf"),
        GothamBold: require("../assets/fonts/GothamBold.otf"),
        GothamMedium: require("../assets/fonts/GothamMedium.otf"),
        GothamThin: require("../assets/fonts/GothamThin.otf"),
    });
    
    useEffect(() => {
        getAccessToken();
    }, []);

    const getAccessToken = async () => {
        const token = await readDataFromAsyncStorage("accessToken");
        setAccessToken(token);
    }

    const onLayoutRootView = useCallback(async () => {
        if ((fontsLoaded || fontError) && accessToken !== undefined) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError, accessToken]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <UserContextProvider token={accessToken}>
                <UIContextProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen 
                            name="login"
                            options={{ 
                                headerShown: false,
                                presentation: "modal"
                            }}
                        />
                    </Stack>
                </UIContextProvider>
            </UserContextProvider>
        </View>
    )
}
export default _layout;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})