import { useEffect, useState } from "react";
import axios from "axios";
import { Text, TouchableOpacity, View, FlatList, StyleSheet, ListRenderItem } from "react-native";
import PostDetailScreen from "./PostDetailScreen";
import Header from "../components/Header/header";
import { MaterialIcons } from '@expo/vector-icons'
import { useAuth } from "../Context/authContext";
import { deletePostApi, deleteStudentApi, getPostsAdminApi, getPostsApi, getStudentsApi } from "../services/apiFunctions";
import { PostListProps } from "../types/postList";
import { Post } from "../types/types-post";
import { Student } from "../types/Student";

const StudentList = ({ navigation }) => {
    const [students, setStudents] = useState<Student[] | []>([]);
    const { auth, setAuth } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Student[] | []>(students.slice(0, 1));

    const fetchPosts = async () => {
        if (auth) {
            if(auth.user.role == "PROFESSOR"){
                getStudentsApi(auth.token).then((result) => {
                    const studentsResponse: Student[] = result.data.students.map((student: Student) => {
                        return (
                            {
                                id: student.id,
                                ra: student.ra,
                                birthDate: student.birthDate,
                                user: {
                                    id: student.user.id,
                                    name: student.user.name,
                                    email: student.user.email
                                }
                            }
                        )
                    });
                    setStudents(studentsResponse);
                }).catch((error) => {
                    alert("Erro ao buscar alunos");
                });
            }
        }
    };

    const renderItem: ListRenderItem<Student> = ({ item }) => (
        <View style={styles.postItem}>
            <TouchableOpacity
                style={styles.postCard}
                onPress={() => navigation.navigate('Criar Aluno', { item: item })}
            >
                <Text style={styles.postTitle}>{item.user.name}</Text>
                <Text style={styles.postContent}>{item.ra}</Text>
                <Text style={styles.postContent}>{item.user.email}</Text>
            </TouchableOpacity>

            {auth && auth.user.role == "PROFESSOR" &&
                <View style={styles.actionBar}>
                    <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={() => navigation.navigate('Criar Aluno', { item: item })}
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
    )

    const loadMoreData = () => {
        if(loading) return

        setLoading(true);
        const newData = students.slice(data.length, data.length + 1);
        setTimeout(() => {
            setData([...data, ...newData]);
            setLoading(false);
        }, 1000);
    }

    useEffect(() => {
        fetchPosts()
    });

    const handleDelete = (studentId: string) => {
        if(auth){
            deleteStudentApi(studentId, auth.token).then((result) => {
                if(result.data.postId){
                    alert("Aluno deletado com sucesso!");
                }
            }).catch((error) => {
                alert("Erro ao deletar aluno");
            });
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.main}>

                {
                    auth && auth.user.role == "PROFESSOR" ?
                        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('Criar Aluno')}>
                            <Text style={styles.createButtonText}>Cadastrar novo aluno</Text>
                        </TouchableOpacity>
                        : null
                }

                <FlatList
                    data={students}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
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
        marginBottom: 16,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#222',
    },
    postContent: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 16,
        color: '#6f6f6f',
    },
    postAuthor: {
        fontSize: 14,
        color: '#888',
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
    deleteButton: {
        backgroundColor: "#ba0606"
    }
});

export default StudentList