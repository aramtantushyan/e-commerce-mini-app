import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "@react-navigation/native";

import { IProduct } from "../../../utils/types/product";
import CustomText from "../CustomText";
import { ICustomTheme } from "../../../utils/constants/themes";
import { RatingStarIcon } from "../../svg/svgIcons";
import FavoriteButton from "../FavoriteButton";
import { useContext, useMemo } from "react";
import { WishlistContext } from "../../../contexts/wishlist/WishlistContext";

interface IProductItemProps {
    width: number;
    product: IProduct;
}

const ProductItem: React.FC<IProductItemProps> = ({ width, product }) => {
    const { colors } = useTheme() as ICustomTheme;
    const { wishlistData } = useContext(WishlistContext);

    const isFav = useMemo(() => {
        return wishlistData?.some(wishlistItem => {
            return wishlistItem.category === product.category && wishlistItem.id === product.id
        })
    }, [wishlistData?.length]);

    return (
        <View
            style={[
                styles.productItem, 
                { width }
            ]}
        >
            <View style={styles.thumbnailContainer}>
                <Image
                    source={{ uri: product.thumbnail}}
                    style={[
                        styles.productThumbnail,
                        { 
                            width,
                            height: width,
                            backgroundColor: colors.cardBackground
                        }
                    ]}
                />
                <View style={styles.favIconContainer}>
                    <FavoriteButton
                        isFavorite={!!isFav}
                        product={product}
                    />
                </View>
            </View>
            <CustomText style={styles.productTitle} inputProps={{ numberOfLines: 2}}>
                {product.title}
            </CustomText>
            <View style={styles.productDetails}>
                <View style={{flexDirection: 'row'}}>
                    <RatingStarIcon/>
                    <CustomText style={styles.productTitle}>
                        {product.rating}
                    </CustomText>
                </View>
                <CustomText style={styles.productPrice} fontWeight={500}>
                    ${product.price}
                </CustomText>
            </View>
        </View>
    );
};
export default ProductItem;

const styles = StyleSheet.create({
    productItem: {
        gap: 10
    },
    thumbnailContainer: {
        position: "relative"
    },
    productThumbnail: {
        resizeMode: "contain",
        borderRadius: 10
    },
    productTitle: {
        fontSize: 12,
        lineHeight: 14.4,
        textTransform: "uppercase"
    },
    productPrice: {
        fontSize: 14,
        lineHeight: 16.8
    },
    productDetails: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        width: "100%",
        marginTop: "auto"
    },
    favIconContainer: {
        position: "absolute",
        top: 4,
        right: 4,
        zIndex: 100000
    }
})
