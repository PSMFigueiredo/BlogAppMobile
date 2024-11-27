import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Definindo os tipos de rotas
export type RootStackParamList = {
    PostList: undefined;
    PostDetailScreen: { postId: number };
    CreatePostScreen: undefined;
    EditPostScreen: { postId: number }; // Defina o tipo para o parâmetro postId na tela EditPostScreen
    Login: undefined;  // Não há parâmetros para a tela de Login\
};

export type EditPostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditPostScreen'>;
export type EditPostScreenRouteProp = RouteProp<RootStackParamList, 'EditPostScreen'>;
