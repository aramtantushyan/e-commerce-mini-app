import { Theme } from "@react-navigation/native";

interface IThemeColors {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
}

export interface ICustomColors extends IThemeColors {
    brandColor: string;
}

export const LightThemeColors: ICustomColors = {
    primary: "#000",
    background: "#F9F9F9",
    text: "#1E1D1D",
    border: "#DFDFDF",
    card: "#FFFFFF",
    notification: "rgb(255, 69, 58)",
    brandColor: "#7867BE",
};

export interface ICustomTheme extends Theme {
    colors: ICustomColors;
}

export const LightTheme: ICustomTheme = {
    dark: false,
    colors: {
        ...LightThemeColors,
    },
};
