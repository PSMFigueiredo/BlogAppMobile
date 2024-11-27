import { useState } from "react";
import axios from "axios";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import Header from "../components/Header/header";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Importando o tipo de navegação
import { useAuth } from "../Context/authContext"; // Importando o contexto de autenticação
import { RootStackParamList } from "../types/navigation"; // Supondo que você tenha esse arquivo com a definição de tipos

// Tipando a prop navigation
type CreatePostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreatePostScreen'>;

interface Props {
    navigation: CreatePostScreenNavigationProp;
}

const CreatePostScreen: React.FC<Props> = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('1'); // ID fixo de autor para teste, no futuro deve ser pego do contexto
    const { auth } = useAuth(); // Obtendo o autor a partir do contexto de autenticação (usuário logado)

    const isFormValid = () => {
        if (!title.trim()) {
            alert('Por favor, preencha o campo título');
            return false;
        }
        if (!content.trim()) {
            alert('Por favor, preencha o campo conteúdo');
            return false;
        }
        if (!author.trim()) {
            alert('Por favor, preencha o campo Autor');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!isFormValid()) {
            return;
        }

        try {
            const postData = {
                title,
                body: content,
                userId: author, // O ID do autor aqui está fixo para teste, mas você pode usar auth.userId quando integrar com backend
            };

            // Enviar dados para o backend real (por enquanto usando jsonplaceholder)
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);

            console.log('Post criado com sucesso:', response.data);
            Alert.alert('Sucesso', 'Post criado com sucesso!');
            navigation.navigate('PostList');
        } catch (error) {
            console.error('Erro ao criar post:', error);
            Alert.alert('Erro', 'Erro ao criar o post. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Header />
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
                numberOfLines={4}
            />
            <Text style={styles.label}>Autor (ID)</Text>
            <TextInput
                style={styles.input}
                placeholder="ID do Autor"
                value={author}
                onChangeText={setAuthor}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Criar Post</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
});

export default CreatePostScreen;
