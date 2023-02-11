import {Text,Divider} from '@ui-kitten/components';
import {View, StyleSheet, ViewStyle} from 'react-native';
import { theme } from '../theme';

export const OrDivider=({style}:{style?:ViewStyle})=>{

    return(
        <View style={[styles.container,style]}>
                <Divider style={styles.divider}/>
                <Text style={styles.orText} appearance={'hint'}>or</Text>
                <Divider style={styles.divider}/>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    divider:{
        borderWidth:1,
        width:'45%',
        borderColor:theme['color-gray'],
    },
    orText:{
        paddingHorizontal:10,
        marginTop:-5,
    }
});