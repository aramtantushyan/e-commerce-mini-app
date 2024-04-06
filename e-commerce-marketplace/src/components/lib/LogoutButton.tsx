import { useContext } from "react";
import { Pressable } from "react-native";
import { router } from "expo-router";

import { UserContext } from "../../contexts/user/UserContext";
import { deleteAuthToken, logoutUser } from "../../reducers/user/UserReducerDispatch";
import { removeDataFromAsyncStorage } from "../../utils/helpers/async-storage.helper";
import { LogoutIcon } from "../svg/svgIcons";
import CustomText from "./CustomText";



interface ILogoutButtonProps {
    label?: string;
}

const LogoutButton: React.FC<ILogoutButtonProps> = ({ label }) => {
    const { dispatch } = useContext(UserContext);

    const logoutHandeler = () => {
        dispatch?.(deleteAuthToken());
        dispatch?.(logoutUser());
        removeDataFromAsyncStorage("accessToken");
        router.replace("/");
    };
    return (
        <Pressable
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            onPress={logoutHandeler}
        >
            <LogoutIcon />
            {label ? <CustomText style={{ fontSize: 14 }}>{label}</CustomText> : null}
        </Pressable>
    );
};
export default LogoutButton;
