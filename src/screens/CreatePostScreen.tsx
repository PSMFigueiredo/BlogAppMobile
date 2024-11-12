import {useState} from "react";
import axios from "axios";
import {Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import Header from "../components/Header/header";

const CreatePostScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('1');//author id fixo para teste

    const isFormValid = () => {
        if(!title.trim()){
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

}

    const handleSubmit = async () => {
        if (!isFormValid()) {
            return;
        }

        try {
            await axios.post('https://jsonplaceholder.typicode.com/posts', {
                title,
                body: content,
                userId: author,
            });

            alert('Post criado com sucesso!');
            navigation.navigate('PostList');
        } catch (error) {
            console.error('Erro ao criar post', error);
            alert('Erro ao criar o post. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Header/>
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
        backgroundColor:'#007bff',
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

export default CreatePostScreen