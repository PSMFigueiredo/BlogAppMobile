import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import Header from "../components/Header/header";
import { useEffect, useState } from "react";
import RadioButton from "../components/RadioButton/RadioButton";
import { createProfessorApi, createStudentApi, getProfessorByUserApi, getStudentByUserApi, updateProfessorApi, updateStudentApi } from "../services/apiFunctions";
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

const CreateStudentScreen: React.FC = ({ navigation, route}) => {
    const item: Student|undefined = route?.params?.item;
    dayjs.extend(utc)
    dayjs.extend(timezone)
    dayjs().locale('pt-br').format()
    dayjs.tz.setDefault("America/Sao_Paulo");

    const [registerNumber, setRegisterNumber] = useState<string>('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState<Date | string | Dayjs>(dayjs());
    const [password, setPassword] = useState('');
    const { auth } = useAuth();

    const [showPicker, setShowPicker] = useState(false);
    const toggleShowPicker = () => {
        setShowPicker(!showPicker);
    }

    const anyDateToBrazilianDate = (rawDate: string) => {
        let date = new Date(rawDate);
        return date.toLocaleDateString('pt-BR', { dateStyle: 'short'});
    }

    const atualizarAluno = () => {
        if (item) {
            setRegisterNumber(item.ra);
            setName(item.user.name);
            setEmail(item.user.email);
            if(item.birthDate.length == 10) {
                const [dia, mes, ano ] = item.birthDate.split("/");
                const dataNasc = dayjs(`${ano}-${mes}-${dia}`);
                setBirthDate(dataNasc);
            }else{
                const dataNasc = dayjs(item.birthDate);
                setBirthDate(dataNasc);
            }
        }
    }

    useEffect(() => {
        atualizarAluno();
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
            if (registerNumber == '' || registerNumber == undefined || registerNumber == null) {
                alert("Preencha o campo: Nº de registro");
            }
            if (item) {
                updateStudentApi(item.id, {
                    ra: registerNumber,
                    birthDate: birthDate,
                    name: name,
                    email: email,
                    password: password
                }).then((result) => {
                    alert(`Aluno atualizado com sucesso!`);
                    navigation.navigate('Alunos');
                }).catch((error) => {
                    alert("Não foi possível atualizar o cadastro de aluno");
                })
            }else{
                createStudentApi({
                    ra: registerNumber,
                    birthDate: birthDate,
                    name: name,
                    email: email,
                    password: password
                }).then((result) => {
                    alert(`Aluno cadastrado com sucesso!`);
                    navigation.navigate('Alunos');
                }).catch((error) => {
                    alert("Não foi possível cadastrar o aluno");
                })
            }
    };


    return (
        <View style={styles.container}>
            <Header/>
            <ScrollView contentContainerStyle={styles.main}>
                <Text style={styles.label}>RA</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"RA"}
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
                <View>
                        <Text style={styles.label}>Data de nascimento:</Text>
                        <View style={styles.datePickerInputContainer}>
                            <TextInput
                                style={[styles.input, styles.inputPicker]}
                                placeholder="Data de nascimento"
                                value={anyDateToBrazilianDate(birthDate.toString())}
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
                                date={birthDate.toString()}
                                onChange={(params) => setBirthDate(params.date)}
                                locale="pt-br"
                                displayFullDays={true}
                                maxDate={dayjs()}
                            />
                        )}

                    </View>
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

export default CreateStudentScreen;