import { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header/header";
import { MaterialIcons } from '@expo/vector-icons'

const PostDetailScreen = ({ route }) => {
    const { item } = route.params;

    if (!item) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.main}>
                <View style={styles.profile}>
                    <MaterialIcons name={"person"} size={24} color={"#64748b"} />
                    <View style={styles.headerDisplay}>
                        <Text style={styles.authorLabel}>{"Professor:"}</Text>
                        <Text style={styles.authorName}>{item.author.name}</Text>
                    </View>
                </View>
                <View style={styles.class}>
                    <MaterialIcons name={"group"} size={24} color={"#64748b"} />
                    <View style={styles.headerDisplay}>
                        <Text style={styles.authorLabel}>{"Turma:"}</Text>
                        <Text style={styles.authorName}>{item.class.name}</Text>
                    </View>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.content}</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
    },
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center",
    },
    body: {
        fontSize: 16,
        color: '#333',
        margin: 20,
        textAlign: "justify"
    },
    class: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#ddd",
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        padding: 4,
        marginBottom: 30,
    },
    profile: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#ddd",
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        padding: 4,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    headerDisplay: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: "90%",
    },
    authorLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: "600",
        marginLeft: 10,
    },
    authorName: {
        fontSize: 16,
        color: '#555',
        fontWeight: "600",
        textAlign: "right",
    },
    authorEmail: {
        fontSize: 14,
        color: '#555',
        fontWeight: "600",
    },
});

export default PostDetailScreen;