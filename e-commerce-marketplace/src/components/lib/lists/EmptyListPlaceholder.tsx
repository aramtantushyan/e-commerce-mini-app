import { StyleSheet, View } from "react-native";

import CustomText from "../CustomText";

interface IEmptyListPlaceholderProps {
    text?: string
}

const EmptyListPlaceholder: React.FC<IEmptyListPlaceholderProps> = ({ text = "No results" }) => {
    return (
        <View style={styles.emptyListContainer}>
            <CustomText style={styles.placeholderText}>
                {text}
            </CustomText>
        </View>
    )
}
export default EmptyListPlaceholder;

const styles = StyleSheet.create({
    emptyListContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 50 
    },
    placeholderText: {
        fontFamily: "GothamMedium",
        color: "#9a9a9a",
        textAlign: "center",
        lineHeight: 19
    }
})