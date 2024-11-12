// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
// import PostItem from '../components/PostItem';
// import { getPosts } from '../services/api';
//
// const HomeScreen = () => {
//     const [posts, setPosts] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//
//     useEffect(() => {
//         fetchPosts();
//     }, []);
//
//     const fetchPosts = async () => {
//         const data = await getPosts();
//         setPosts(data);
//     };
//
//     const filteredPosts = posts.filter(post =>
//         post.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//
//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.searchBar}
//                 placeholder="Search posts..."
//                 value={searchQuery}
//                 onChangeText={setSearchQuery}
//             />
//             <FlatList
//                 data={filteredPosts}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => <PostItem post={item} />}
//             />
//         </View>
//     );
// };
//
// const screenHeight = Dimensions.get('window').height;
// const screenWidth = Dimensions.get('window').width;
//
//
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     searchBar: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 20,
//         paddingHorizontal: 8,
//     },
// });
//
// export default HomeScreen;
