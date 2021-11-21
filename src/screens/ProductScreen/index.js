import React, { useRef } from 'react'
import { View, Text, Image, ScrollView, ImageBackground, Animated, StyleSheet } from 'react-native'

export default function ProductScreen({ navigation, route}) {

    const { description, image, prix } = route.params

    const scrollA = useRef(new Animated.Value(0)).current;

    return (
        <View style={{backgroundColor: "white"}}>
            <Animated.ScrollView contentContainerStyle={{}} 
                // onScroll={(e) => {
                //     console.log(e.nativeEvent.contentOffset.y)
                // }}
                onScroll={Animated.event(
                    [{ 
                        nativeEvent: {
                            contentOffset: {
                                y: scrollA
                            }
                        }
                    }], 
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                <View style={styles.bannerContainer}>
                    <Animated.Image source={{uri: image}} style={styles.banner(scrollA)}/>
                </View>
                <View style={{alignItems: "center", minHeight: 400, width: "100%", position: "relative", backgroundColor: "#2a3547", paddingBottom: 50, opacity: 0.9}}>
                        <Text style={{color: "white", zIndex: 3,fontSize: 30, fontWeight: "bold", width: "80%", marginVertical: 20}}>{prix} €</Text>
                        <Text style={{width: "80%", color: "white", fontSize: 20, zIndex: 3}}><Text style={{fontWeight: "bold"}}>Description:</Text> {description}</Text>
                        {/* <Text style={{fontSize: 20, width: "80%", zIndex: 3}}>Nullam sagittis. Ut a nisl id ante tempus hendrerit. Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Phasellus viverra nulla ut metus varius laoreet.

                        Sed hendrerit. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Quisque id odio. Nulla consequat massa quis enim. Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi.

                        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. Nunc nec neque. Fusce a quam. Aliquam erat volutpat. Praesent turpis.

                        Suspendisse potenti. Aenean massa. Suspendisse potenti. Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci.

                        Ut non enim eleifend felis pretium feugiat. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Duis vel nibh at velit scelerisque suscipit. Nullam cursus lacinia erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus.</Text> */}
                    <View style={{position: "absolute", backgroundColor: "#2a3547", borderTopLeftRadius: 60, borderTopRightRadius: 60, height: "100%", width: "100%", top: -80, left: 0, alignItems: "center", opacity: 1}}>
                        
                    </View>
                        
                </View>
            </Animated.ScrollView>
        </View>

        // <View style={{flex: 1}}>
            
        //     <ScrollView contentContainerStyle={{flex: 1, position: "relative", zIndex: 3}}>
        //     <ImageBackground
        //         source={{uri: image}}
        //         style={{width: '100%', height: '80%', zIndex: 0}}
        //         > 
        //             <Text>....yourContent...</Text>
        //     </ImageBackground>
        //         {/* <View style={{height: "40%", width: "100%", position: "absolute", zIndex: 1}}>
        //             <Image source={{uri: image}} style={{height: "100%", width: "100%", borderRadius: 40, marginBottom: 20, backgroundColor: "white"}} />
        //         </View> */}
        //         <View style={{height: "60%", width: "100%", backgroundColor: "#2a3547", borderTopLeftRadius: 60, borderTopRightRadius: 60, justifyContent: "center", alignItems: "center", position: "absolute", bottom: 0}}>
        //             <Text style={{color: "white"}}>Product Screen</Text>
        //             <Text style={{color: "white"}}>{description}</Text>
        //             <Text style={{color: "white"}}>{image}</Text>
        //             <Text style={{color: "white"}}>{prix}</Text> 
        //         </View>
        //     </ScrollView>
        // </View>
    )
}

const styles = {
    bannerContainer: {
        marginTop: -1000,
        paddingTop: 1000,
        alignItems: "center",
        overflow: "hidden", 
    },
    banner: scrollA => ({
        height: 410, 
        width: "100%", 
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-410, 0, 410, 410 + 1],
                    outputRange: [-410/2, 0, 410*0.75, 410*0.75]
                })
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-400, 0, 400, 400 + 1],
                    outputRange: [2, 1, 0.5, 0.5]
                })
            }
        ]
    })
}
