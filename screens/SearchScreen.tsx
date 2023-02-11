import {Animated, View} from "react-native";
import { useState , useEffect, useRef} from "react";

import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { LISTMARGIN, HEADERHEIGHT } from "../constants";
import { AnimatedListHeader } from "../components/AnimatedListHeader";
import { Map } from "../components/Map";
import { properties } from "../data/properties";
import { SearchScreenParams } from "../types";
import MapView from "react-native-maps";

export const SearchScreen=({
    route,
}:{route:{params:SearchScreenParams}})=>{

useEffect(()=>{
    if(route.params){
        mapRef.current?.animateCamera({
            center:{
                latitude:Number(route.params.lat),
                longitude:Number(route.params.lon)
            }
        })
    }
},[route])

const [scrollAnimation]=useState(new Animated.Value(0));
const [mapShown, setMapShown]=useState<boolean>(false);
const mapRef=useRef<MapView|null>(null);
    return( 
        <Screen >
         
         <AnimatedListHeader scrollAnimation={scrollAnimation} setMapShown={setMapShown}
         mapShown={mapShown}
         location={route.params ? route.params.location : "Find a location"}/>
           {
             mapShown ?  (<Map properties={properties} mapRef={mapRef}
                          initialRegion={
                            route.params?{
                                latitude:Number(route.params.lat),
                                longitude:Number(route.params.lon),
                                latitudeDelta:0.4,
                                longitudeDelta:0.4,
                            }:undefined
                          }
                            />)
                       
                         : (<Animated.FlatList
                        onScroll={Animated.event([{
                            nativeEvent:{
                                contentOffset:{
                                    y:scrollAnimation,
                                }
                            }
                        }],{useNativeDriver:true})}
                        contentContainerStyle={{paddingTop:HEADERHEIGHT-20}}
                        bounces={false}
                        scrollEventThrottle={16}
                        data={properties}
                        keyExtractor={(item)=>item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item})=>(
                        <Card property={item} style={{marginVertical:5}}/>
                        )}
                        /> )
           }
          
        </Screen>
    );
};