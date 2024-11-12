// import {useNavigation} from "@react-navigation/native";
// import {useState} from "react";
// import {Text, TextInput, View} from "react-native";
// import {useAuth} from "../../Context/authContext";
//
// const Login: React.FC = () => {
//     const {auth, isAuthenticated, login } = useAuth();
//     const { getProfessorByUser } = useProf();
//     const navigation = useNavigation();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//
//     const handleLogin = aync () => {
//         try {
//             const firstAuth = await login(email, password);
//
//             if (firstAuth) {
//                 const perfilUsuario = await getProfessorByUser(firstAuth.refreshToken.userId, firstAuth.token);
//
//                 if (isAuthenticated && perfilUsuario) {
//                     navigation.navigate('PostList');
//                     return;
//                 }
//
//                 if (isAuthenticated) {
//                     navigation.navigate('Post')
//                     return;
//                 }
//             } else {
//                 setErrorMessage('Usuario Invalido');
//             }
//         } catch (error) {
//             setErrorMessage('Usuario Invalido');
//         }
//     };
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Login</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={(text) => setEmail(text)}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Senha"
//                 value={password}
//                 onChangeText={(text) => setPassword(text)}
//                 secureTextEntry
//             />
//             {errorMessage ? (
//                 <Text style={styles.errorMessage}>{errorMessage}</Text>
//             ) : null}
//             <TouchableOpacity style={styles.button} onPress={handleLogin}>
//                 <Text style={styles.buttonText}>Login</Text>
//             </TouchableOpacity>
//             <Text style={styles.span}>
//                 Não possui uma conta?{' '}
//                 <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//                     <Text style={styles.createAccountButton}>Registrar-se</Text>
//                 </TouchableOpacity>
//             </Text>
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 36,
//         color: '#191970',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     input: {
//         width: '100%',
//         padding: 10,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 5,
//         marginBottom: 15,
//     },
//     errorMessage: {
//         backgroundColor: '#e8a2a2',
//         color: '#751010',
//         textAlign: 'center',
//         borderRadius: 15px,
//         marginBottom: 20,
//         width: '100%',
//         padding: 10,
//     },
//     button: {
//         backgroundColor: '#6959CD',
//         padding: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//         width: '100%',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18,
//     },
//     span: {
//         marginTop: 15,
//         color: '#333',
//         textAlign: 'center',
//     },
//     createAccountButton: {
//         color: '#6959CD',
//     },
// });
//
// export default Login;
