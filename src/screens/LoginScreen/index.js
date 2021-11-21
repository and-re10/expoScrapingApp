import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

// Auth Context
import AuthContext from '../../contexts/auth.js'

export default function LoginScreen({ navigation }) {

    const { signIn } = useContext(AuthContext);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            {/* <Text>Login Screen</Text> */}
            <View style={{width: "70%"}}>
                <Text>Email</Text>
                <TextInput 
                    autoCapitalize='none' 
                    style={{backgroundColor: "lightgrey", height: 55, width: "100%", borderRadius: 15, marginTop: 10, paddingHorizontal: 20, marginBottom: 15, fontSize: 17}} 
                    onChangeText={(text) => {
                        setEmail(text.trim());
                    }} 
                />
                <Text>Password</Text>
                <TextInput 
                    autoCapitalize='none' 
                    secureTextEntry={true}
                    // keyboardType='numeric'
                    style={{backgroundColor: "lightgrey", height: 55, width: "100%", borderRadius: 15, marginTop: 10, paddingHorizontal: 20, marginBottom: 15, fontSize: 17}} 
                    onChangeText={(text) => {
                        setPassword(text.trim());
                    }} 
                    // placeholderTextColor="white"
                />
            </View>
            <TouchableOpacity style={{marginTop: 20, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "grey", borderRadius: 15}} onPress={() => {
                signIn(email, password); //"andre@test.com", "0123456789"
            }}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 20, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "grey", borderRadius: 15}} onPress={() => {
                navigation.navigate('Register')
            }}>
                <Text>Register</Text>
            </TouchableOpacity>
        </View>
    )
}
