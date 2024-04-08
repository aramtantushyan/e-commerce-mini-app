import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, StyleSheet, Image, useWindowDimensions, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { XIcon } from "../../svg/svgIcons";
import CustomText from "../../lib/CustomText";
import LoginForm from "./LoginForm";
import Loader from "../../lib/Loader";
import Toast from "react-native-toast-message";


const LoginScreen: React.FC = ({}) => {
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [isLoadingLogin, setIsLoadingLogin] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            gestureEnabled: !isLoadingLogin
        })
    }, [isLoadingLogin])

    const closeModal = () => {        
        navigation.goBack();
    }

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom || 24 }]}>
            <Pressable style={styles.closeButton} onPress={closeModal}>
                <XIcon/>
            </Pressable>
            <KeyboardAwareScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.mainContent}
            >
                <View style={styles.logoContainer}>
                    <CustomText style={styles.pageTitle} fontWeight={500}>
                        LOG IN
                    </CustomText>
                    <Image
                        style={{
                            resizeMode: "contain",
                            width: width * 0.4,
                            height: width * 0.2
                        }}
                        source={require("../../../../assets/images/brand-logo.png")}
                    />
                    <View>
                    </View>
                </View>
                <LoginForm
                    onLoggedIn={closeModal}
                    setIsLoadingLogin={setIsLoadingLogin}
                />
            </KeyboardAwareScrollView>
            {isLoadingLogin && (
                <Loader overlay={true} />
            )}
            <Toast />
        </View>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        position: "relative"
    },
    closeButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000000
    },
    mainContent: {
        flex: 1,
        gap: 50,
        paddingTop: 88
    },
    pageTitle: {
        fontSize: 24
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 30
    },
})
