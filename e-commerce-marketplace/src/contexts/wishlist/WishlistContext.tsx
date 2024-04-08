import React, { Dispatch } from "react";
import { IProduct } from "../../utils/types/product";

export interface IWishlistContextProps {
    wishlistData?: IProduct[];
    addToWishlistData?: (newProduct: IProduct) => void;
    removeFromWishlistData?: (id: number) => void;
    removeLocallyStoredWishlistData?: () => void;
}

export const WishlistContext: React.Context<IWishlistContextProps> = React.createContext({});
