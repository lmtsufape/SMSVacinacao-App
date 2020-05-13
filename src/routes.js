import React, { Component } from "react";
import { Drawer, Home, Perfis, Register, Solicitacoes, Unidades, Welcome } from '@pages'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Color } from "@common";

const Stack = createStackNavigator();

const DrawerStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Welcome'
                component={Welcome}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name='Home'
                component={Home}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name='Perfis'
                component={Perfis}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name='Solicitacoes'
                component={Solicitacoes}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name='Unidades'
                component={Unidades}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name='Register'
                component={Register}
                options={{ header: () => null }}
            />
        </Stack.Navigator>
    );
}


const DrawerRouter = createDrawerNavigator();

const MainNavigator = () => {

    return (
        <NavigationContainer>
            <DrawerRouter.Navigator
                initialRouteName='Home'
                drawerPosition='right'
                drawerStyle={{
                    backgroundColor: Color.primary,
                    width: 290,
                }}
                drawerContentOptions={{
                    contentContainerStyle: {
                        padding: 20,
                        alignItems: 'center'
                    },
                    labelStyle: {
                        marginVertical: 10,
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: '#fff',
                    },
                    itemStyle: {
                        height: 70,
                        width: '90%',
                        justifyContent: 'center',
                        backgroundColor: Color.primary,
                        marginBottom: 10,
                        borderRadius: 10,
                        borderWidth: 2.5,
                        borderColor: '#fff',
                        elevation: 10
                    }
                }}
            >
                <DrawerRouter.Screen
                    name='Home'
                    component={DrawerStack}
                />
                <DrawerRouter.Screen
                    name='Unidades de Saúde Próximas'
                    component={Unidades}
                />
                <DrawerRouter.Screen
                    name='Perfis Cadastrados'
                    component={Perfis}
                />
            </DrawerRouter.Navigator>
        </NavigationContainer >
    );
}

const App = MainNavigator;

export default App;
