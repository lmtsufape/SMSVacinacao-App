import React, { Component } from "react";
import { Drawer, Home, Perfis, Register, Unidades } from '@pages'
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

const DrawerStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: { header: null }
    },
    Register: {
        screen: Register,
        navigationOptions: { header: null }
    },
})

const MainNavigator = createDrawerNavigator(
    {
        Home: DrawerStack,
        'Unidades de Saúde Próximas': {
            screen: Unidades
        },
    },
    {
        initialRouteName: 'Home',
        drawerPosition: 'right',
        contentComponent: Drawer,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',

    });

const App = createAppContainer(MainNavigator);

export default App;
