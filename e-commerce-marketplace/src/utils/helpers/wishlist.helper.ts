import { IProduct } from "../types/product";
import { readDataFromAsyncStorage, storeDataToAsyncStorage } from "./async-storage.helper";

const wishlistKey = "whishlistData";

export const addProductToWishList = async (product: IProduct) => {
    try {
        const existingProducts = await getWishlistProducts();
        if (existingProducts.length) {
            const isAlreadyStored = existingProducts.some((p: IProduct) => {
                return p.category === product.category && p.id === product.id
            })
            if (!isAlreadyStored) {
                return await storeDataToAsyncStorage(wishlistKey, [...existingProducts, product]);
            }
        } else {
            return await storeDataToAsyncStorage(wishlistKey, [product]);
        }
    } catch (e) {
        throw e;
    }
};

export const removeProductFromWishList = async (categoryName: string, id: number) => {
    try {
        const existingProducts = await getWishlistProducts();
        const newProductsList = existingProducts.filter((p: IProduct) => p.category !== categoryName && p.id !== id)
        return await storeDataToAsyncStorage(wishlistKey, newProductsList);
    } catch (e) {
        throw e;
    }
}

export const getWishlistProducts = async () => {
    try {
        const existingProducts = await readDataFromAsyncStorage(wishlistKey);
        return existingProducts || [];
    } catch (e) {
        throw e;
    }
};