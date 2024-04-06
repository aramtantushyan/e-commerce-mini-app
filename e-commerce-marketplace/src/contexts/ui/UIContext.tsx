import React from "react";

export interface IUserInterfaceContextProps {
    isLoadingState?: boolean;
    setIsLoadingState?: (isLoading: boolean) => void;
}

export const UIContext: React.Context<IUserInterfaceContextProps> = React.createContext({});
