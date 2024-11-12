import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostItem = ({ post }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>By: {post.author}</Text>
            <Text style={styles.description}>{post.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    author: {
        fontSize: 14,
        color: '#555',
    },
    description: {
        fontSize: 14,
        color: '#777',
    },
});

export default PostItem;
