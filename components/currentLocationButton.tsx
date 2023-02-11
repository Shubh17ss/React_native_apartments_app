import {TouchableOpacity, StyleSheet, ViewStyle, View} from 'react-native';
import { Text } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {theme} from '../theme';
import * as Location from 'expo-location';

export const CurrentLocationButton=({style}:{style?:ViewStyle})=>{

    const navigation=useNavigation();
    const getLocation=async()=>{
    let {status}=await Location.requestForegroundPermissionsAsync();
    if(status!=="granted"){
        alert("Permission to access location was denied");
        return;
    }
    let location=await Location.getCurrentPositionAsync({});
    handleNavigate(location);
    }
    
    const handleNavigate=(location:Location.LocationObject)=>{
        let lat=location.coords.latitude;
        let lon=location.coords.longitude;
        let boundingBox=[
            (lat-0.048).toString(),
            (lat+0.048).toString(),
            (lon-0.041).toString(),
            (lon+0.041).toString(),
        ]

        navigation.navigate("Root",{
            screen:"Search",
            params:{
                location:"Your Current Location",
                boundingBox,
                lat:lat.toString(),
                lon:lon.toString(),
            }
        })
    }



        return(
            <View style={[styles.row, style as ViewStyle]}>
                <FontAwesome
                name="location-arrow"
                size={30}
                style={styles.icon}
                color={theme["color-primary-500"]}
                />
                <TouchableOpacity onPress={async()=>await getLocation()}>
                    <Text
                    style={styles.text}
                    status={"info"}
                    >
                    Use my current location</Text>
                </TouchableOpacity>
            </View>
        )
}

const styles=StyleSheet.create({
    
    row:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
     },
    icon:{
        marginLeft:5
    },
    text:{
        marginLeft:10,
        fontWeight:"600",
    }
})