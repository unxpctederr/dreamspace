import React, {useEffect, useState} from 'react'
import {RefreshControl, View} from 'react-native'
import {Text, useTheme} from "react-native-paper"
import * as LocalAuthentication from 'expo-local-authentication';
import useSettings from "../../Hooks/UseSettings"
import {ScrollView} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';

const AuthenticationView = ({children, errorScreen}) => {
    const [shown, setShown] = useState(null)
    const {getSettings, setSetting } = useSettings()

    const isFocused = useIsFocused();

    const effect = async () => {
        const settings = await getSettings();
        const isEnabled = settings.find((item) => item.name == "JournalAuthenticationLockEnabled" ? item.value : undefined);

        console.log("enabled: ", isEnabled);

        if(isEnabled) {
            const authentication = await LocalAuthentication.authenticateAsync({
                promptMessage: "Journal is locked. Authenticate to view the journal"
            });
            setShown(authentication.success)
        } else {
            setShown(true)
        }        
    }

    useEffect(() => {
        if(isFocused == true){
            effect();
        }
       
    }, [isFocused])

    if(errorScreen == null){
        errorScreen = <DefaultScreen onRefresh={effect} />
    }

    return (
        <>
            {shown ? children : null}
            {shown === false ? errorScreen : null}
        </>
    )
}

const DefaultScreen = ({onRefresh}) => {
    const theme = useTheme();

    return(
        <View style={{alignItems: "center", flexDirection: "row", height: "100%", margin: 20}}>
            <ScrollView 
            style={{height: "100%"}}
            refreshControl={
                <RefreshControl onRefresh={onRefresh} />
              }> 
                <Text style={{fontSize: 20, color: theme.colors.error, fontWeight: 'bold'}}>Authentication failed.</Text>
                <Text style={{fontSize: 15, color: theme.colors.error}}>Swipe down to try again. </Text>  
                <Text style={{fontSize: 15, color: theme.colors.error, marginTop: 20}}>You can also disable authentication in settings. </Text> 
            </ScrollView>
        </View>
    )
}


export default AuthenticationView
