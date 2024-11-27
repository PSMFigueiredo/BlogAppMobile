import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../Context/authContext'; // Importando o contexto de autenticação
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types/navigation"; // Importa a tipagem das rotas
import Header from '../components/Header/header';

// Tipando a propriedade navigation
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp; // Tipando a prop navigation
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Obtendo a função de login do contexto de autenticação

    const handleLogin = async () => {
        try {
            console.log('Iniciando login...'); // Log de depuração
            if (email === 'admin@example.com' && password === '123456') {
                console.log('Credenciais válidas'); // Log para saber se entrou na condição de credenciais corretas

                const authResponse = {
                    token: 'fake-jwt-token',
                    refreshToken: {
                        createdAt: Date.now(),
                        expiresIn: '3600',
                        id: 'fake-refresh-token-id',
                        userId: 'user123',
                    },
                };

                console.log('authResponse:', authResponse); // Verifique a resposta mockada

                // Atualiza o AuthContext com as credenciais mockadas
                await login(email, password); // Verifique se o login foi chamado corretamente

                console.log('Navegando para a tela PostList'); // Verifique se a navegação acontece
                navigation.navigate('PostList');
            } else {
                console.log('Credenciais inválidas');
                Alert.alert('Erro', 'Credenciais inválidas');
            }
        } catch (error) {
            console.error('Erro no login:', error); // Log para capturar qualquer erro que aconteça no bloco try
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login');
        }
    };

    return (
        <View style={styles.container}>
            <Header />
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
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
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default LoginScreen;
