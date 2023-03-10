import {StyleSheet,TouchableOpacity,ViewStyle} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {FacebookLogo} from '../logos/Facebook';
import { Text } from '@ui-kitten/components';

WebBrowser.maybeCompleteAuthSession();

export const FacebookButton=({text,style,onPress}:
                             {text:string,style?:ViewStyle,onPress:()=>void})=>{

        return(
            <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
                <FacebookLogo style={styles.logo}/>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        );
}

const styles=StyleSheet.create({
    button:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        borderRadius:5,
        backgroundColor:'#3b5998',
        height:50,
    },
    logo:{
        marginLeft:10,
        marginTop:1,
    },
    text:{
        color:'#fff',
        alignSelf:'center',
        marginLeft:40,
        fontWeight:'bold',
        fontSize:15
    }


});