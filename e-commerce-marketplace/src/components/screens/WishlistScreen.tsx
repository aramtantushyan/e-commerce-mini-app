import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, useWindowDimensions, StyleSheet } from "react-native";

import { UserContext } from "../../contexts/user/UserContext";
import UserNotLoggedIn from "../lib/UserNotLoggedIn";
import { useNavigation } from "expo-router";
import Loader from "../lib/Loader";
import { getWishlistProducts } from "../../utils/helpers/wishlist.helper";
import { IProduct } from "../../utils/types/product";
import ListItemSeparator from "../lib/lists/ListItemSeparator";
import ProductItem from "../lib/products/ProductItem";
import EmptyListPlaceholder from "../lib/lists/EmptyListPlaceholder";
import { WishlistContext } from "../../contexts/wishlist/WishlistContext";

const WishlistScreen = () => {
    const {user} = useContext(UserContext);
    const { width } = useWindowDimensions();
    const { wishlistData } = useContext(WishlistContext);

    const columnWidth = (width - 32 - 16) / 2;

    const renderItem = ({ item }: { item: IProduct }) => (
        <ProductItem product={item} width={columnWidth}/>
    );

    const getEmptyListPLaceholder = () => {
        return <EmptyListPlaceholder text="You don't have any items in your wishlist yet" />
    }

    if (!user) {
        return <UserNotLoggedIn secondaryText={"Log in to add your liked items to your wishlist"}/>
    }

    return (
        <FlatList
            contentContainerStyle={[
                styles.container,
                { width }
            ]}
            numColumns={2}
            columnWrapperStyle={{
                gap: 16
            }}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            data={wishlistData}
            keyExtractor={(item) => `${item.category}-${item.id}`}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={renderItem}
            ListEmptyComponent={getEmptyListPLaceholder}
        />
    );
};
export default WishlistScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        rowGap: 16
    },
})
