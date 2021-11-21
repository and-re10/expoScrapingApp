import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';

//Auth Context
import AuthContext from '../../contexts/auth';

import axios from "axios";

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

  // Peaker Select
//   import RNPickerSelect, { defaultStyles } from 'react-native-picker-select'
  import {Picker} from '@react-native-picker/picker'

export default function HomeScreen({ navigation }) {

    const { signOut } = useContext(AuthContext);
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
        

        getAllproducts();
    }, []);

    // Start Scrape Product

    const [ url, setUrl ] = useState(null);
    const [ magasin, setMagasin ] = useState(null);
    const [ product, setProduct ] = useState(null);

    const magasins = [
        {
          label: 'Amazone',
          value: 'amazone',
        },
        {
          label: 'FootLocker',
          value: 'footlocker',
        }
    ];

    async function getAllproducts(){
        const response = await productsApi.get('/all-products');
        console.log(response.data);
        setProducts(response.data); 
        // console.warn(response.data);
    }

    const scrapeProduct = async () => {
        const response = await productsApi.post('/add-product', {
        ProductURL: url,
        magasin: magasin
        });

        setProduct({
            prix: response.data.prix, 
            img: response.data.image,
            description: response.data.description
        });

        getAllproducts()

        console.warn(response.data)
    }

    // End Scrape Product

    const limitString = (str) => {
        if(str.length >= 50){
            var phrase = str.substr(0, 50) + "...";
            return phrase;
        } else {
            return str
        }
    }

    if (!fontsLoaded){
        return <AppLoading/>
    }

  return (
    <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ alignItems: "center"}}>
        <Text style={{fontSize: 50, marginVertical: 30, fontFamily: "Rubik_500Medium"}}>My Products</Text>
            {/* <View style={{ height: 250, width: "100%" }}> */}
            <ScrollView contentContainerStyle={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                {products?.map((elem, i) => {
                    return (
                        <TouchableOpacity key={i} style={{width: 200, height: 250, alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20, marginHorizontal: 10, marginVertical: 5, backgroundColor: "lightgrey", shadowColor: "white",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5, position: "relative"}}
                            onPress={() => {
                                navigation.navigate("Product", {
                                    description: elem.description,
                                    image: elem.image,
                                    prix: elem.prix
                                })
                            }}
                        >
                            <Image source={{uri: elem.image}} style={{height: 100, width: "100%", borderRadius: 40, marginBottom: 20, backgroundColor: "white"}} />
                            {/* <View style={{height: 60, width: "100%"}}> */}
                                <Text style={{color: "black", fontSize: 15, fontWeight: "bold", marginBottom: 15, alignSelf: "center"}}>{limitString(elem.description)}</Text>
                            {/* </View> */}
                            
                            <Text style={{color: "black", position: "absolute", bottom: "10%", left: "13%"}}>{elem.prix} €</Text>
                            {/* <img className="w-100" src={elem.image} alt="img product"/>
                            <h3 className="w-100" style={{fontSize: 12, color: "white",  wordBreak: 'break-all'}}>{elem.prix}</h3>
                            <h4 className="w-100" style={{fontSize: 10, color: "white",  wordBreak: 'break-all'}}>{elem.description}</h4> */}

                            {/* <Text style={{color: "black", fontSize: 20, fontWeight: "bold", marginBottom: 15}}>{contact.prenom} {contact.nom}</Text>
                            <Text style={{color: "black", marginBottom: 15}}>{contact.email}</Text>
                            <Text style={{color: "black"}}>{contact.phone}</Text> */}
                        </TouchableOpacity>
                    )
                })}
        </ScrollView>
        {/* </View> */}
        
        {/* <TouchableOpacity style={{marginTop: 20, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "grey", borderRadius: 15}} onPress={() => {
            navigation.navigate("Contact")
        }}>
            <Text>Contact Screen</Text>
        </TouchableOpacity> */}

        <View style={{width: "90%", marginVertical: 50, alignItems: "center"}}>
            <Text style={{fontSize: 30, marginBottom: 20, fontFamily: "Rubik_500Medium"}}>Chercher um produit</Text>
            <TextInput 
                autoCapitalize='none' 
                style={{backgroundColor: "lightgrey", height: 55, width: "100%", borderRadius: 15, marginTop: 10, paddingHorizontal: 20, fontSize: 17}} 
                onChangeText={(text) => {
                    setUrl(text.trim());
                }} 
            />
            <Picker
                mode={'dropdown'}
                selectedValue={magasin}
                style={{width: "100%", padding: 0, margin: 0}}
                onValueChange={(value) =>{
                    setMagasin(value);
                    console.log(value);
                }}
            >   
                {magasins.map((magasin, i) => {
                    return <Picker key={i} label={magasin.label} value={magasin.value} />
                })}
                
                {/* <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" /> */}
            </Picker>
            <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "lightgrey", borderRadius: 15}} onPress={() => {
                scrapeProduct();
            }}>
                <Text>Search</Text>
            </TouchableOpacity>
        </View>

        {/* <RNPickerSelect
            placeholder="Magasins"
            items={magasins}
            onValueChange={value => {
              setMagasin(value)
            }}
            InputAccessoryView={() => null}
            style={{height: 40, width: "90%", backgroundColor: "grey"}}
            value={magasin}
          /> */}
        {/* <View style={{width: "100%", position: "relative"}}> */}
            
        {/* </View> */}
        
        <View style={{alignItems: "center", justifyContent: "center", width: "100%"}}>
            {product ?
                ( <TouchableOpacity 
                    style={{width: 200, height: 250, alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20, marginHorizontal: 10, marginVertical: 5, backgroundColor: "lightgrey", shadowColor: "white",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5, position: "relative"}}
                >
                    <Image source={{uri: product.img}} style={{height: 100, width: "100%", borderRadius: 40, marginBottom: 20, backgroundColor: "white"}} />
                    {/* <View style={{height: 60, width: "100%"}}> */}
                        <Text style={{color: "black", fontSize: 15, fontWeight: "bold", marginBottom: 15, alignSelf: "center"}}>{limitString(product.description)}</Text>
                    {/* </View> */}
                    
                    <Text style={{color: "black", position: "absolute", bottom: "10%", left: "13%"}}>{product.prix} €</Text>
                    {/* <img className="w-100" src={elem.image} alt="img product"/>
                    <h3 className="w-100" style={{fontSize: 12, color: "white",  wordBreak: 'break-all'}}>{elem.prix}</h3>
                    <h4 className="w-100" style={{fontSize: 10, color: "white",  wordBreak: 'break-all'}}>{elem.description}</h4> */}

                    {/* <Text style={{color: "black", fontSize: 20, fontWeight: "bold", marginBottom: 15}}>{contact.prenom} {contact.nom}</Text>
                    <Text style={{color: "black", marginBottom: 15}}>{contact.email}</Text>
                    <Text style={{color: "black"}}>{contact.phone}</Text> */}
                </TouchableOpacity> )
                : ( <View></View> )
            }
        </View>

        <TouchableOpacity style={{marginTop: 20, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "grey", borderRadius: 15}} onPress={() => {
            signOut();
        }}>
            <Text>Loguot</Text>
        </TouchableOpacity>
        </ScrollView>
    </View>
  );
}