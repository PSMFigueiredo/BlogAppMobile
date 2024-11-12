import {createNativeStackNavigator} from "@react-navigation/native-stack";

const {Navigator, Screen } = createNativeStackNavigator()
export function AppRoutes(){
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="app/screens/Login/index"
                    component={Login}/>
            <Screen name="app/screens/Home/index"
                    component={Home}/>
        </Navigator>
    )
}