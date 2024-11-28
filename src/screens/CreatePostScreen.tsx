import { useEffect, useState } from "react";
import axios from "axios";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, Switch, Alert } from "react-native";
import Header from "../components/Header/header";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../Context/authContext";
import { ClassObject } from "../types/ClassObject";
import { createPostApi, editPostApi, getClassesApi, getProfessorByUserApi } from "../services/apiFunctions";
import { useProfessor } from "../Context/professorContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Professor } from "../types/Professor";

const CreatePostScreen = ({ navigation, route }) => {
    const item = route?.params?.item;
    const { auth, setAuth } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('1');//author id fixo para teste
    const [turma, setTurma] = useState();
    const [turmas, setTurmas] = useState<ClassObject[]>([]);
    const [published, setPublished] = useState<boolean>(false);
    const [professor, setProfessor] = useState<Professor | undefined>();

    const toggleSwitch = () => {
        setPublished(!published);
    }

    useEffect(() => {
        if (auth && !item) {
            setAuthor(auth.user.name);
        }
    }, [auth]);

    const carregarDadosProfessor = () => {
        if(auth){
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
                Alert.alert("Erro", "Erro ao buscar dados");
            });
        }
    };

    const fetchTurmas = () => {
        if (auth) {
            getClassesApi(auth.token).then((result) => {
                const turmasResponse = result.data.classes;
                setTurmas(turmasResponse);
            }).catch((error) => {
                Alert.alert("Error", "Erro ao buscar turmas");
            });
        }
    };
    
    const atualizarPost = () => {
        if (item) {
            setTitle(item.title);
            setContent(item.content);
            setTurma(item.class.id);
            setPublished(item.published);
            setAuthor(item.author.name);
        }
    }
    
    useEffect(() => {
        fetchTurmas();
        carregarDadosProfessor();
        atualizarPost();
    }, []);


    const isFormValid = () => {
        if (!title.trim()) {
            Alert.alert("Aviso", 'Por favor, preencha o campo título');
            return false;
        }
        if (!content.trim()) {
            Alert.alert("Aviso", 'Por favor, preencha o campo conteúdo');
            return false;
        }
        if (!turma || turma == "vazio") {
            Alert.alert("Aviso", 'Por favor, preencha o campo Turma');
            return false;
        }

        return true;

    }

    const handleSubmit = async () => {
        if (!isFormValid()) {
            return;
        }
        if (auth && professor) {
            if (item) {
                editPostApi(item.id, {
                    classId: turma,
                    title: title,
                    content: content,
                    published: published
                }, auth.token).then((result) => {
                    if (result.data.postId) {
                        Alert.alert("Post atualizado com sucesso!");
                        navigation.navigate("Feed");
                    }
                }).catch((error) => {
                    Alert.alert("Não foi possível atualizar o post")
                });
            } else {
                createPostApi({
                    classId: turma,
                    authorId: professor.id,
                    title: title,
                    content: content,
                    published: published
                }, auth.token).then((result) => {
                    if (result.data.postId) {
                        Alert.alert("Post criado com sucesso!");
                        navigation.navigate("Feed");
                    }
                }).catch((error) => {
                    Alert.alert("Não foi possível criar o post")
                });
            }
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.main}>
                <Text style={styles.label}>Título</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Título do Post"
                    value={title}
                    onChangeText={setTitle}
                />
                <Text style={styles.label}>Conteúdo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Conteúdo do Post"
                    value={content}
                    onChangeText={setContent}
                    multiline
                    numberOfLines={200}
                />
                <Text style={styles.label}>Turma</Text>
                <Picker
                    selectedValue={turma}
                    onValueChange={(itemValue) => setTurma(itemValue)}
                >
                    {
                        turmas ? turmas.map((item) => { return (<Picker.Item label={item.name} value={item.id} key={item.id} />) }) : undefined
                    }
                </Picker>
                <Text style={styles.label}>Autor</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Autor"
                    value={author}
                    onChangeText={setAuthor}
                    editable={false}
                />
                <Text style={styles.label}>Publicar?</Text>
                <View style={styles.swicth}>
                <Switch
                    trackColor={{false: "grey", true: "#007bff"}}
                    onValueChange={toggleSwitch}
                    value={published}
                    thumbColor={"#f4f3f4"}
                />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{item ? "Salvar" : "Criar"} Post</Text>
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
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
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
    swicth:{
        width: "100%",
        flexDirection: "row"
    }
});

export default CreatePostScreen