import { PropsWithChildren, useContext, useEffect, useState } from "react";

import { WishlistContext } from "./WishlistContext";
import { IProduct } from "../../utils/types/product";
import { addProductToWishList, getWishlistProducts, removeProductFromWishList } from "../../utils/helpers/wishlist.helper";
import { UserContext } from "../user/UserContext";

const WishlistContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { user } = useContext(UserContext);
    const [wishlistProducts, setWishlistProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        if (user) {
            getWishlistProducts(user?.id)
                .then(data => setWishlistProducts(data));
        }
    }, [user]);

    const removeItemFromWishlist = async (productId: number) => {
        const isRemoved = await removeProductFromWishList(productId, user?.id as number);
        if (isRemoved) {
            const newWishlistData = wishlistProducts.filter((p) => p.id !== productId);
            setWishlistProducts(newWishlistData);
        }
    }

    const addItemToWishlist = async (product: IProduct) => {        
        const isAdded = await addProductToWishList(product, user?.id as number);
        if (isAdded) {
            setWishlistProducts([...wishlistProducts, product]);
        }
    }

    const removeWishlistData = () => {
        setWishlistProducts([]);
    }

    return (
        <WishlistContext.Provider value={{
            wishlistData: wishlistProducts,
            removeFromWishlistData: removeItemFromWishlist,
            addToWishlistData: addItemToWishlist,
            removeLocallyStoredWishlistData: removeWishlistData
        }}>
            {children}
        </WishlistContext.Provider>
    );
};


export default WishlistContextProvider;