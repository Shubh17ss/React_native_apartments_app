import React from 'react';
import {Platform, TouchableOpacity,View, StyleSheet} from 'react-native';
import { theme } from '../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

export const HeaderInput=({location}:{location:string})=>{
    const navigation=useNavigation();
     
    return(
        <TouchableOpacity 
        onPress={()=>navigation.navigate("FindLocations")}
        style={Styles.container}>

            <View style={{alignContent:'center', flexDirection:'row'}}>
            <MaterialCommunityIcons name="magnify" color={theme['color-primary-500']}
             size={25}/>
            <Text style={{marginLeft:10, fontSize:18}}>{location}</Text>
            </View>

        </TouchableOpacity>
    );
}

const Styles=StyleSheet.create({
    container:{
                marginTop:Platform.OS==='ios'?50:50,
                borderWidth:1,
                borderColor:'#d3d3d3',
                borderRadius:30,
                padding:10,
            }
})