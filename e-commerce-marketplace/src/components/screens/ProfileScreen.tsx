import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native"

import { UserContext } from "../../contexts/user/UserContext";
import UserNotLoggedIn from "../lib/UserNotLoggedIn";
import LogoutButton from "../lib/LogoutButton";

const ProfileScreen: React.FC = () => {
    const {user} = useContext(UserContext);

    if (!user) {
        return <UserNotLoggedIn secondaryText={"Log in to start shopping with us"}/>
    }

    return (
        <View>
            <Text>ProfileScreen</Text>
            <LogoutButton label="Log out"/>
        </View>
    )
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    }
})