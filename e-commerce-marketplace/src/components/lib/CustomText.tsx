import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

import { ICustomTheme } from "../../utils/constants/themes";

interface IAppBasicTextProps {
    children: React.ReactNode | string
    style?: TextStyle | TextStyle[]
    inputProps?: TextProps
    fontWeight?: 300 | 400 | 500 | 600
}

const FontByWeight = {
    300: "GothamThin",
    400: "GothamLight",
    500: "GothamMedium",
    600: "GothamBold",
}

const CustomText: React.FC<IAppBasicTextProps> = ({ children, style, inputProps, fontWeight }) => {
    const { colors }  = useTheme() as ICustomTheme;
    
    const fontFamily = fontWeight ? FontByWeight[fontWeight] : FontByWeight[400];
    
    return (
        <Text style={[styles.text, { color: colors.text, fontFamily: fontFamily }]} {...inputProps}>
            <Text style={style}>
                {children}
            </Text>
        </Text>
    );
}
export default CustomText;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    }
})
