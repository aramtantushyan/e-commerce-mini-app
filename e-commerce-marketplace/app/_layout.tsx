import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from 'react-native';

import { readDataFromAsyncStorage } from "../src/utils/helpers/async-storage.helper";
import UserContextProvider from "../src/contexts/user/UserContextProvider";
import UIContextProvider from "../src/contexts/ui/UIContextProvider";

const _layout = () => {
    const [accessToken, setAccessToken] = useState<null | string>();
    const [fontsLoaded, fontError] = useFonts({
        GpothamRegular: require('../assets/fonts/GothamLight.ttf'),
        GothamBold: require('../assets/fonts/GothamBold.ttf'),
        GothamMedium: require('../assets/fonts/GothamMedium.ttf'),
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
                    <Slot />
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