import { FlatList, StyleSheet, Image, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

import { useAxios } from "../../hooks/useAxios";
import { getCategoriesPath } from "../../utils/api/api";
import Loader from "../lib/Loader";
import ListItemSeparator from "../lib/lists/ListItemSeparator";
import EmptyListPlaceholder from "../lib/lists/EmptyListPlaceholder";
import { ICustomTheme } from "../../utils/constants/themes";
import CustomText from "../lib/CustomText";
import { CATEGORY_IMAGES } from "../../utils/constants/categoriy-images";
import { router } from "expo-router";

const CategoriesScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme() as ICustomTheme;

    const { data: categories, loading } = useAxios(getCategoriesPath);

    const getListItemSeparatorComponent = () => {
        return (
            <ListItemSeparator/>
        );
    };

    const categoryPressHandler = (categoryName: string) => {
        router.push(`products/${categoryName}`);
    }

    const renderItem = ({ item }: { item: string }) => (
        <Pressable style={styles.categoryItem} onPress={() => categoryPressHandler(item)}>
            <Image
                source={CATEGORY_IMAGES[item.replaceAll("-", "_") as keyof typeof CATEGORY_IMAGES]}
                style={[
                    styles.categoryImage,
                    { 
                        backgroundColor: colors.cardBackground
                    }
                ]}
            />
            <View style={styles.categoryNameContainer}>
                <CustomText style={styles.categoryName} fontWeight={500}>
                    {item.replaceAll("-", " ")}
                </CustomText>
            </View>
        </Pressable>
    );

    if (loading && !categories) {
        return <Loader fullScreenLoader={true} size="large"/>
    }

    return (
        <FlatList
            contentContainerStyle={[
                styles.container,
                { paddingBottom: insets.bottom || 24 }
            ]}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={getListItemSeparatorComponent}
            ListEmptyComponent={EmptyListPlaceholder}
            data={categories}
            keyExtractor={(iten, index) => `${index}`}
            renderItem={renderItem}
        />
    );
};
export default CategoriesScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 16
    },
    categoryItem: {
        position: "relative"
    },
    categoryImage: {
        width: "100%",
        height: 130,
        resizeMode: "contain",
        borderRadius: 10
    },
    categoryName: {
        textTransform: "uppercase",
        lineHeight: 19.2,
        color: "#FFF"
    },
    categoryNameContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
    }
})
