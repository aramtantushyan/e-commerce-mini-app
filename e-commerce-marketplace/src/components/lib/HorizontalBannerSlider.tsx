import { useState } from "react";
import { View, StyleSheet, FlatList, ImageSourcePropType, Image, useWindowDimensions } from "react-native";
import { useTheme } from "@react-navigation/native";

import ListItemSeparator from "./lists/ListItemSeparator";
import { ICustomTheme } from "../../utils/constants/themes";

interface IBannerData {
    id: number,
    source: ImageSourcePropType | string, 
}

interface IHorizontalBannerSliderProps {
    bannersData: IBannerData[];
    bannerHeight?: number;
    bannerAspectRatio?: number
}

const HorizontalBannerSlider: React.FC<IHorizontalBannerSliderProps> = ({ bannersData, bannerHeight = 215, bannerAspectRatio = 16 / 9 }) => {
    const { width } = useWindowDimensions();
    const { colors } = useTheme() as ICustomTheme;
    const [visibleIndex, setVisibleIndex] = useState(0);

    const getListItemSeparatorComponent = () => {
        return <ListItemSeparator isHorizontal={true} style={{ width: 16 }}/>
    };

    const renderItem = ({ item }: { item: IBannerData }) => (
        <Image
            source={
                typeof item.source === "string" 
                    ? { uri: item.source } 
                    : item.source
            }
            style={[
                styles.bannerItemImage,
                { 
                    width: width - 32,
                    backgroundColor: colors.cardBackground,
                    height: bannerHeight,
                    aspectRatio: bannerAspectRatio
                }
            ]}
        />
    );

    const onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setVisibleIndex(viewableItems[0].item.id);
        }
      };

    if (!bannersData.length) {
        return null;
    }

    return (
        <View style={{flex: 1, position: "relative"}}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={getListItemSeparatorComponent}
                data={bannersData}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 80
                }}
            />
            <View style={{
                    position: "absolute",
                    width, 
                    top: bannerHeight - 40, 
                    alignItems: "center"
                }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    {bannersData.map(b => (
                        <View
                            key={`pagination-${b.id}`}
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 8,
                                backgroundColor: visibleIndex === b.id ? "#000000" : "#FFF"
                            }}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};
export default HorizontalBannerSlider;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        alignItems: "stretch",
    },
    bannerItemImage: {
        resizeMode: "contain",
        borderRadius: 10
    },
    bannerItem: {
        flexDirection: "row",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    }
})
