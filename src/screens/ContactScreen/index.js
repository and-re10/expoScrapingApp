import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

// Auth Context
import AuthContext from '../../contexts/auth';

// Fonts
// Font name: rubik 
import { 
  Rubik_300Light,
  Rubik_300Light_Italic,
  Rubik_400Regular,
  Rubik_400Regular_Italic,
  Rubik_500Medium,
  Rubik_500Medium_Italic,
  Rubik_700Bold,
  Rubik_700Bold_Italic,
  Rubik_900Black,
  Rubik_900Black_Italic 
} from '@expo-google-fonts/rubik'
import { useFonts } from "expo-font"

// App Loading
import AppLoading from 'expo-app-loading';

import axios from "axios";

export default function ContactScreen({ navigation }) {

    
    const { user } = useContext(AuthContext);

    const [ products, setProducts ] = useState(null);

    let [fontsLoaded] = useFonts({
        Rubik_300Light,
        Rubik_300Light_Italic,
        Rubik_400Regular,
        Rubik_400Regular_Italic,
        Rubik_500Medium,
        Rubik_500Medium_Italic,
        Rubik_700Bold,
        Rubik_700Bold_Italic,
        Rubik_900Black,
        Rubik_900Black_Italic 
    });

    useEffect(() => {
        async function getAllproducts(){
            const response = await axios.get('https://ba28-2a02-1811-3602-f800-98c0-128a-49dc-1600.ngrok.io/all-products');
            console.log(response.data);
            setProducts(response.data);
        }
        getAllproducts()
    }, []);

    const limitString = (str) => {
        var phrase = str.substr(0, 50) + "..."

        return phrase;
    }
    // "nom":"Santos",
    // "prenom":"André",
    // "email":"andre@test.com",
    // "password":"0123456789",
    // "phone":"0123456789",
    // "contacts":[
    //     {
    //         "nom":"Vieira",
    //         "prenom":"Vanessa",
    //         "email":"vanessa@test.com",
    //         "phone":"0123456789"
    //     }
    // ]

    if (!fontsLoaded){
        return <AppLoading/>
    }

    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <ScrollView contentContainerStyle={{}}>

                <Text style={{marginVertical: 40, marginLeft: 30, fontSize: 40}}>{user.prenom} {user.nom}!</Text>
                <View style={{width: "100%", alignItems: "center", marginBottom: 60, marginTop: 10}}>
                    <View style={{backgroundColor: "lightgrey", borderRadius: 20, paddingHorizontal: 20, paddingVertical: 20, width: "90%", shadowColor: "black",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5}}
                    >
                        <View style={{marginBottom: 15}}>
                            <Text style={{fontWeight: "bold", fontSize: 20}}>Email:</Text>
                            <Text style={{fontSize: 20}}>{user.email}</Text>
                        </View>
                        <View style={{marginBottom: 10}}>
                            <Text style={{fontWeight: "bold", fontSize: 20}}>Password</Text>
                            <Text style={{fontSize: 20}}>********</Text>
                            {/* {user.password} */}
                        </View>
                        <View style={{marginBottom: 10}}>
                            <Text style={{fontWeight: "bold", fontSize: 20}}>Phone</Text>
                            <Text style={{fontSize: 20}}>{user.phone}</Text>
                        </View>
                    </View>
                </View>
                
                
                
                <View style={{width: "100%", minHeight: 400, backgroundColor: "#2a3547", paddingBottom: 70, paddingTop: 35, borderTopLeftRadius: 50, borderTopRightRadius: 50, margin: 0, alignItems: "center"}}>
                    <Text style={{width: "85%", fontSize: 50, color: "white", marginBottom: 50, fontFamily: "Rubik_500Medium"}}>My Products</Text>
                    <View style={{width: "100%", paddingHorizontal: 20, flexDirection: "row"}}>
                        <View style={{width: "50%"}}>
                            {user?.contacts.map((contact, i) => {
                                return (
                                    <TouchableOpacity key={i} style={{width: "90%", paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20, marginHorizontal: 10, marginVertical: 5, backgroundColor: "lightgrey", shadowColor: "white",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,

                                        elevation: 5}}
                                    >
                                        <Text style={{color: "black", fontSize: 20, fontWeight: "bold", marginBottom: 15}}>{contact.prenom} {contact.nom}</Text>
                                        <Text style={{color: "black", marginBottom: 15}}>{contact.email}</Text>
                                        <Text style={{color: "black"}}>{contact.phone}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                            {products?.map((elem, i) => {
                                if(i%2 !== 0){
                                    return (
                                        <TouchableOpacity key={i} style={{width: "90%", alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20, marginHorizontal: 10, marginVertical: 5, backgroundColor: "lightgrey", shadowColor: "white",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,

                                            elevation: 5}}
                                            onPress={() => {
                                                navigation.navigate("Product", {
                                                    description: elem.description,
                                                    image: elem.image,
                                                    prix: elem.prix
                                                })
                                            }}
                                        >
                                            <Image source={{uri: elem.image}} style={{height: 100, width: "100%", borderRadius: 40, marginBottom: 20, backgroundColor: "white"}} />
                                            <Text style={{color: "black", fontSize: 15, fontWeight: "bold", marginBottom: 15}}>{limitString(elem.description)}</Text>
                                            <Text style={{color: "black"}}>{elem.prix} €</Text>
                                            {/* <img className="w-100" src={elem.image} alt="img product"/>
                                            <h3 className="w-100" style={{fontSize: 12, color: "white",  wordBreak: 'break-all'}}>{elem.prix}</h3>
                                            <h4 className="w-100" style={{fontSize: 10, color: "white",  wordBreak: 'break-all'}}>{elem.description}</h4> */}

                                            {/* <Text style={{color: "black", fontSize: 20, fontWeight: "bold", marginBottom: 15}}>{contact.prenom} {contact.nom}</Text>
                                            <Text style={{color: "black", marginBottom: 15}}>{contact.email}</Text>
                                            <Text style={{color: "black"}}>{contact.phone}</Text> */}
                                        </TouchableOpacity>
                                    )
                                }
                            })}
                        </View>
                        <View style={{width: "50%"}}>
                            {products?.map((elem, i) => {
                                if(i%2 === 0){
                                    return (
                                        <TouchableOpacity key={i} style={{width: "90%", alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20, marginHorizontal: 10, marginVertical: 5, backgroundColor: "lightgrey", shadowColor: "white",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,

                                            elevation: 5}}
                                            onPress={() => {
                                                navigation.navigate("Product", {
                                                    description: elem.description,
                                                    image: elem.image,
                                                    prix: elem.prix
                                                })
                                            }}
                                        >
                                            <Image source={{uri: elem.image}} style={{height: 100, width: "100%", borderRadius: 40, marginBottom: 20, backgroundColor: "white"}} />
                                            <Text style={{color: "black", fontSize: 15, fontWeight: "bold", marginBottom: 15}}>{limitString(elem.description)}</Text>
                                            <Text style={{color: "black"}}>{elem.prix} €</Text>
                                            {/* <img className="w-100" src={elem.image} alt="img product"/>
                                            <h3 className="w-100" style={{fontSize: 12, color: "white",  wordBreak: 'break-all'}}>{elem.prix}</h3>
                                            <h4 className="w-100" style={{fontSize: 10, color: "white",  wordBreak: 'break-all'}}>{elem.description}</h4> */}

                                            {/* <Text style={{color: "black", fontSize: 20, fontWeight: "bold", marginBottom: 15}}>{contact.prenom} {contact.nom}</Text>
                                            <Text style={{color: "black", marginBottom: 15}}>{contact.email}</Text>
                                            <Text style={{color: "black"}}>{contact.phone}</Text> */}
                                        </TouchableOpacity>
                                    )
                                }
                            })}
                        </View>
                        
                        
                    </View>
                </View>
                
                
                {/* <TouchableOpacity>
                    <Text>Back</Text>
                </TouchableOpacity> */}
            </ScrollView>
        </View>
    )
}
