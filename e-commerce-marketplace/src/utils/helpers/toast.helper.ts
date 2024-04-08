import Toast from "react-native-toast-message";

export enum ToastType {
    SUCCESS = "success",
    ERROR = "error",
    INFO = "info"
}

interface ICreateToastConfig {
    type: ToastType,
    text2: string,
    position?: "top" | "bottom",
    visibilityTime?: number,
    autoHide?: boolean,
    topOffset?: number,
    bottomOffset?: number
}

export const createToast = (toastConfig: ICreateToastConfig) => {
    return Toast.show({
        ...toastConfig,
        position: toastConfig.position || "top",
        visibilityTime: toastConfig.visibilityTime || 2000,
    })
}
