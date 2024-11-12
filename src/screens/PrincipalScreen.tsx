// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useAuth } from '../Context/authContext';
// import { getPostsApi, deletePostApi } from '../services/api';
// import { FaEdit, FaTrash } from 'react-icons/fa';
//
// const PostList = () => {
//     const [posts, setPosts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const { professor } = useProf();
//     const { auth } = useAuth();
//     const navigation = useNavigation();
//     const ehProfessor = professor?.role === 'professor';
//
//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await getPostsApi(auth?.token ?? '');
//                 setPosts(response.data?.posts ?? []);
//             } catch (error) {
//                 console.error('Erro ao buscar posts:', error);
//             }
//         };
//
//         fetchPosts();
//     }, []);
//
//     const deletePost = async (id) => {
//         Alert.alert('Confirmação', 'Você tem certeza que quer excluir esse post?', [
//             {
//                 text: 'Cancelar',
//                 style: 'cancel',
//             },
//             {
//                 text: 'Excluir',
//                 onPress: async () => {
//                     try {
//                         await deletePostApi(id, auth?.token ?? '');
//                         setPosts(posts.filter((post) => post.id !== id));
//                     } catch (error) {
//                         console.error('Erro ao excluir o post:', error);
//                     }
//                 },
//             },
//         ]);
//     };
//
//     const filteredPosts = posts.filter((post) =>
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.author.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//
//     return (
//         <View style={styles.container}>
//             {ehProfessor && (
//                 <View style={styles.adminContainer}>
//                     <Text style={styles.adminTitle}>Página Administrativa</Text>
//                     <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreatePost')}>
//                         <Text style={styles.buttonText}>Criar novo Post</Text>
//                     </TouchableOpacity>
//                 </View>
//             )}
//             <TextInput
//                 style={styles.searchInput}
//                 placeholder="Buscar posts..."
//                 value={searchTerm}
//                 onChangeText={setSearchTerm}
//             />
//             <FlatList
//                 data={filteredPosts}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <View style={styles.card}>
//                         <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: item.id })}>
//                             <Text style={styles.cardTitle}>{item.title}</Text>
//                             <Text style={styles.cardDescription}>{item.content}</Text>
//                             <Text style={styles.cardAuthor}>Autor: {item.author}</Text>
//                             {ehProfessor && (
//                                 <View style={styles.actionsContainer}>
//                                     <TouchableOpacity onPress={() => navigation.navigate('EditPost', { postId: item.id })}>
//                                         <Text style={styles.icon}><FaEdit /></Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity onPress={() => deletePost(item.id)}>
//                                         <Text style={styles.icon}><FaTrash /></Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             )}
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     adminContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 20,
//     },
//     adminTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#191970',
//     },
//     createButton: {
//         backgroundColor: '#007bff',
//         padding: 10,
//         borderRadius: 5,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     searchInput: {
//         height: 40,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 5,
//         marginBottom: 20,
//         paddingHorizontal: 10,
//     },
//     card: {
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     cardTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     cardDescription: {
//         fontSize: 14,
//         color: '#777',
//         marginBottom: 10,
//     },
//     cardAuthor: {
//         fontSize: 14,
//         color: '#555',
//         marginBottom: 10,
//     },
//     actionsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//     },
//     icon: {
//         marginLeft: 10,
//         fontSize: 18,
//         color: '#007bff',
//     },
// });
//
// export default PostList;
