import { Styles } from "@ui-kitten/components"
import React from "react"
import {FlatList, StyleSheet} from "react-native"
import { Button } from "@ui-kitten/components"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { theme } from "../theme"

export const HeaderFilterButtons=()=>{
    
    const filterButtons=[
        {
            iconName:'filter-variant',
            onPress:()=>console.log('Filter them all'),
        },
        {
            label:'Price',
            onPress:()=>console.log('Price'),
        },
        {
            label:'Beds and Baths',
            onPress:()=>console.log('Beds and Baths'),
        }, 
        {
            label:'Move-in date',
            onPress:()=>console.log('move in date'),
        },
        {
            label:'Pets',
            onPress:()=>console.log('Pets'),
        },

    ];
    
    return(
    <FlatList
             data={filterButtons}
             horizontal
             style={{marginVertical:10}}
             showsHorizontalScrollIndicator={false}
             renderItem={({item,index})=>{
                if(item.iconName){
                    return( <Button 
                    appearance={"ghost"} 
                    style={[{width:48},styles.button]}
                    onPress={item.onPress}
                    accessoryLeft={
                        <MaterialCommunityIcons name={item.iconName as any}
                        size={20}
                        color={theme['color-primary-500']}/>
                    }>
                    </Button>
                    )
                }
                return(
                    <Button 
                            appearance={"ghost"}    
                            style={styles.button} onPress={item.onPress}>
                    {item.label}
                    </Button>
                )
             }}
             keyExtractor={(_,index) =>index.toString()}
            />
    );
}

const styles=StyleSheet.create({
    button:{
        borderRadius:30,
        borderColor:'#d3d3d3',
        marginHorizontal:3,
    },
})