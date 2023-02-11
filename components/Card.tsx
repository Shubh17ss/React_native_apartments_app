import {View,  ViewStyle , StyleSheet} from "react-native";
import { Property } from "../types/property";
import { ImageCarousel } from "./ImageCarousel";
import { CardInformation } from "./CardInformation";
import { LISTMARGIN } from "../constants";


export const Card=({property, style}:{property:Property, style?:ViewStyle})=>{
    return(
        
        <View style={[style,{marginTop:15},styles.container]}>
        <ImageCarousel images={property.images}/>
        <CardInformation property={property}/>

      </View>
    );
};

const styles=StyleSheet.create({
  container:{
    marginHorizontal:LISTMARGIN,
    borderRadius:5,
    backgroundColor:'white',
    
  }
})

