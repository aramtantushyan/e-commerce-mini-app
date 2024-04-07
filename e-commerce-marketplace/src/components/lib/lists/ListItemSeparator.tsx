import { StyleSheet, View, ViewStyle } from "react-native";

interface IListItemSeparatorStyles {
    height: number,
    backgroundColor: string
}

interface IListItemSeparatorProps {
    isHorizontal?: boolean;
    style?: ViewStyle;
}

const ListItemSeparator: React.FC<IListItemSeparatorProps> = ({ style, isHorizontal }) => {
    return (
        <View 
            style={[
                !isHorizontal 
                    ? styles.verticalSeparator
                    : styles.horizontalSeparator,
                style
            ]}
        />
    );
};
export default ListItemSeparator;

const styles = StyleSheet.create({
    verticalSeparator: {
        height: 16,
        width: "100%",
    },
    horizontalSeparator: {
        width: 16
    }
});