import { MaterialCommunityIcons } from "@expo/vector-icons";
import {View, StyleSheet, ViewStyle} from "react-native";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

export const ModalHeader=({xShown, text, style}:{xShown?:boolean,text?:string,style?:ViewStyle|ViewStyle[]})=>{

        const navigation=useNavigation();
        if(text){
            return(
                <View style={[styles.row,styles.container,style as ViewStyle]}>
                    {
                        xShown?(
                            <MaterialCommunityIcons
                            style={styles.x}
                            onPress={navigation.goBack}
                            name="close"
                            color="black"
                            size={24}
                            />
                        ):null
                    }
                    <Text category={"h5"}>{text}</Text>
                </View>
            )
        }
        return(
            <View style={[styles.container,style as ViewStyle]}>
                <View style={styles.bar}>

                </View>
            </View>
        )
};

const styles=StyleSheet.create({
    row:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    x:{
        position:'absolute',
        left:10,
        alignSelf:'center'
    },
    container:{
        alignItems:'center',
        justifyContent:'center',
        padding:15,
        borderBottomWidth:1,
        borderBottomColor:"#a4a4a4",
    },
    bar:{
        width:50,
        backgroundColor:"#a4a4a4",
        height:4,
        borderRadius:30, 
    }
})