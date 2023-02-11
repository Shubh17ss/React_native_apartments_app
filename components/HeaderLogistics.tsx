import { Styles ,Text} from "@ui-kitten/components"
import {View , TouchableOpacity, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react"
import { HEADERHEIGHT, LISTMARGIN } from "../constants"
import { theme } from "../theme"
import { useNavigation } from "@react-navigation/native";


export const HeaderLogistics=({mapShown, setMapShown}:{mapShown:boolean,
    setMapShown:(bool:boolean)=>void})=>{
    const navigation=useNavigation();

    const handleMapPressed=()=>{
        navigation.setOptions({tabBarStyle:{display:'flex'}}) 
        if(mapShown) return setMapShown(false);
        setMapShown(true); 
    }

    

    return(
        <View style={[{marginVertical:5, marginHorizontal:LISTMARGIN,
            alignItems:'center',justifyContent:'space-between'},styles.row]}>
               <View style={styles.row}>
                   <MaterialCommunityIcons name='map-marker' size={16} 
                   color={theme['color-primary-500']}/>
                   <Text category={'c1'} appearance={'hint'}
                   >12 Available</Text>
                   <TouchableOpacity onPress={()=>console.log('Save')}>
                       <Text category={'c1'} 
                       style={{
                           color:theme['color-info-300'],
                           fontWeight:'bold',
                           marginLeft:10,
                           
                       }}>
                           Save
                       </Text>
                   </TouchableOpacity>
               </View>

               <View style={styles.row}>
               <TouchableOpacity onPress={()=>console.log('Sort')}>
                       <View style={styles.row}>
                       <MaterialCommunityIcons name='sort' color={theme['color-info-300']} size={16}/>
                       <Text category={'c1'} 
                       style={{
                           color:theme['color-info-300'],
                           fontWeight:'bold',
                           marginLeft:5,
                           
                       }}>
                           Sort
                       </Text>
                       </View>

                   </TouchableOpacity>
                    {mapShown? 
                     (<TouchableOpacity onPress={handleMapPressed}>
                     <View style={[styles.row,{marginLeft:20}]}>
                         <MaterialCommunityIcons name='format-list-bulleted' color={theme['color-info-300']} size={16}/>
                         <Text category={'c1'} 
                         style={{
                             color:theme['color-info-300'],
                             fontWeight:'bold',
                             marginLeft:5,
                             
                         }}>
                            List
                         </Text>
                         </View>
                    </TouchableOpacity>)
                   :
                   (<TouchableOpacity onPress={handleMapPressed}>
                       <View style={[styles.row,{marginLeft:20}]}>
                           <MaterialCommunityIcons name='map-outline' color={theme['color-info-300']} size={16}/>
                           <Text category={'c1'} 
                           style={{
                               color:theme['color-info-300'],
                               fontWeight:'bold',
                               marginLeft:5,
                               
                           }}>
                              Map
                           </Text>
                           </View>
                   </TouchableOpacity>)
                    }           
               </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        position:"absolute",top:0,
        right:0,
        left:0,
        zIndex:1000,
        height:HEADERHEIGHT,
        backgroundColor:"#fff",
    },
    button:{
        borderRadius:30,
        borderColor:'#d3d3d3',
        marginHorizontal:3,
    },
    row:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'

    }
})