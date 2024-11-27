import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Header from '../components/Header/header';
import { EditPostScreenNavigationProp, EditPostScreenRouteProp } from '../types/navigation'; // Importando os tipos corretos

interface EditPostScreenProps {
    navigation: EditPostScreenNavigationProp;
    route: EditPostScreenRouteProp;
}

const EditPostScreen: React.FC<EditPostScreenProps> = ({ route, navigation }) => {
    const { postId } = route.params; // Obtendo o postId da rota
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('1');

    const fetchPostDetails = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const post = response.data;
            setTitle(post.title);
            setContent(post.body);  // Aqui você deve usar 'body' e não 'content'
            setAuthor(post.userId.toString());
        } catch (error) {
            console.error('Erro ao buscar detalhes do post', error);
        }
    };

    useEffect(() => {
        fetchPostDetails();
    }, [postId]);

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        try {
            await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                title,
                body: content, // "body" deve ser utilizado, já que é o campo retornado pela API
                userId: author,
            });

            alert('Post atualizado com sucesso!');
            navigation.navigate('PostList');
        } catch (error) {
            console.error('Erro ao atualizar o post', error);
            alert('Erro ao atualizar o post. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.label}>Título</Text>
            <TextInput
                style={styles.input}
                placeholder="Título do post"
                value={title}
                onChangeText={setTitle}
            />
            <Text style={styles.label}>Conteúdo</Text>
            <TextInput
                style={styles.input}
                placeholder="Conteúdo do post"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={4}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Atualizar Post</Text>
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

export default EditPostScreen;
