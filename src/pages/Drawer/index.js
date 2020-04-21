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
                <DrawerNavigatorItems
                    {...props}
                    labelStyle={{
                        marginVertical: 10,
                        fontWeight: 'normal',
                        fontSize: 18,
                        color: '#fff'
                    }}
                    activeLabelStyle={{

                    }}
                    itemsContainerStyle={{
                        paddingVertical: 30,
                        paddingHorizontal: 10
                    }}
                    itemStyle={{
                        backgroundColor: Color.primary,
                        justifyContent: 'center',
                        marginBottom: 10,
                        borderRadius: 10,
                        borderWidth: 2.5,
                        borderColor: '#fff',
                        elevation: 8
                    }}
                />
            </View>
        </SafeAreaView>
    </View>
);

export default Drawer;