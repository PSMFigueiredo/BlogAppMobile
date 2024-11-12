import {useEffect, useState} from "react";
import axios from "axios";
import {Text, View, StyleSheet} from "react-native";

const PostDetailScreen = ({ route }) => {
    const {postId} = route.params;
    const [post, setPost] = useState(null);

    const fetchPostDetails = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            setPost(response.data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do Post', error);
        }
    };

    useEffect(() => {
        fetchPostDetails();
    }, []);

    if (!post) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.body}>{post.body}</Text>
            <Text style={styles.author}>Autor ID: {post.userId}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    body: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    author: {
        fontSize: 14,
        color: '#555',
    },
});

export default PostDetailScreen;