import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import PostList from "../screens/PostList";
import PostDetailScreen from "../screens/PostDetailScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import EditPostScreen from "../screens/EditPostScreen";
import DrawerRoutes from "./drawer.routes";
import CreateClassScreen from "../screens/CreateClassScreen";
import CreateProfessorScreen from "../screens/CreateProfessorScreen";
import CreateStudentScreen from "../screens/CreateStudentScreen";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
            <Stack.Screen name="PostList" component={DrawerRoutes} />
            <Stack.Screen name="Editar Post" component={EditPostScreen} />
            <Stack.Screen name="Criar Post" component={CreatePostScreen} />
            <Stack.Screen name="Criar Turma" component={CreateClassScreen} />
            <Stack.Screen name="Ver Post" component={PostDetailScreen} />
            <Stack.Screen name="Criar Professor" component={CreateProfessorScreen} />
            <Stack.Screen name="Criar Aluno" component={CreateStudentScreen} />
        </Stack.Navigator>
    )
}