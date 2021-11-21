import React, { useState, createContext, useEffect } from "react";
import { View, ActivityIndicator, Text, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import authApi from "../api/AuthApi.js";
import jwt_decode from 'jwt-decode';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function loadStorageData(){
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token');
            // console.warn(storagedToken);
            // console.warn(storagedUser);

    //         // await new Promise(resolve => setTimeout(resolve, 2000))
           
            if (storagedUser && storagedToken){
                // authApi.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
            }
        };
        loadStorageData();
    }, []);


    async function signIn(email, password){
        var token = await authApi.post('/login', {
            email: email,
            password: password
        })

        console.warn(token)

        try{
            console.warn(token.data)
            var data = jwt_decode(token.data)
            console.warn(data);
        } catch(err){
            console.error(err);
        }
        
        if (data.user) {
            // await AsyncStorage.setItem('@RNAuth:signed', JSON.stringify(true));
            setUser(data.user);
            await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(data.user));
            await AsyncStorage.setItem('@RNAuth:token', token.data);
        } else {
            Alert.alert("Mot de passe incorrect ou Email non existant");
        }
        




        // await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.famille));
        // await AsyncStorage.setItem('@RNAuth:token', response.data.token);
        // await AsyncStorage.setItem('@RNAuth:role', response.data.famille.role);
    }

    function signOut(){
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    // if (loading){
    //     return (
    //         <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    //             <ActivityIndicator size="large"/>
    //         </View>
    //     );
    // };
    
    return (
        <AuthContext.Provider value={{signed: !!user, user: user, signIn, signOut}}>
            { children }
        </AuthContext.Provider>
    )
    
}

export default AuthContext;