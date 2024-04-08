import { PropsWithChildren, useEffect, useState } from "react";

import { WishlistContext } from "./WishlistContext";
import { IProduct } from "../../utils/types/product";
import { addProductToWishList, getWishlistProducts, removeProductFromWishList } from "../../utils/helpers/wishlist.helper";

const WishlistContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [wishlistProducts, setWishlistProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        getWishlistProducts()
            .then(data => setWishlistProducts(data));
    }, []);

    const removeItemFromWishlist = async (productCategory: string, productId: number) => {
        const isRemoved = await removeProductFromWishList(productCategory, productId);
        if (isRemoved) {
            const newWishlistData = wishlistProducts.filter((p) => p.category !== productCategory && p.id !== productId);
            setWishlistProducts(newWishlistData);
        }
    }

    const addItemToWishlist = async (product: IProduct) => {
        console.log("adding wishlist");
        
        const isAdded = await addProductToWishList(product);
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