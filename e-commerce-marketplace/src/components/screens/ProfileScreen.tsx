import { useContext } from "react";
import { View, StyleSheet, Image, FlatList, ScrollView, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";

import { UserContext } from "../../contexts/user/UserContext";
import UserNotLoggedIn from "../lib/UserNotLoggedIn";
import LogoutButton from "../lib/LogoutButton";
import CustomText from "../lib/CustomText";
import { ICustomTheme } from "../../utils/constants/themes";
import { ChevronRightIcon } from "../svg/svgIcons";

const ProfileScreen: React.FC = () => {
    const {user} = useContext(UserContext);
    const { colors } = useTheme() as ICustomTheme;

    if (!user) {
        return <UserNotLoggedIn secondaryText={"Log in to start shopping with us"}/>
    }

    const userProfileActions = [
        {
            id: 1,
            component: <LogoutButton label="Log out"/>
        },
    ]

    return (
        <View style={styles.container}>
            <View style={[styles.userInfoContainer, { borderBottomColor: colors.border }]}>
                <Image source={{uri: user?.image}} style={styles.avatar}/>
                <View style={styles.userTextInfoContainer}>
                    <CustomText style={styles.usernameText}>
                        {`${user?.firstName || ""} ${user?.lastName || ""}`.trim()}
                    </CustomText>
                    <CustomText fontWeight={300} style={styles.userGenderText}>
                        {user?.gender}
                    </CustomText>
                </View>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
            >
                {userProfileActions.map((a, i) => (
                    <Pressable key={i} style={[
                        styles.profileActionItemContainer,
                        {
                            borderColor: colors.border,
                            ...(i === 0 ? { borderTopWidth: 1 } : {})
                        }
                    ]}>
                        {a.component}
                        <ChevronRightIcon />
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: "#FFF"
    },
    userInfoContainer: {
        flexDirection: "row",
        gap: 10,
        paddingBottom: 16,
        borderBottomWidth: 1
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: "cover",
    },
    userTextInfoContainer: {
        paddingVertical: 8,
        gap: 10
    },
    usernameText: {
        lineHeight: 19.2
    },
    userGenderText: {
        lineHeight: 19.2,
        color: "#ADADAD",
        textTransform: "capitalize"
    },
    profileActionItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        borderBottomWidth: 1
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "flex-end"
    }
})