import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Header from "../Header/header"
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { useAuth } from "../../Context/authContext"
import { useNavigation } from "@react-navigation/native"
import { MaterialIcons } from '@expo/vector-icons'

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const { logout } = useAuth();
    const navigation = useNavigation();
    const handleLogout = () => {
        logout();
        navigation.navigate("Login");
    }
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.headerTitle}>Blog Escola</Text>
            </View>
            <DrawerContentScrollView style={styles.content} {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <MaterialIcons name={"logout"} size={24} color={"#ba0606"} />
                    <Text style={styles.footerText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        backgroundColor: "#191970",
        paddingTop: 28,
        paddingBottom: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    content: {
        height: "90%",
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        padding: 20,
        width: "100%",
    },
    footerText: {
        fontSize: 14,
    },
    logoutButton: {
        padding: 4,
        flexDirection: "row",
        alignItems: 'center',
    },
});

export default CustomDrawer;