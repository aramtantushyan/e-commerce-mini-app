// Authorization endpoints

export const loginPath = "https://dummyjson.com/auth/login";
export const getMePath = "https://dummyjson.com/auth/me";

// Products endpoints

export const getCategoriesPath = 'https://dummyjson.com/products/categories';
export const getProductsByCategoryPath = (categoryName: string) => `https://dummyjson.com/products/category/${categoryName}`