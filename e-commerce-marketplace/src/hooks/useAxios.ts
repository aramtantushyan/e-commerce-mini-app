import axios, { AxiosError, ResponseType } from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user/UserContext";
import { deleteAuthToken, logoutUser } from "../reducers/user/UserReducerDispatch";
import { removeDataFromAsyncStorage } from "../utils/helpers/async-storage.helper";
import { WishlistContext } from "../contexts/wishlist/WishlistContext";

export enum HTTPMethods {
    POST = "post",
    GET = "get",
    DELETE = "delete",
    PUT = "put",
}

interface IRequestConfig {
    method?: HTTPMethods;
    headers?: any;
    body?: any;
    queryParams?: any;
    responseType?: ResponseType;
}

interface IAxiosState<T> {
    loading: boolean;
    data: T | null;
}

export const useAxios = <T = any, >(url?: string, requestConfig?: IRequestConfig) => {
    const { accessToken, dispatch } = useContext(UserContext);
    const { removeLocallyStoredWishlistData } = useContext(WishlistContext);

    const [fullData, setFullData] = useState<IAxiosState<T>>({
        loading: !!url,
        data: null
    });

    useEffect(() => {
        url && fetch(url, requestConfig);
    }, [url, JSON.stringify(requestConfig?.queryParams)]);

    const fetch = async (url?: string, requestConfig?: IRequestConfig) => {
        if (!url) {
            return Promise.reject();
        }

        setFullData({
            ...fullData,
            loading: true,
        });

        try {
            const response = await customAxios(url, requestConfig, accessToken);
            setFullData({
                data: response,
                loading: false
            });
            return response;
        } catch (error: AxiosError) {
            if (error.response?.status === 401) {
                dispatch?.(deleteAuthToken());
                dispatch?.(logoutUser());
                removeDataFromAsyncStorage("accessToken");
                removeLocallyStoredWishlistData?.();
            }
            setFullData({
                ...fullData,
                loading: false
            });
            throw error;
        }
    }
    return {
        fetch,
        loading: fullData.loading,
        data: fullData.data,
    };
}

export async function customAxios(url: string, requestConfig: IRequestConfig = {}, accessToken?: string | null) {
    const requestOptions = { method: HTTPMethods.GET, ...requestConfig };
    const params = new URLSearchParams();

    for (const key in requestOptions.queryParams) {
        if (requestOptions.queryParams.hasOwnProperty(key)) {
            if (Array.isArray(requestOptions.queryParams[key])) {
                requestOptions.queryParams[key].forEach((v: string) => {
                    params.append(key, v);
                });
            } else {
                params.append(key, requestOptions.queryParams[key]);
            }
        }
    }

    try {
        const response = await axios({
            method: requestOptions.method,
            headers: {
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
                ...(requestOptions.headers || {
                    "Content-Type": "application/json",
                }),
            },
            url,
            responseType: requestOptions?.responseType || "json",
            params,
            data: requestOptions.body || undefined
        });
        if (response) {
            return response.data;
        }
    } catch (e: AxiosError) {
        console.log("Axios error:", {
            ...(e.response?.data || {}),
            url
        });
        throw e;
    }
}