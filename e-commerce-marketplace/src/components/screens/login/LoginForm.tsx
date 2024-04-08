import { useContext } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { View,  StyleSheet, TextInput, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";

import CustomText from "../../lib/CustomText";
import { ICustomTheme } from "../../../utils/constants/themes";
import { HTTPMethods, useAxios } from "../../../hooks/useAxios";
import { loginPath } from "../../../utils/api/api";
import { IUser } from "../../../utils/types/user";
import { UserContext } from "../../../contexts/user/UserContext";
import { setAuthToken } from "../../../reducers/user/UserReducerDispatch";
import { storeDataToAsyncStorage } from "../../../utils/helpers/async-storage.helper";

interface ILoginFormProps {
    setIsLoadingLogin: React.Dispatch<React.SetStateAction<boolean>>,
    onLoggedIn?: () => void
}

const LoginForm: React.FC<ILoginFormProps> = ({ setIsLoadingLogin, onLoggedIn }) => {
    const { colors } = useTheme() as ICustomTheme;
    const { dispatch } = useContext(UserContext);
    const formMethods = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        criteriaMode: "all",
        resolver: undefined,
        context: undefined
    });

    const { fetch, loading } = useAxios<IUser>();

    const onLogin = async (data: FieldValues) => {
        setIsLoadingLogin(true);
        try {
            const user: IUser = await fetch(loginPath, {
                method: HTTPMethods.POST,
                body: {
                    ...data,
                    expiresInMins: 60
                }
            });
            
            if (user) {
                const accessToken = user.token;
                if (accessToken) {
                    dispatch?.(setAuthToken({ accessToken }));
                    onLoggedIn?.();
                    storeDataToAsyncStorage("accessToken", accessToken);
                }
                setIsLoadingLogin(false);
            }
        } catch (e) {
            setIsLoadingLogin(false);
        }
    }

    return (
        <>
            <View style={styles.inputsContainer}>
                <View style={styles.textInputGroup}>
                    <CustomText>
                        Username<CustomText style={{ color: "#D56363"}}>*</CustomText>
                    </CustomText>
                    <Controller
                        name="username"
                        control={formMethods.control}
                        rules={{
                            required: true,
                            validate: { nonEmpty: (value) => !!value.trim() }
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) => (
                            <>
                                <TextInput
                                    style={[
                                        styles.textInput,
                                        { borderColor: colors.border }
                                    ]}
                                    onChangeText={onChange}
                                />
                                {error ? (
                                    <View style={styles.validationTextContainer}>
                                        <CustomText style={styles.validationText}>
                                            This field is require
                                        </CustomText>
                                    </View>
                                ) : null}
                            </>
                        )} 
                    />
                </View>
                <View style={styles.textInputGroup}>
                    <CustomText>
                        Password<CustomText style={{ color: "#D56363"}}>*</CustomText>
                    </CustomText>
                    <Controller
                        name="password"
                        control={formMethods.control}
                        rules={{
                            required: true,
                            validate: { nonEmpty: (value) => !!value.trim() }
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) => (
                            <>
                                <TextInput
                                    style={[
                                        styles.textInput,
                                        { borderColor: colors.border }
                                    ]}
                                    onChangeText={onChange}
                                />
                                {error ? (
                                    <View style={styles.validationTextContainer}>
                                        <CustomText style={styles.validationText}>
                                            This field is require
                                        </CustomText>
                                    </View>
                                ) : null}
                            </>
                        )} 
                    />
                </View>
            </View>
            <View style={styles.loginButtonContainer}>
                <Pressable
                    disabled={loading}
                    style={
                        [styles.loginButton,
                        { backgroundColor: colors.brandColor }
                    ]}
                    onPress={formMethods.handleSubmit(onLogin)}
                >
                    <CustomText style={styles.loginButtonText}>LOG IN</CustomText>
                </Pressable>
            </View>
        </>
    );
};
export default LoginForm;

const styles = StyleSheet.create({
    textInputGroup: {
        gap: 10,
        position: "relative",
        paddingBottom: 16
    },
    textInput: {
        height: 52,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 8
    },
    inputsContainer: {
        gap: 8
    },
    validationTextContainer: {
        position: "absolute",
        bottom: 0
    },
    validationText: {
        fontSize: 12,
        color: "red",
    },
    loginButtonContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },
    loginButton: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    loginButtonText: {
        fontSize: 14,
        lineHeight: 16,
        color: "#FFF"
    }
})
