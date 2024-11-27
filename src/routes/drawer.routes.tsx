import PostList from "../screens/PostList";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer/CustomDrawer";
import ClassesScreen from "../screens/ClassesScreen";
import { useProfessor } from "../Context/professorContext";
import { useAuth } from "../Context/authContext";
import MyProfileScreen from "../screens/MyProfileScreen";
import ProfessorList from "../screens/ProfessorList";
import StudentList from "../screens/StudentList";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    const { auth } = useAuth();
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen name="Feed" component={PostList} />
            <Drawer.Screen name="Meu Perfil" component={MyProfileScreen} />
            {
                auth && auth.user.role == "PROFESSOR" ? <>
                <Drawer.Screen name="Turmas" component={ClassesScreen} />
                <Drawer.Screen name="Professores" component={ProfessorList} />
                <Drawer.Screen name="Alunos" component={StudentList} />
                </>
                : null
            }
        </Drawer.Navigator>
    )
}