import {useEffect, useState} from "react";
import axios from "axios";
import {Text, TouchableOpacity, View, FlatList, StyleSheet} from "react-native";
import PostDetailScreen from "./PostDetailScreen";
import Header from "../components/Header/header";

const PostList = ({ navigation }) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Erro ao buscar posts', error);
        }
    };

    useEffect(() => {
        fetchPosts()
    }, []);

    return(
        <View style={styles.container}>
            <Header/>
            <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreatePostScreen')}>
                <Text style={styles.createButtonText}>Criar novo post</Text>
            </TouchableOpacity>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postItem}>
                    <TouchableOpacity
                        style={styles.postItem}
                        onPress={() => navigation.navigate('PostDetailScreen', {postId: item.id})}
                        >
                        <Text style={styles.postTitle}>{item.title}</Text>
                        <Text style={styles.postAuthor}>Autor ID: {item.userId}</Text>
                    </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('EditPostScreen', {postId: item.id})}
                            >
                            <Text style={styles.editButtonText}>Editar</Text>
                        </TouchableOpacity>
                    </View>
                )}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    createButton: {
        backgroundColor:'#007bff',
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
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    postAuthor: {
        fontSize: 14,
        color: '#555',
    },
    editButton: {
        backgroundColor: '#28a745',
        padding: 8,
        borderRadius: 5,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default PostList