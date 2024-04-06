import { IUserContextProps } from "../../contexts/user/UserContext";
import { IUser } from "../../utils/types/user";
import { UserDispatchTypeProps } from "./UserReducerDispatch";

export interface IUserActionProps {
    type: UserDispatchTypeProps;
    data?: any;
}

export interface IUserStateProps {
    user?: IUser | null;
    accessToken?: string | null;
}

export const initialUserState: IUserStateProps = {
    user: null,
    accessToken: null,
};

function UserAuthReducer(state: IUserContextProps, action: IUserActionProps) {
    const { data } = action;

    switch (action.type) {
        case UserDispatchTypeProps.SET_USER:
            return { ...state, user: data };
        case UserDispatchTypeProps.UPDATE_USER:
            return { ...state, user: { ...state.user, ...data } };
        case UserDispatchTypeProps.LOGOUT_USER:
            return { ...state, user: null };
        case UserDispatchTypeProps.SET_AUTH_TOKEN:
            return { ...state, ...data };
        case UserDispatchTypeProps.DELETE_AUTH_TOKEN:
            return { ...state, accessToken: null };
        default:
            return state;
    }
}

export default UserAuthReducer;
