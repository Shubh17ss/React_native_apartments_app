import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'
import { Text } from '@ui-kitten/components'
import * as WebBrowser from "expo-web-browser";
import {GoogleLogo} from '../logos/Google';

WebBrowser.maybeCompleteAuthSession();

export const GoogleButton=(
    {text,style,onPress}:
    {text:string,style?:ViewStyle,onPress:()=>void})=>{

        return(
            <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
                <GoogleLogo style={styles.logo}/>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        )

}

const styles=StyleSheet.create({
    button:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        borderRadius:5,
        borderColor:'white',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    logo:{
        marginLeft:10,
        marginTop:1
    },
    text:{
        color:'#36454f',
        alignSelf:'center',
        marginLeft:30,
        fontWeight:'bold',
        fontSize:15,
    }
});