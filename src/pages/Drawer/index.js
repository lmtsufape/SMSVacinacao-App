import React, { Component } from "react";
import {
    View,
    SafeAreaView,
} from "react-native";
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { Color } from "@common";


const Drawer = (props) => (
    <View style={{ flex: 1, backgroundColor: Color.primary }}>
        <SafeAreaView >
            <View >
                <View style={{ alignItems: 'center' }}>
                </View>
            </View>
            <View>
                <DrawerNavigatorItems {...props} />
            </View>
        </SafeAreaView>
    </View>
);

export default Drawer;