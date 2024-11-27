import Login from "@/screens/Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name="login" component={Login}/>
        </Tab.Navigator>
    )
}