import { useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import { UserContext } from "../../contexts/user/UserContext";
import { deleteAuthToken, logoutUser } from "../../reducers/user/UserReducerDispatch";
import { removeDataFromAsyncStorage } from "../../utils/helpers/async-storage.helper";
import { LogoutIcon } from "../svg/svgIcons";
import CustomText from "./CustomText";

interface ILogoutButtonProps {
    label?: string;
}

const LogoutButton: React.FC<ILogoutButtonProps> = ({ label }) => {
    const { dispatch } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);

    const logoutHandeler = () => {
        dispatch?.(deleteAuthToken());
        dispatch?.(logoutUser());
        removeDataFromAsyncStorage("accessToken");
        router.replace("/");
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    const showModalHandler = () => {
        setShowModal(true);
    }

    return (
        <>
            <Pressable
                style={styles.button}
                onPress={showModalHandler}
            >
                <LogoutIcon />
                {label ? <CustomText style={{ fontSize: 14 }}>{label}</CustomText> : null}
            </Pressable>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={closeModalHandler}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBody}>
                            <CustomText>Are you sure you want to log out?</CustomText>
                        </View>
                        <View style={styles.modalActions}>
                            <Pressable style={styles.actionButton} onPress={closeModalHandler}>
                                <CustomText>Cancel</CustomText>
                            </Pressable>
                            <Pressable style={styles.actionButton} onPress={logoutHandeler}>
                                <CustomText fontWeight={500} style={{ color: "red" }}>
                                    Log out
                                </CustomText>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default LogoutButton;

const styles = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 18
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.1)"
    },
    modalContainer: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        gap: 16
    },
    modalBody: {
        padding: 16,
    },
    modalActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    actionButton: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
    }
})
