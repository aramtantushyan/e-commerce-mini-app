import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { SearchIcon } from "../../svg/svgIcons";
import SearchField from "../../lib/SearchField";
import { getAllProductsPath, getProductsByCategoryPath } from "../../../utils/api/api";
import ProductsList from "../../lib/products/ProductsList";
import CustomText from "../../lib/CustomText";

const ProductsListScreen: React.FC = () => {
    const { categoryName } = useLocalSearchParams<{ categoryName: string }>();
    const navigation = useNavigation();

    const isAllProductsMode = !categoryName;
    const url = isAllProductsMode ? getAllProductsPath : getProductsByCategoryPath(categoryName);

    const [searchValue, setSearchValue] = useState("");

    const searchValueChangeHandler = (value: string) => {
        setSearchValue(value);
    }
    
    useEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerTitle: () => isAllProductsMode 
            ? <SearchField onChange={searchValueChangeHandler}/> 
            : <CustomText fontWeight={500}>{categoryName?.toUpperCase()}</CustomText>,
            headerRight: () => (isAllProductsMode ? null : <SearchIcon/>),
            headerShadowVisible: false
        })
    }, [])

    return (
        <View style={styles.container}>
            <ProductsList
                categoryName={categoryName || ""}
                url={url}
                searchKeyword={searchValue}
                showHeader={false}
                allowScroll={true}
                limit={9}
            />
        </View>
    );
};
export default ProductsListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 16
    }
})
