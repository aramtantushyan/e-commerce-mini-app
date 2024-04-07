import { Tabs } from "expo-router";

import { CategoriesIcon, HomeIcon, ProfileIcon, SearchIcon, WishlistIcon } from "../../src/components/svg/svgIcons";
import { LightTheme } from "../../src/utils/constants/themes";
import { useContext } from "react";
import { UserContext } from "../../src/contexts/user/UserContext";
import { Image } from "react-native";

const TabsLayout = () => {
    const {user} = useContext(UserContext);

    return (
        <Tabs screenOptions={({ navigation, route }) => ({ 
            tabBarActiveTintColor: LightTheme.colors.brandColor,
            headerShadowVisible: false,
            headerTitleStyle: {
                fontFamily: "GothamMedium",
                lineHeight: 19.2,
                textTransform: "uppercase"
            },
            tabBarStyle: {
                borderTopWidth: 0
            },
            headerLeftContainerStyle: {
                paddingLeft: 16
            },
            headerRightContainerStyle: {
                paddingRight: 16
            },
            headerRight: () => <SearchIcon />,
            ...(navigation.getState() && navigation.getState().type === 'tab' ? {
                headerLeft: () => (
                    <Image
                        style={{width: 43, resizeMode: "contain"}}
                        source={require("../../assets/icon.png")}
                    />
                )
            } : {})
        })}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <HomeIcon fillColor={color}/>,
                    headerTitle: ""
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    title: 'Categories',
                    tabBarIcon: ({ color }) => <CategoriesIcon fillColor={color} />,
                }}
            />
            <Tabs.Screen
                name="wishlist"
                options={{
                    title: 'Wishlist',
                    tabBarIcon: ({ color }) => <WishlistIcon fillColor={color}/>,
                    headerShown: !!user
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <ProfileIcon fillColor={color} />,
                    headerShown: !!user
                }}
            />
        </Tabs>
      );
}
export default TabsLayout;