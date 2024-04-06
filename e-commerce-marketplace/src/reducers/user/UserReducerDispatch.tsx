import { AuthToken } from "../../contexts/user/UserContext";
import { IUser } from "../../utils/types/user";

export enum UserDispatchTypeProps {
    SET_USER = "set_user",
    UPDATE_USER = "update_user",
    LOGOUT_USER = "logout_user",
    SET_AUTH_TOKEN = "set_auth_token",
    DELETE_AUTH_TOKEN = "delete_auth_token"
}

export const setUser = (data: IUser) => {
    return {
        type: UserDispatchTypeProps.SET_USER,
        data
    };
};
export const updateUser = (data: IUser) => {
    return {
        type: UserDispatchTypeProps.UPDATE_USER,
        data
    };
};

export const logoutUser = () => {
    return {
        type: UserDispatchTypeProps.LOGOUT_USER
    };
};

export const setAuthToken = (data: AuthToken) => {
    return {
        type: UserDispatchTypeProps.SET_AUTH_TOKEN,
        data
    };
};

export const deleteAuthToken = () => {
    return {
        type: UserDispatchTypeProps.DELETE_AUTH_TOKEN
    };
};


