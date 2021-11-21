import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// User Screens
import HomeScreen from '../screens/HomeScreen/index.js';
import ContactScreen from '../screens/ContactScreen/index.js';
import ProductScreen from '../screens/ProductScreen/index.js';

// Icons
// user
import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const BackButton = () => {
    return (
        <View style={{color: "orange"}}>Return</View>
    )
}

function UserRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
                headerRight: () => (
                    <TouchableOpacity
                    style={{marginRight: 10}}
                      onPress={() => navigation.navigate("Contact")}
                    >
                        <FontAwesome5 name="user" size={28} color="black" solid/>
                    </TouchableOpacity>
                  ),
            })}/>
            <Stack.Screen name="Contact" component={ContactScreen} options={{ 
                title: "Contact",
                headerBackTitle: "Retour",
                // headerStyle: {
                //     backgroundColor: 'grey',
                // },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}/>
            <Stack.Screen name="Product" component={ProductScreen} options={{ 
                    title: "Product",
                    headerBackTitle: "Retour",
                    // headerStyle: {
                    //     backgroundColor: 'grey',
                    // },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}/>
        </Stack.Navigator>
    );
  }
  
  export default UserRoutes;