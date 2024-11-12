import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen";
import PostList from "./src/screens/PostList";
import PostDetailScreen from "./src/screens/PostDetailScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import EditPostScreen from "./src/screens/EditPostScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (

      <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="PostList" component={PostList} />
              <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
              <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
              <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
          </Stack.Navigator>
      </NavigationContainer>

  );
}

