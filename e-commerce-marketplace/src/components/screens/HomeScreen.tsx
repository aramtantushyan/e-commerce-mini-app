import { ScrollView, StyleSheet, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

import HorizontalBannerSlider from "../lib/HorizontalBannerSlider";
import { useAxios } from "../../hooks/useAxios";
import { getCategoriesPath } from "../../utils/api/api";
import Loader from "../lib/Loader";
import ProductsList from "../lib/lists/ProductsList";
import ListItemSeparator from "../lib/lists/ListItemSeparator";
import { ICustomTheme } from "../../utils/constants/themes";

const banners = [
    {
        id: 1,
        source: require("../../../assets/images/banner/banner1.jpg")
    },
    {
        id: 2,
        source: require("../../../assets/images/banner/banner2.jpg")
    },
    {
        id: 3,
        source: require("../../../assets/images/banner/banner3.jpg")
    },
]
const HomeScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme() as ICustomTheme;

    const { loading, data: categories, fetch } = useAxios(getCategoriesPath);

    if (loading) {
        return <Loader fullScreenLoader={true} size="large" />
    }

    const getListItemSeparatorComponent = () => {
        return (
            <ListItemSeparator
                style={{ 
                    height: 1,
                    marginVertical: 24,
                    backgroundColor: colors.border
                }}
            />
        );
    };

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { paddingBottom: insets.bottom || 24 }
            ]}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
        >
            <HorizontalBannerSlider bannersData={banners} />
            <FlatList
                contentContainerStyle={styles.categoriesList}
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                data={categories}
                keyExtractor={(item, index) => `${index}`}
                scrollEnabled={false}
                ItemSeparatorComponent={getListItemSeparatorComponent}
                renderItem={({ item }) => (
                    <ProductsList
                        categoryName={item}
                        allowScroll={false}
                        showHeader={true}
                    />
                )}
            />
        </ScrollView>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 16,
        gap: 24
    },
    categoriesList: {
        paddingHorizontal: 16,
    }
})
