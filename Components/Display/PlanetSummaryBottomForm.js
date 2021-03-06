import React from 'react'
import {View} from 'react-native'
import {Button, IconButton, Text, Title, withTheme} from 'react-native-paper'
import usePlanets from "../../Hooks/UsePlanets"

const PlanetSummaryBottomForm = ({uuid, height=200, onClose=function(){},onView=function(){}, theme, navigation}) => {
    const { generatedPlanets, getPlanetIcon } = usePlanets();
    const data = generatedPlanets.find((tag) => tag.uuid == uuid);
 
    if(data == null) return null;

    return(
        <View style={{height: height, width: "100%", backgroundColor: theme.colors.journalFormBackground || "black", flexDirection: "column", borderRadius: 20, padding: 5}}>
            <View style={{flexDirection: 'row', justifyContent: "flex-end"}}>
                <IconButton onPress={onClose} icon="close" />
            </View>
            
            <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                <View style={{flexDirection: 'column', height: 90, width: 90, marginRight: 20}}>{getPlanetIcon(data.planet.icon)}</View>

                <View style={{flexDirection: 'column', flex: 2, justifyContent: 'space-between'}} >
                    <Title style={{fontWeight: 'bold', fontSize: 25}} numberOfLines={1}>{data.name}</Title>
                    <Text>{data.used} dreams</Text> 
                    <Button mode="contained" onPress={onView}> View </Button>
                </View>
            </View>
        </View>
    );
}

export default withTheme(PlanetSummaryBottomForm);