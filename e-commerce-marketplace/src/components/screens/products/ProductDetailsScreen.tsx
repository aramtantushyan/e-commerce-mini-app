import { useContext, useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, RefreshControl, Pressable } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useTheme } from "@react-navigation/native";

import FavoriteButton from "../../lib/FavoriteButton";
import { useAxios } from "../../../hooks/useAxios";
import { getProductById } from "../../../utils/api/api";
import Loader from "../../lib/Loader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomText from "../../lib/CustomText";
import { ICustomTheme } from "../../../utils/constants/themes";
import { IProduct } from "../../../utils/types/product";
import HorizontalBannerSlider from "../../lib/HorizontalBannerSlider";
import { RatingStarIcon } from "../../svg/svgIcons";
import { WishlistContext } from "../../../contexts/wishlist/WishlistContext";
import { UserContext } from "../../../contexts/user/UserContext";

const ProductDetailsScreen: React.FC = () => {
    const navigate = useNavigation();
    const { id } = useLocalSearchParams<{ id : string }>();
    const insets = useSafeAreaInsets();
    const { colors } = useTheme() as ICustomTheme;
    const { wishlistData } = useContext(WishlistContext);
    const { user } = useContext(UserContext);

    const [isRefreshing, setIsRefreshig] = useState(false);

    const { data: product, fetch, loading } = useAxios<IProduct>(id ? getProductById(+id) : "");

    const isFav = useMemo(() => {
        if (!product) {
            return false;
        }
        return wishlistData?.some(wishlistItem => {
            return wishlistItem.category === product.category && wishlistItem.id === product.id
        })
    }, [wishlistData?.length, product]);

    useEffect(() => {
        navigate.setOptions({
            headerBackTitleVisible: false,
            headerTitle: "",
            headerShadowVisible: false,
            headerRight: () => product && user ? (
                <FavoriteButton size={20} product={product} isFavorite={!!isFav} />
            ) : null
        })
    }, [product, isFav, user]);

    const fetchProduct = () => {
        setIsRefreshig(true);
        fetch(id ? getProductById(+id) : "")
            .finally(() => setIsRefreshig(false));
    }

    const getProductTotalPrice = () => {
        if (product?.discountPercentage) {
            return (product.price - product.price * product.discountPercentage / 100).toFixed(2);
        } else 
        return product?.price.toFixed(2);
    }

    if (loading && !product) {
        return <Loader fullScreenLoader={true}/>
    }

    return (
        <View style={[
            styles.container,
            { paddingBottom: insets.bottom || 24 }
        ]}>
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContainer,
                    { paddingBottom: insets.bottom || 24 }
                ]}
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={fetchProduct}
                        colors={[colors.brandColor]}
                        tintColor={colors.brandColor}
                    />
                }
            >
                <HorizontalBannerSlider
                    bannersData={product?.images.map((img, idx) => ({id: idx, source: img})) || []}
                    bannerHeight={343}
                    bannerAspectRatio={1}
                />
                <View style={{paddingHorizontal: 16}}>
                    <CustomText style={styles.productTitle} fontWeight={500}>
                        {product?.title}
                    </CustomText>
                </View>
                <View style={styles.productDetailsContainer}>
                    {product?.discountPercentage ? (
                        <View style={styles.productDetailRow}>
                            <CustomText fontWeight={300} style={styles.oldPriceText}>
                                ${product?.price}
                            </CustomText>
                            <CustomText fontWeight={500}>
                                ${getProductTotalPrice()}
                            </CustomText>
                        </View>
                    ) : (
                        <CustomText fontWeight={500}>
                            ${getProductTotalPrice()}
                        </CustomText>
                    )}
                    <View style={styles.productDetailRow}>
                        <CustomText style={styles.productDetailText}>
                            Rating:
                        </CustomText>
                        <View style={[styles.productDetailRow, { gap: 4 }]}>
                            <RatingStarIcon/>
                            <CustomText fontWeight={300}>
                                {product?.rating}    
                            </CustomText>
                        </View>
                    </View>
                    <View style={styles.productDetailRow}>
                        <CustomText style={styles.productDetailText}>
                            ID:
                        </CustomText>
                        <CustomText fontWeight={300} style={styles.productDetailText}>
                            {product?.id}    
                        </CustomText>
                    </View>
                    <View style={styles.productDetailRow}>
                        <CustomText style={styles.productDetailText}>
                            Brand:
                        </CustomText>
                        <CustomText fontWeight={300} style={styles.productDetailText}>
                            {product?.brand}    
                        </CustomText>
                    </View>
                    <View style={styles.productDetailRow}>
                        <CustomText style={styles.productDetailText}>
                            Category:
                        </CustomText>
                        <CustomText fontWeight={300} style={styles.productDetailText}>
                            {product?.category}    
                        </CustomText>
                    </View>
                </View>
                <View style={[styles.descContainer, { borderColor: colors.border }]}>
                    <CustomText style={styles.descText}>
                        {product?.description}
                    </CustomText>
                </View>
            </ScrollView>
            <View style={[styles.bottomContainer, { borderColor: colors.border }]}>
                <View style={{ gap: 8 }}>
                    <CustomText style={styles.totalPriceText}>Total</CustomText>
                    <CustomText fontWeight={500}>
                        ${getProductTotalPrice()}
                    </CustomText>
                </View>
                <Pressable style={[styles.addToCardButton, { backgroundColor: colors.brandColor }]}>
                    <CustomText style={styles.addToCardText}>
                        ADD TO CART
                    </CustomText>
                </Pressable>
            </View>
        </View>
    );
};
export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
    },
    scrollContainer: {
        flexGrow: 1,
        gap: 24
    },
    bottomContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1
    },
    totalPriceText: {
        fontSize: 10,
        color: "#777"
    },
    addToCardButton: {
        borderRadius: 5,
        paddingVertical: 14,
        paddingHorizontal: 24
    },
    addToCardText: {
        fontSize: 14,
        lineHeight: 16,
        color: "#FFF"
    },
    productTitle: {
        lineHeight: 19.2,
        textTransform: "uppercase"
    },
    productDetailsContainer: {
        paddingHorizontal: 16,
        gap: 16
    },
    oldPriceText: {
        fontSize: 14,
        lineHeight: 16.8,
        color: "#F34040",
        textDecorationLine: "line-through"
    },
    productDetailRow: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    productDetailText: {
        fontSize: 14,
        lineHeight: 16,
        textTransform: "capitalize"
    },
    descContainer: {
        padding: 16,
        borderTopWidth: 1,
        justifyContent: "center"
    },
    descText: {
        fontSize: 14,
        lineHeight: 24,
        color: "#8F8F8F"
    }
})
