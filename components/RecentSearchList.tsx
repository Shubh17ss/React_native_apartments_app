import {useState} from "react";
import {View, StyleSheet, ViewStyle} from "react-native"
import { Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { Location } from '../types/locationIQ';
import { RecentSearchButton } from "./recentSearchButton";
import { getFormattedLocationText } from "../utils/getFormattedLocation";
import Navigation from "../navigation";


export const RecentSearchList=({recentSearches,style}:{recentSearches?:Location[];style?:ViewStyle})=>{
    const [showmore, setShowMore]=useState(false);
    const navigation=useNavigation();
    const handleButtonPress=()=>setShowMore(!showmore)

    const ShowButton=({text}:{text:string})=>(
        <Button
        appearance={"ghost"}
        status={'info'}
        style={styles.showButton}
        onPress={handleButtonPress}>
            {text}
        </Button>
    )

    const handleRecentSearchButtonPress=(location:Location)=>{
        navigation.navigate("Root",{
            screen:'Search',
            params:{
                location:getFormattedLocationText(location),
                lat:location.lat,
                lon:location.lon,
                boundingBox:location.boundingbox
            }
        })   
    }

    const getList=()=>{
        if(!recentSearches || recentSearches.length===0)return;
        if(recentSearches.length>2 && !showmore){
            return(
                <>
                {
                    recentSearches.map((i,index)=>
                    index<2 ?(
                        <RecentSearchButton
                        key={i.display_name+index}
                        name={getFormattedLocationText(i)}
                        style={styles.recentSearchButton}
                        onPress={()=>handleRecentSearchButtonPress(i)}
                        />
                    ):null
                    )
                }
                <ShowButton text='Show more'/>
                </>
            )
        }
        return(
            <>
              {
                    recentSearches.map((i,index)=>(
                    <RecentSearchButton
                        key={i.display_name+index}
                        name={getFormattedLocationText(i)}
                        style={styles.recentSearchButton}
                        onPress={()=>handleRecentSearchButtonPress(i)}
                        />
                    
                    ))
                }
                {recentSearches.length>2?<ShowButton text="See Less"/>:null}
            </>
        )
    }

    return(
        <View style={style}>{getList()}</View>
    )
}

const styles=StyleSheet.create({
    recentSearchButton:{
        marginVertical:5,
    },
    showButton:{
        alignSelf:'flex-start'
    }
})