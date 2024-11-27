import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Substituto para useNavigate
import { useAuth } from '../../Context/authContext';

const Header: React.FC = ({routeName}) => {
    const { auth, setAuth, logout } = useAuth();
    const navigation = useNavigation();
    const handleLogout = () => {
        logout();
        navigation.navigate('Login'); // Redireciona para a página de login
    };

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Blog Escola</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#191970',
        paddingTop: 28,
        paddingBottom: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
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
    buttonContainer: {
        flex: 0.3,
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: '#1e90ff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Header;
