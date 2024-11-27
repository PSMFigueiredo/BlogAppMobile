import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen";
import PostList from "./src/screens/PostList";
import PostDetailScreen from "./src/screens/PostDetailScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import EditPostScreen from "./src/screens/EditPostScreen";
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import { AuthProvider } from './src/Context/authContext';
import Routes from './src/routes';
import { ProfessorProvider } from './src/Context/professorContext';


const Stack = createNativeStackNavigator();

export default function App() {
    return (

        <AuthProvider>
            <ProfessorProvider>
                <Routes />
            </ProfessorProvider>
        </AuthProvider>

    );
}

