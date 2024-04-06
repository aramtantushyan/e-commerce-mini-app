import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomText from "./CustomText";
import { ICustomTheme } from "../../utils/constants/themes";

interface IUserNotLoggedInProps {
    secondaryText: string
}

const UserNotLoggedIn: React.FC<IUserNotLoggedInProps> = ({ secondaryText = "Log in to start shopping with us" }) => {
    const { colors } = useTheme() as ICustomTheme;

    const navigateToLoginScreen = () => {
        router.push('login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.welcomeContainer}>
                <CustomText fontWeight={500} style={{ fontSize: 32 }}>
                    Welcome
                </CustomText>
                <CustomText>
                    {secondaryText}
                </CustomText>
            </View>
            <View style={{alignItems: "flex-start"}}>
                <Pressable style={[styles.loginButton, { backgroundColor: colors.brandColor }]} onPress={navigateToLoginScreen}>
                    <CustomText fontWeight={500} style={styles.loginButtonText}>
                        Log in
                    </CustomText>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};
export default UserNotLoggedIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 32
    },
    loginButton: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 10,
    },
    welcomeContainer: {
        gap: 8,
        paddingTop: 24
    },
    loginButtonText: {
        color: "#FFF",
        fontSize: 20
    }
});
