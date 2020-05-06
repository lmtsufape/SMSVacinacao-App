import React, { Component } from "react";
import {
    View,
    SafeAreaView,
} from "react-native";
import { DrawerItemList, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';


const Drawer = (props) => (
    <DrawerContentScrollView
        {...props}
    >
        <DrawerItemList
            {...props}
        />
        <DrawerItem
            label="Home"
            onPress={() => Linking.openUrl('https://mywebsite.com/help')}
        />
    </DrawerContentScrollView>
);

export default Drawer;