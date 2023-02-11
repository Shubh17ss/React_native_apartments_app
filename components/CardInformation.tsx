import {View, StyleSheet} from "react-native";
import {Text,Button} from '@ui-kitten/components';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {theme} from '../theme';
import { useRef, useState } from "react";
import { Property } from "../types/property";
import { Row } from "./row";


export const CardInformation=({property}:{property:Property})=>{
    return(
        <View style={styles.informationContainer}>

            <View style={styles.rowJustification}>
            <Text category={"s1"}>${property.rentLow.toLocaleString()} - {property.rentHight.toLocaleString()}</Text>
            <MaterialCommunityIcons name="heart-outline" 
            color={theme["color-primary-500"]} size={24}/>
            </View>

            <View>
            <Text category={"c1"}>
                {property.bedroomLow} - {property.bedroomHigh} Beds
            </Text>
            <Text category={"c1"} style={styles.defaultMarginTop}>
                {property.name}
            </Text>
            <Text category={"c1"}>
                {property.street}
            </Text>
            <Text category={"c1"}>
                {property.city}, {property.state}, {property.zip}
            </Text>
            
            <Text category={"c1"} style={styles.defaultMarginTop}>
                {property.tags.map((tag, index)=>index===property.tags.length-1?tag:`${tag}, `)}
            </Text>
            </View>

            <View style={[styles.defaultMarginTop,styles.rowJustification,{flexDirection:'row'}]}>
                <Button 
                appearance={"ghost"}
                style={[styles.button,{borderColor:theme['color-primary-500'],
                }]}
                size="small"
                onPress={()=>console.log('Email the property manager')}>Email
                </Button>
                <Button 
                size="small"
                style={styles.button
                }
                onPress={()=>console.log('Call the property manager')}>Call</Button>
            </View>

        </View>
    )
}

const styles=StyleSheet.create({
    informationContainer:{
           paddingVertical:10, paddingHorizontal:5,
            borderColor:'#d3d3d3',
            borderBottomLeftRadius:5,
            borderBottomRightRadius:5,
            borderWidth:1
    },
    defaultMarginTop:{
        marginTop:5,
    },
    rowJustification:{
        justifyContent:'space-between',
        flexDirection:'row'
    },
    button:{
        width:'49%'
    }
})