import React, { Component } from "react";
import { View, Text } from "react-native";
import { Home, Perfis, CreatePerfil, EditPerfil, Register, Solicitacoes, Unidades, Welcome } from '@pages'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ConfigActions } from "@store/ducks/config";
import { Color } from "@common";

const StackW = createStackNavigator();


const WelcomeStack = () => {
    return (
        <StackW.Navigator>
            <StackW.Screen
                name='Welcome'
                component={Welcome}
                options={{ header: () => null }}
            />
        </StackW.Navigator>
    );
}

const StackH = createStackNavigator();

const HomeStack = () => {
    return (
        <StackH.Navigator initialRouteName='Home'>
            <StackH.Screen
                name='Home'
                component={Home}
                options={{ header: () => null }}
            />
            <StackH.Screen
                name='Solicitacoes'
                component={Solicitacoes}
                options={{ header: () => null }}
            />
            <StackH.Screen
                name='Register'
                component={Register}
                options={{ header: () => null }}
            />
        </StackH.Navigator>
    );
}

const StackP = createStackNavigator();

const PerfilStack = () => {
    return (
        <StackH.Navigator initialRouteName='Perfil'>
            <StackP.Screen
                name='Perfis'
                component={Perfis}
                options={{ header: () => null }}
            />
            <StackP.Screen
                name='CreatePerfil'
                component={CreatePerfil}
                options={{ header: () => null }}
            />
            <StackP.Screen
                name='EditPerfil'
                component={EditPerfil}
                options={{ header: () => null }}
            />
            <StackP.Screen
                name='Solicitacoes'
                component={Solicitacoes}
                options={{ header: () => null }}
            />
        </StackH.Navigator>
    );
}

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerPosition='right'
            drawerStyle={{
                backgroundColor: Color.primary,
                width: 290,
                paddingTop: 5,
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
            <Drawer.Screen
                name='Home'
                component={HomeStack}
            />
            <Drawer.Screen
                name='Unidades de Saúde Próximas'
                component={Unidades}
                options={{
                    drawerLabel: ({ focused, color }) => (
                        <Text style={{
                            marginVertical: 10,
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: '#fff',
                        }}>Unidades de Saúde Próximas</Text>
                    )
                }}
            />
            <Drawer.Screen
                name='Perfis Cadastrados'
                component={PerfilStack}
            />
        </Drawer.Navigator>
    );
}

const MainNavigator = (props) => {
    const { config } = props;
    return (
        <NavigationContainer>
            {config.welcome ?
                <WelcomeStack />
                :
                <DrawerStack />
            }
        </NavigationContainer >
    );
}


const mapStateToProps = state => ({
    config: state.configState,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...ConfigActions }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainNavigator);

