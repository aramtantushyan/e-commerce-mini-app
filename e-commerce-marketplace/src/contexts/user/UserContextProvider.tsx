import { PropsWithChildren, useEffect, useReducer, useState } from "react";

import { AuthToken, UserContext } from "./UserContext";
import UserAuthReducer, { initialUserState } from "../../reducers/user/UserReducer";
import { deleteAuthToken, setAuthToken, setUser } from "../../reducers/user/UserReducerDispatch";
import { HTTPMethods, customAxios } from "../../hooks/useAxios";
import { getMePath } from "../../utils/api/api";

const UserContextProvider: React.FC<PropsWithChildren & { token?: string | null }> = ({ children, token }) => {
    const [state, dispatch] = useReducer(UserAuthReducer, initialUserState);

    useEffect(() => {
        if (state.accessToken || token) {
            fetchUser();
        }
    }, [state.accessToken, token]);

    const fetchUser = async () => {
        const currentUser = await customAxios(
            getMePath, 
            { method: HTTPMethods.GET },
            state.accessToken || token
        );
        dispatch?.(setUser(currentUser));
    }

    const setToken = (data: AuthToken) => {
        dispatch(setAuthToken?.(data));
    };

    const deleteToken = () => {
        dispatch(deleteAuthToken?.());
    }

    return (
        <UserContext.Provider value={{
            user: state.user,
            accessToken: state.accessToken || token,
            dispatch,
            setAuthToken: setToken,
            deleteAuthToken: deleteToken,
        }}>
            {children}
        </UserContext.Provider>
    );
};


export default UserContextProvider;