import { useContext } from "react";
import { View, Text } from "react-native";
import { UserContext } from "../../contexts/user/UserContext";
import UserNotLoggedIn from "../lib/UserNotLoggedIn";
const WishlistScreen = () => {
    const {user} = useContext(UserContext);

    if (!user) {
        return <UserNotLoggedIn secondaryText={"Log in to add your liked items to your wishlist"}/>
    }
    return (
        <View>
            <Text>WishlistScreen</Text>
        </View>
    );
};
export default WishlistScreen;
