import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, RefreshControl, StyleSheet, View, useWindowDimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";

import ListItemSeparator from "../lists/ListItemSeparator";
import { ICustomTheme } from "../../../utils/constants/themes";
import { IProduct } from "../../../utils/types/product";
import CustomText from "../CustomText";
import { useAxios } from "../../../hooks/useAxios";
import { getProductsByCategoryPath } from "../../../utils/api/api";
import EmptyListPlaceholder from "../lists/EmptyListPlaceholder";
import Loader from "../Loader";
import ProductItem from "./ProductItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IProductsListProps {
    categoryName?: string;
    showHeader?: boolean;
    allowScroll?: boolean;
    limit?: number;
    url: string;
    searchKeyword?: string
}

const ProductsList: React.FC<IProductsListProps> = ({ categoryName, showHeader, allowScroll, limit = 4, url, searchKeyword }) => {
    const { width } = useWindowDimensions();
    const { colors } = useTheme() as ICustomTheme;
    const insets = useSafeAreaInsets();
    
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

    const { data, loading, fetch } = useAxios();

    useEffect(() => {
        fetchProducts(false);
    }, []);

    useEffect(() => {
        if (!searchKeyword) {
            !loading && fetchProducts(true);
        } else if (searchKeyword) {
            const filteredProducts = products.filter(p => {
                return p.title.toLowerCase().includes(searchKeyword.toLowerCase());
            })
            setFilteredProducts(filteredProducts);
        }
    }, [searchKeyword])

    const columnWidth = (width - 32 - 16) / 2;

    const seeAllPressHandler = () => {
        if (categoryName) {
            router.push(`products/${categoryName}`)
        }
    }

    const getListHeaderComponent = () => {
        if (showHeader) {
            return (
                <View style={styles.listHeader}>
                    <CustomText fontWeight={500} style={styles.listHeaderTitle}>
                        {categoryName?.replaceAll("-", " ")}
                    </CustomText>
                    <Pressable onPress={seeAllPressHandler}>
                        <CustomText
                            fontWeight={600}
                            style={[styles.listHeaderSeeAll, { color: colors.brandColor }]}
                        >
                            SEE ALL
                        </CustomText>
                    </Pressable>
                </View>
            )
        }
        return null;
    };

    const getListFooterComponent = () =>{
        if (loading && products.length && !isRefreshing && products.length < data?.total) {
            return <Loader/>;
        }
        return null;
    }

    const renderItem = ({ item }: { item: IProduct }) => (
        <ProductItem product={item} width={columnWidth}/>
    );

    const fetchProducts = (isRefreshing = false) => {
        if (!searchKeyword) {
            setIsRefreshing(isRefreshing);
            const queryParams = {
                limit,
                skip: 0
            }
            if (allowScroll && products.length && !isRefreshing) {
                queryParams.skip = products.at(-1)?.id as number;
            }
            fetch(url, {
                queryParams
            }).then(data => {
                if (data.products.length) {
                    if (isRefreshing) {
                        setProducts(data.products);
                    } else {
                        setProducts([...products, ...data.products]);
                    }
                }
            }).finally(() => {
                setIsRefreshing(false);
            });
        }
    }

    if (!data) {
        return (
            <View style={{height: 2 * columnWidth + 50}}>
                {getListHeaderComponent()}
                <Loader fullScreenLoader={true}/>
            </View>
        )
    }

    return (
        <FlatList
            contentContainerStyle={[
                styles.container,
                { 
                    width,
                    paddingBottom: insets.bottom || 24
                }
            ]}
            numColumns={2}
            columnWrapperStyle={{
                gap: 16
            }}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            scrollEnabled={allowScroll}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={() => fetchProducts(true)}
                    colors={[colors.brandColor]}
                    tintColor={colors.brandColor}
                />
            }
            onEndReached={() => {
                if (allowScroll && products.length < data?.total && !loading) {
                    fetchProducts();
                }
            }}
            onEndReachedThreshold={0.1}
            ListHeaderComponent={getListHeaderComponent}
            ListHeaderComponentStyle={{marginBottom: 12}}
            ListEmptyComponent={EmptyListPlaceholder}
            ListFooterComponent={getListFooterComponent}
            data={searchKeyword ? filteredProducts : products}
            keyExtractor={(item) => `${item.category}-${item.id}`}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={renderItem}
        />
    );
};
export default ProductsList;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        rowGap: 16
    },
    listHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8
    },
    listHeaderTitle: {
        textTransform: "uppercase",
        lineHeight: 19.2
    },
    listHeaderSeeAll: {
        fontSize: 12,
        lineHeight: 14.4,
        textDecorationLine: "underline"
    }
})
