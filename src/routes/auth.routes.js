import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// User Screens
import LoginScreen from '../screens/LoginScreen/index.js';
import RegisterScreen from '../screens/RegisterScreen/index.js';

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} options={{ 
                    title: "Register",
                    headerBackTitle: "Retour",
                    // headerStyle: {
                    //     backgroundColor: 'grey',
                    // },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}/>
        </AuthStack.Navigator>
    );
  }
  
  export default AuthRoutes;