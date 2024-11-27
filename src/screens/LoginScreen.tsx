import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header/header";
import { getProfessorByUserApi, userLoginApi } from "../services/apiFunctions";
import { useAuth } from "../Context/authContext";
import { Auth } from "../types/Token";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Professor } from "../types/Professor";
import { useProfessor } from "../Context/professorContext";


const LoginScreen: React.FC = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth, setAuth } = useAuth();
    const { professor, setProfessor } = useProfessor();

    const handleLogin = () => {
        if (email == '' || email == undefined || email == null) {
            alert("Preencha o campo: Email");
        }
        if (password == '' || password == undefined || password == null) {
            alert("Preencha o campo: Senha");
        }

        userLoginApi({
            email: email,
            password: password
        }).then((result) => {
            const authResponse: Auth = {
                token: result.data.token,
                refreshToken: {
                    createdAt: result.data.refreshToken.createdAt,
                    expiresIn: result.data.refreshToken.expiresIn,
                    id: result.data.refreshToken.id,
                    userId: result.data.refreshToken.userId,
                },
                user: {
                    id: result.data.user.id,
                    name: result.data.user.name,
                    email: result.data.user.email,
                    role: result.data.user.role
                }
            };
            setAuth(authResponse);

            navigation.navigate("PostList");

        }).catch((error) => {
            alert("Não foi possível realizar o login");
        });



        // if (email === 'admin@example.com' && password === '123456') {
        //     navigation.navigate('PostList');
        // } else {
        //     alert('Login inválido!');
        // }
    };

    const handleCreateAccount = () => {
        navigation.navigate('CreateAccountScreen');
    };

    return (
        <View style={styles.container}>
            <Header routeName="Login" />
            <ScrollView contentContainerStyle={styles.form}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                <TouchableOpacity style={[styles.button, styles.buttonLogin]} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonRegister]} onPress={handleCreateAccount}>
                    <Text style={styles.buttonText}>Criar conta</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
    },
    form: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 12,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10
    },
    buttonLogin: {
        backgroundColor: '#007bff',
    },
    buttonRegister: {
        backgroundColor: '#40a823',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default LoginScreen;