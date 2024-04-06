import { PropsWithChildren, useEffect, useReducer, useState } from "react";

import { AuthToken, UserContext } from "./UserContext";
import UserAuthReducer, { initialUserState } from "../../reducers/user/UserReducer";
import { deleteAuthToken, setAuthToken, setUser } from "../../reducers/user/UserReducerDispatch";
import { readDataFromAsyncStorage } from "../../utils/helpers/async-storage.helper";
import { HTTPMethods, customAxios } from "../../hooks/useAxios";
import { getMePath } from "../../utils/api/api";

const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(UserAuthReducer, initialUserState);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const accessToken = await readDataFromAsyncStorage("accessToken");
        if (accessToken) {
            setAccessToken(accessToken);
            const currentUser = await customAxios(
                getMePath, 
                { method: HTTPMethods.GET },
                accessToken
            );
            dispatch?.(setUser(currentUser));
        }
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
            accessToken: state.accessToken || accessToken,
            dispatch,
            setAuthToken: setToken,
            deleteAuthToken: deleteToken,
        }}>
            {children}
        </UserContext.Provider>
    );
};


export default UserContextProvider;