import { useEffect, useState } from "react";
import axios from "axios";
import { Text, TouchableOpacity, View, FlatList, StyleSheet, ListRenderItem, Alert } from "react-native";
import PostDetailScreen from "./PostDetailScreen";
import Header from "../components/Header/header";
import { MaterialIcons } from '@expo/vector-icons'
import { useAuth } from "../Context/authContext";
import { deletePostApi, getPostsAdminApi, getPostsApi } from "../services/apiFunctions";
import { PostListProps } from "../types/postList";
import { Post } from "../types/types-post";
import { TextInput } from "react-native-gesture-handler";

const PostList = ({ navigation }) => {
    const [posts, setPosts] = useState<Post[] | []>([]);
    const { auth, setAuth } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [filteredPosts, setFilteredPosts] = useState<Post[] | []>([]);
    const [data, setData] = useState<Post[] | []>(posts.slice(0, 1));
    const [searchTerm, setSearchTerm] = useState('');
    const [loadPosts, setLoadPosts] = useState<boolean>(true);

    const fetchPosts = async () => {
        if (auth) {
            if (auth.user.role == "PROFESSOR") {
                getPostsAdminApi(auth.token).then((result) => {
                    const postsResponse: Post[] = result.data.posts.map((post: Post) => {
                        return (
                            {
                                id: post.id,
                                title: post.title,
                                content: post.content,
                                author: {
                                    id: post.author.id,
                                    name: post.author.name,
                                    email: post.author.email
                                },
                                class: {
                                    id: post.class.id,
                                    name: post.class.name
                                },
                                published: post.published
                            }
                        )
                    });
                    setPosts(postsResponse.reverse());
                }).catch((error) => {
                    Alert.alert("Erro", "Erro ao buscar posts");
                });
            } else {
                getPostsApi(auth.token).then((result) => {
                    const postsResponse: Post[] = result.data.posts.map((post: Post) => {
                        return (
                            {
                                id: post.id,
                                title: post.title,
                                content: post.content,
                                author: {
                                    id: post.author.id,
                                    name: post.author.name,
                                    email: post.author.email
                                },
                                class: {
                                    id: post.class.id,
                                    name: post.class.name
                                },
                                published: true
                            }
                        )
                    });
                    setPosts(postsResponse.reverse());
                }).catch((error) => {
                    Alert.alert("Erro", "Erro ao buscar posts");
                });
            }

        }
    };

    const renderItem: ListRenderItem<Post> = ({ item }) => (
        <View style={styles.postItem}>
            <TouchableOpacity
                style={styles.postCard}
                onPress={() => navigation.navigate('Ver Post', { item: item })}
            >
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postContent}>{item.content.length > 80 ? `${item.content.substring(0, 80)}...` : item.content}</Text>
                <Text style={styles.postAuthor}>Autor: {item.author.name}</Text>
                <Text style={styles.postAuthor}>Turma: {item.class.name}</Text>
            </TouchableOpacity>

            {auth && auth.user.role == "PROFESSOR" &&
                <View style={styles.actionBar}>
                    <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={() => navigation.navigate('Criar Post', { item: item })}
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
        if (loading) return

        setLoading(true);
        const lista = searchTerm ? filteredPosts : posts;
        const newData = posts.slice(data.length, data.length + 1);
        setTimeout(() => {
            setData([...data, ...newData]);
            setLoading(false);
        }, 1000);
    }


    useEffect(() => {
        const results = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(results);
    }, [searchTerm]);

    useEffect(() => {
        fetchPosts()
    });

    const handleDelete = (postId: string) => {
        if (auth) {
            deletePostApi(postId, auth.token).then((result) => {
                if (result.data.postId) {
                    Alert.alert("Sucesso", "Post deletado com sucesso!");
                }
            }).catch((error) => {
                Alert.alert("Erro", "Erro ao deletar post");
            });
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.main}>

                {
                    auth && auth.user.role == "PROFESSOR" ?
                        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('Criar Post')}>
                            <Text style={styles.createButtonText}>Criar novo post</Text>
                        </TouchableOpacity>
                        : null
                }

                <View style={styles.containerBuscar}>
                    <TextInput
                        style={styles.buscar}
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>

                <FlatList
                    data={searchTerm ? filteredPosts : posts}
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
    },
    containerBuscar: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    buscar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 12,
        width: "100%",
    }
});

export default PostList