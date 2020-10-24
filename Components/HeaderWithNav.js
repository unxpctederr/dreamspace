import React from "react"
import MenuHamburger from "./MenuHamburger";
import { View } from "react-native"
import { Title } from "react-native-paper";

const HeaderWithNav = (props) => {

    return(
        <View style={{alignItems: "flex-start", alignSelf: "flex-start", width: "100%"}}>
            <MenuHamburger />
            <View style={{marginLeft: 12}}>
                <Title style={{fontWeight: "bold", fontSize: 30}}> Journal Library </Title>
            </View>
        </View>
    )
}

export default HeaderWithNav;