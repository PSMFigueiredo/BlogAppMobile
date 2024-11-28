import { useEffect, useState } from "react";
import axios from "axios";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, Alert } from "react-native";
import Header from "../components/Header/header";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../Context/authContext";
import { createClassApi, editClassApi } from "../services/apiFunctions";

const CreateClassScreen = ({ navigation, route }) => {
    const item = route?.params?.turma;
    const { auth, setAuth } = useAuth();
    const [name, setName] = useState('');

    const atualizarTurma = () => {
        if(item){
            setName(item.name);
        }
    }

    useEffect(() => {
        atualizarTurma();
    }, []);

    const isFormValid = () => {
        if (!name.trim()) {
            Alert.alert("Aviso", 'Por favor, preencha o campo nome');
            return false;
        }

        return true;
    }

    const handleSubmit = async () => {
        if (!isFormValid()) {
            return;
        }
        if (auth) {
            item ? 
            editClassApi(item.id, {
                name: name,
            }, auth.token).then((result) => {
                Alert.alert("Sucesso", "Turma editada com sucesso!");
                navigation.navigate("Turmas");
            }).catch((error) => {
                Alert.alert("Erro", "Erro ao editar turma");
            })
            :
            createClassApi({
                name: name,
            }, auth.token).then((result) => {
                Alert.alert("Sucesso", "Turma criada com sucesso!");
                navigation.navigate("Turmas");
            }).catch((error) => {
                Alert.alert("Erro", "Erro ao criar turma");
            });
        }

    };

    return (
        <View style={styles.container}>
            <Header/>
            <ScrollView contentContainerStyle={styles.main}>

                <Text style={styles.title}>{item ? "Editar" : "Criar"} Turma</Text>
                <Text style={styles.label}>Nome da turma</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome da turma"
                    value={name}
                    onChangeText={setName}
                />
                
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{item ? "Salvar" : "Criar"}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        marginBottom: 10
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
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CreateClassScreen