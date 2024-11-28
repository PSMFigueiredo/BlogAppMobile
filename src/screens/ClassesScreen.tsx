import { useEffect, useState } from "react";
import axios from "axios";
import { Text, TouchableOpacity, View, FlatList, StyleSheet, Alert } from "react-native";
import PostDetailScreen from "./PostDetailScreen";
import Header from "../components/Header/header";
import { MaterialIcons } from '@expo/vector-icons'
import { useAuth } from "../Context/authContext";
import { deleteClassApi, getClassesApi } from "../services/apiFunctions";
import { ClassObject } from "../types/ClassObject";

const ClassesScreen = ({ navigation }) => {
    const {auth, setAuth} = useAuth();
    const [turmas, setTurmas] = useState<ClassObject[]>([]);

    const fetchTurmas = () => {
        if(auth){
            getClassesApi(auth.token).then((result) => {
                const turmasResponse = result.data.classes;
                setTurmas(turmasResponse.reverse());
            }).catch((error) => {
                Alert.alert("Erro" + error)
            });
        }
    };

    const handleDelete = (turmaId: string) => {
        if(auth){
            deleteClassApi(turmaId, auth.token).then((result) => {
                if(result.data.classId){
                    Alert.alert("Sucesso", "Turma deletada com sucesso!");
                }
            }).catch((error) => {
                Alert.alert("Error", "Erro ao deletar turma");
            });
        }
    }

    useEffect(() => {
        fetchTurmas();
    });

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('Criar Turma')}>
                    <Text style={styles.createButtonText}>Criar nova turma</Text>
                </TouchableOpacity>
                <FlatList
                    data={turmas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.postItem}>
                            <TouchableOpacity
                                style={styles.postCard}
                                onPress={() => navigation.navigate('Criar Turma', { turma: item })}
                            >
                                <Text style={styles.postTitle}>{item.name}</Text>
                            </TouchableOpacity>

                            {auth && auth.user.role == "PROFESSOR" &&
                            <View style={styles.actionBar}>
                                <TouchableOpacity
                                    style={[styles.button, styles.editButton]}
                                    onPress={() => navigation.navigate('Criar Turma', { turma: item })}
                                >
                                    <MaterialIcons name={'edit-note'} size={24} color={"#fff"} />
                                    <Text style={styles.buttonText}>Editar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, styles.deleteButton]}
                                    onPress={() => handleDelete(item.id)}
                                >
                                    <MaterialIcons name={'delete'} size={24} color={"#fff"} />
                                    <Text style={styles.buttonText}>Deletar</Text>
                                </TouchableOpacity>
                            </View>
                            }
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
    },
    main: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    createButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    postItem: {
        padding: 20,
        marginVertical: 8,
        backgroundColor: '#eee',
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#aaa'
    },
    postCard: {
        padding: 20,
        marginVertical: 8,
        backgroundColor: '#eee',
        borderRadius: 8,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
    },
    postAuthor: {
        fontSize: 14,
        color: '#777',
    },
    actionBar: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        paddingVertical: 6,
        borderRadius: 15,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "25%",
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: "center",
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: '#28a745',
    },
    addButton: {
        backgroundColor: '#007bff',
    },
    deleteButton: {
        backgroundColor: "#ba0606"
    },
});

export default ClassesScreen