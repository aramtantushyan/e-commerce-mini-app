import React, { Dispatch } from "react";
import { IUser } from "../../utils/types/user";
import { IUserActionProps } from "../../reducers/user/UserReducer";

export interface AuthToken {
    accessToken: string
}

export interface IUserContextProps {
    user?: IUser;
    accessToken?: string | null;
    dispatch?: Dispatch<IUserActionProps>;
}

export const UserContext: React.Context<IUserContextProps> = React.createContext({});
