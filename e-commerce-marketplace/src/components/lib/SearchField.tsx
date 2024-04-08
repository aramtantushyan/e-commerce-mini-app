import { View, Text, TextInput, StyleSheet, Pressable, useWindowDimensions } from "react-native";
import { useTheme } from "@react-navigation/native";

import { ICustomTheme } from "../../utils/constants/themes";
import { SearchIcon, XIcon } from "../svg/svgIcons";
import { useState } from "react";

interface ISearchFieldProps {
    onChange: (value: string) => void
}

const SearchField: React.FC<ISearchFieldProps> = ({onChange}) => {
    const { colors } = useTheme() as ICustomTheme;
    const [inputValue, setInputValue] = useState("");
    const { width } = useWindowDimensions();

    const searchInputHandler = (value: string) => {
        setInputValue(value);
        onChange(value);
    }

    const deleteEnteredValue = () => {
        setInputValue("");
        onChange("");
    }

    return (
        <View style={[
            styles.textInputContainer,
            { 
                borderColor: colors.border,
                width: width - 44 - 16 - 6
            }
        ]}>
            <SearchIcon allowNavigation={false} fillColor="#9D9D9D" style={{}} />
            <TextInput
                value={inputValue}
                placeholder="SEARCH"
                style={[
                    styles.textInput,
                    { borderColor: colors.border }
                ]}
                onChangeText={searchInputHandler}
            />
            {inputValue ? (
                <Pressable onPress={deleteEnteredValue}>
                    <XIcon size={10} fillColor="#9D9D9D" />
                </Pressable>
            ) : null}
        </View>
    );
};
export default SearchField;

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 11,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 16,
        backgroundColor: "#F4F4F4"
    },
    textInput: {
        flex: 1,
    }
})
