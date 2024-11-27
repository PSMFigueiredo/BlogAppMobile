import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import Header from "../components/Header/header";
import { useEffect, useState } from "react";
import RadioButton from "../components/RadioButton/RadioButton";
import { createProfessorApi, createStudentApi, getProfessorByUserApi, getStudentByUserApi, updateProfessorApi } from "../services/apiFunctions";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { MaterialIcons } from '@expo/vector-icons';
import 'dayjs/locale/pt-br';
import { useAuth } from "../Context/authContext";
import { Student } from "../types/Student";
import { useProfessor } from "../Context/professorContext";
import { Professor } from "../types/Professor";

const CreateProfessorScreen: React.FC = ({ navigation, route}) => {
    const item: Professor|undefined = route?.params?.item;
    

    const [registerNumber, setRegisterNumber] = useState<string>('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth } = useAuth();

    const atualizarProfessor = () => {
        if (item) {
            setRegisterNumber(item.professorNumber);
            setName(item.user.name);
            setEmail(item.user.email);
        }
    }

    useEffect(() => {
        atualizarProfessor();
    }, []);

    const handleUpdateAccount = () => {
        if (name == '' || name == undefined || name == null) {
            alert("Preencha o campo: Nome");
        }
        if (email == '' || email == undefined || email == null) {
            alert("Preencha o campo: Email");
        }
        if (password == '' || password == undefined || password == null) {
            alert("Preencha o campo: Senha");
        }
        if (auth?.user.role == "PROFESSOR") {
            if (registerNumber == '' || registerNumber == undefined || registerNumber == null) {
                alert("Preencha o campo: Nº de registro");
            }
            if (item) {
                updateProfessorApi(item.id, {
                    professorNumber: registerNumber,
                    name: name,
                    email: email,
                    password: password
                }).then((result) => {
                    alert(`Professor atualizado com sucesso!`);
                    navigation.navigate('Professores');
                }).catch((error) => {
                    alert("Não foi possível atualizar o cadastro de professor");
                })
            }else{
                createProfessorApi({
                    professorNumber: registerNumber,
                    name: name,
                    email: email,
                    password: password
                }).then((result) => {
                    alert(`Professor cadastrado com sucesso!`);
                    navigation.navigate('Professores');
                }).catch((error) => {
                    alert("Não foi possível cadastrar o professor");
                })
            }
        }
    };


    return (
        <View style={styles.container}>
            <Header/>
            <ScrollView contentContainerStyle={styles.main}>
                <Text style={styles.label}>Nº de registro</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Nº de registro"}
                    value={registerNumber}
                    onChangeText={(text) => setRegisterNumber(text)}
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <Text style={styles.label}>{item ? "Nova senha" : "Senha"}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={item ? "Nova senha" : "Senha"}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                <TouchableOpacity style={[styles.button]} onPress={handleUpdateAccount}>
                    <Text style={styles.buttonText}>{item ? "Salvar" : "Cadastrar"}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
    },
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 16
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
    inputPicker: {
        width: '90%',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#007bff',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    label: {
        marginBottom: 10
    },
    datePickerButton: {
        paddingHorizontal: 5
    },
    datePickerInputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    datePickerIcon: {
        marginBottom: 15
    },
    profilePicture: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center"
    }
});

export default CreateProfessorScreen;