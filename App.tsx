import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types/navigation"; // Certifique-se de que o caminho esteja correto
import PostList from "./src/screens/PostList";
import PostDetailScreen from "./src/screens/PostDetailScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import EditPostScreen from "./src/screens/EditPostScreen";

// Tipo para a navegação de cada tela (usando RootStackParamList)
const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

// Função que define as rotas da aplicação
export function App() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="PostList" component={PostList} />
                <Screen
                    name="PostDetailScreen"
                    component={PostDetailScreen}
                    options={{ title: 'Post Details' }}
                />
                <Screen name="CreatePostScreen" component={CreatePostScreen} />
                <Screen
                    name="EditPostScreen"
                    component={EditPostScreen}
                    options={{ title: 'Edit Post' }}
                />
            </Navigator>
        </NavigationContainer>
    );
}

