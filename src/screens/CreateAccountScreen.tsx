import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import Header from "../components/Header/header";
import { useState } from "react";
import RadioButton from "../components/RadioButton/RadioButton";
import { createProfessorApi, createStudentApi } from "../services/apiFunctions";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { MaterialIcons } from '@expo/vector-icons';
import 'dayjs/locale/pt-br';

const CreateAccountScreen: React.FC = ({navigation}) => {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    dayjs().locale('pt-br').format()
    dayjs.tz.setDefault("America/Sao_Paulo");

    const [registerNumber, setRegisterNumber] = useState('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState<Date | string | Dayjs>(dayjs());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('PROFESSOR');

    const [showPicker, setShowPicker] = useState(false);
    const toggleShowPicker = () => {
        setShowPicker(!showPicker);
    }

    const formatDate = (rawDate: string) => {
        let date = new Date(rawDate);
        return date.toLocaleDateString('pt-BR', { dateStyle: 'short'});
    }

    const unformatDate = (rawDate: string) => {
        let dateParts = rawDate.toString().split('/');
        let americanDate = `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`;
        let date = new Date(americanDate);
        return date.toString();
    }


    const handleCreateAccount = () => {
        if(name == '' || name == undefined || name == null){
            alert("Preencha o campo: Nome");
        }
        if(email == '' || email == undefined || email == null){
            alert("Preencha o campo: Email");
        }
        if(password == '' || password == undefined || password == null){
            alert("Preencha o campo: Senha");
        }
        if(role == "PROFESSOR"){
            if(registerNumber == '' || registerNumber == undefined || registerNumber == null) {
                alert("Preencha o campo: Nº de registro");
            }
            createProfessorApi({
                professorNumber: registerNumber,
                name: name,
                email: email,
                password: password
            }).then((result) => {
                alert(`Usuário criado com sucesso!`);
                navigation.navigate('Login');
            }).catch((error) => {
                alert("Não foi possível criar o usuário");
            })
        }else{
            if(registerNumber == '' || registerNumber == undefined || registerNumber == null) {
                alert("Preencha o campo: RA");
            }
            createStudentApi({
                ra: registerNumber,
                name: name,
                birthDate: formatDate(birthDate.toString()),
                email: email,
                password: password
            }).then((result) => {
                alert('Usuário criado com sucesso!');
                navigation.navigate('Login');
            }).catch((error) => {
                alert("Não foi possível criar o usuário");
            })
        }
    };


    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.main}>
                <Text style={styles.title}>Criar conta</Text>
                <Text style={styles.label}>Selecione o tipo de usuário</Text>
                <RadioButton
                    options={[
                        { label: 'Professor', value: 'PROFESSOR' },
                        { label: 'Aluno', value: 'STUDENT' }
                    ]}
                    selectedValue={role}
                    onChange={setRole}
                    style={{ marginBottom: 15 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder={role == "PROFESSOR" ? "Nº de registro" : "RA"}
                    value={registerNumber}
                    onChangeText={(text) => setRegisterNumber(text)}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    autoCapitalize="none"
                />
                {role == "STUDENT" ?
                    <View>
                        <Text style={styles.label}>Data de nascimento:</Text>
                        <View style={styles.datePickerInputContainer}>
                            <TextInput
                                style={[styles.input, styles.inputPicker]}
                                placeholder="Data de nascimento"
                                value={birthDate.toString().length != dayjs().toString().length ? birthDate.toString() : formatDate(birthDate.toString())}
                                autoCapitalize="none"
                                editable={false}
                            />
                            <TouchableOpacity style={styles.datePickerButton} onPress={toggleShowPicker}>
                                <MaterialIcons name="calendar-month" size={32} color={showPicker ? "#06b6d4" : "#64748b"} style={styles.datePickerIcon} />
                            </TouchableOpacity>
                        </View>
                        {showPicker && (
                            <DateTimePicker
                                mode="single"
                                date={birthDate}
                                onChange={(params) => setBirthDate(params.date)}
                                locale="pt-br"
                                displayFullDays={true}
                                maxDate={dayjs()}
                            />
                        )}

                    </View>
                    : null}

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
                <TouchableOpacity style={[styles.button]} onPress={handleCreateAccount}>
                    <Text style={styles.buttonText}>Registrar-se</Text>
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
        justifyContent: 'center',
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
    }
});

export default CreateAccountScreen;