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

const MyProfileScreen: React.FC = ({ navigation }) => {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    dayjs().locale('pt-br').format()
    dayjs.tz.setDefault("America/Sao_Paulo");

    const [registerNumber, setRegisterNumber] = useState<string>('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState<Date | string | Dayjs>(dayjs());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('PROFESSOR');
    const [student, setStudent] = useState<Student | undefined>();
    const { auth } = useAuth();
    const [professor, setProfessor] = useState<Professor | undefined>();

    const carregarDados = () => {
        if (auth) {
            if (auth.user.role == "PROFESSOR") {
                if (professor) {
                    setRegisterNumber(professor.professorNumber)
                    setName(professor.user.name);
                    setEmail(professor.user.email);
                }
            } else {
                if (student) {
                    setRegisterNumber(student.ra)

                    if(student.birthDate.length == 10) {
                        const [dia, mes, ano ] = student.birthDate.split("/");
                        const dataNasc = dayjs(`${ano}-${mes}-${dia}`);
                        setBirthDate(dataNasc);
                    }else{
                        const dataNasc = dayjs(student.birthDate);
                        setBirthDate(dataNasc);
                    }
                    setName(student.user.name);
                    setEmail(student.user.email);
                }
            }
        }
    }

    const carregarDadosEstudante = () => {
        if (auth) {
            getStudentByUserApi(auth.user.id, auth.token).then((result) => {
                const studentResponse: Student = {
                    id: result.data.student.id,
                    ra: result.data.student.ra,
                    birthDate: result.data.student.birthDate,
                    user: {
                        id: result.data.student.user.id,
                        name: result.data.student.user.name,
                        email: result.data.student.user.email
                    }
                }
                setStudent(studentResponse);

            }).catch((error) => {
                alert("Não foi possível carregar os dados");
            });
        }
    }

    const carregarDadosProfessor = () => {
        if (auth) {
            getProfessorByUserApi(auth.user.id, auth.token).then((result) => {
                const professorResponse: Professor = {
                    id: result.data.professor.id,
                    professorNumber: result.data.professor.professorNumber.toString(),
                    user: {
                        id: result.data.professor.user.id,
                        name: result.data.professor.user.name,
                        email: result.data.professor.user.email
                    }
                };
                setProfessor(professorResponse);
            }).catch((error) => {
                alert("Erro ao buscar dados");
            });
        }
    }

    useEffect(() => {
        if (auth && auth.user.role == "PROFESSOR") {
            carregarDadosProfessor();
        } else {
            carregarDadosEstudante();
        }
    }, []);

    useEffect(() => {
        carregarDados();
    }, [professor, student]);

    const [showPicker, setShowPicker] = useState(false);
    const toggleShowPicker = () => {
        setShowPicker(!showPicker);
    }

    const formatDate = (rawDate: string) => {
        let date = new Date(rawDate);
        return date.toLocaleDateString('pt-BR', { dateStyle: 'short' });
    }

    const unformatDate = (rawDate: string) => {
        let dateParts = rawDate.toString().split('/');
        let americanDate = `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`;
        let date = new Date(americanDate);
        return date.toString();
    }


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
            if (professor) {
                updateProfessorApi(professor.id, {
                    professorNumber: registerNumber,
                    name: name,
                    email: email,
                    password: password
                }).then((result) => {
                    alert(`Usuário criado com sucesso! ${result.toString()}`);
                    navigation.navigate('Login');
                }).catch((error) => {
                    alert(error.message);
                })
            }
        } else {
            if (registerNumber == '' || registerNumber == undefined || registerNumber == null) {
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
                alert(error.message);
            })
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.main}>
                <View style={styles.profilePicture}>
                    <MaterialIcons name={"person"} size={140} color={"#64748b"} />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder={auth?.user.role == "PROFESSOR" ? "Nº de registro" : "RA"}
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
                {auth && auth.user.role == "STUDENT" ?
                    <View>
                        <Text style={styles.label}>Data de nascimento:</Text>
                        <View style={styles.datePickerInputContainer}>
                            <TextInput
                                style={[styles.input, styles.inputPicker]}
                                placeholder="Data de nascimento"
                                value={formatDate(birthDate.toString())}
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
                    placeholder="Nova senha"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                <TouchableOpacity style={[styles.button]} onPress={handleUpdateAccount}>
                    <Text style={styles.buttonText}>Salvar</Text>
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

export default MyProfileScreen;