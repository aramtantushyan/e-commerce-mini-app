import { IProduct } from "../types/product";
import { readDataFromAsyncStorage, storeDataToAsyncStorage } from "./async-storage.helper";
import { ToastType, createToast } from "./toast.helper";

const wishlistKey = (userId: number) => `e-commerse-app-whishlistData-${userId}`;

export const addProductToWishList = async (product: IProduct, currentUserId: number) => {
    try {
        const existingProducts = await getWishlistProducts(currentUserId);
        if (existingProducts.length) {
            const isAlreadyStored = existingProducts.some((p: IProduct) => {
                return p.category === product.category && p.id === product.id
            })
            if (!isAlreadyStored) {
                return await storeDataToAsyncStorage(wishlistKey(currentUserId), [...existingProducts, product]);
            }
        } else {
            return await storeDataToAsyncStorage(wishlistKey(currentUserId), [product]);
        }
    } catch (e) {
        createToast({
            type: ToastType.ERROR,
            text2: "Failed to add item to wishlist"
        });
        throw e;
    }
};

export const removeProductFromWishList = async (categoryName: string, id: number, currentUserId: number) => {
    try {
        const existingProducts = await getWishlistProducts(currentUserId);
        const newProductsList = existingProducts.filter((p: IProduct) => p.category !== categoryName && p.id !== id)
        return await storeDataToAsyncStorage(wishlistKey(currentUserId), newProductsList);
    } catch (e) {
        createToast({
            type: ToastType.ERROR,
            text2: "Failed to remove item from wishlist"
        });
        throw e;
    }
}

export const getWishlistProducts = async (currentUserId: number) => {
    try {
        const existingProducts = await readDataFromAsyncStorage(wishlistKey(currentUserId));
        return existingProducts || [];
    } catch (e) {
        createToast({
            type: ToastType.ERROR,
            text2: "Failed to get wishlist items"
        });
        throw e;
    }
};