import { NavigationContainer } from "@react-navigation/native";
import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";
import DrawerRoutes from "./drawer.routes";
import { useAuth } from "../Context/authContext";

export default function Routes() {
    const { auth } = useAuth();
    
    return (
        <NavigationContainer independent={true}>
            < StackRoutes />
        </NavigationContainer >
    )
}