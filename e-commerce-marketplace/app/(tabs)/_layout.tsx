import { Tabs } from "expo-router";

import { CategoriesIcon, HomeIcon, ProfileIcon, WishlistIcon } from "../../src/components/svg/svgIcons";
import { LightTheme } from "../../src/utils/constants/themes";
import { useContext } from "react";
import { UserContext } from "../../src/contexts/user/UserContext";

const TabsLayout = () => {
    const {user} = useContext(UserContext);
    return (
        <Tabs screenOptions={{ 
            tabBarActiveTintColor: LightTheme.colors.brandColor,
            headerShadowVisible: false
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <HomeIcon fillColor={color}/>,
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