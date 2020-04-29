import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Perfil, Cns, Endereco, Localizacao, Welcome, NascTel } from './components';
import { Color } from "@common";

const RegisterStack = createStackNavigator();

class Register extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            cns: '',
            nome: '',
            nasc: '',
            rua: '',
            num: '',
            bairro: '',
            uf: '',
            cidade: '',
            cep: '',
            tel: '',
            lat: '',
            lng: '',
        }
        this.NaviRef = null;
    }

    componentDidMount() {

    }

    _handlePerfil(value) {

    }

    _handleCns(value) {

    }

    _handleEndereco(value) {

    }

    _handleNascTel(value) {

    }

    _handleLocalizacao(value) {

    }

    _handleWelcome(value) {

    }

    _handlePressFinish() {
        this.props.navigation.navigate('Home');
    }

    _handlePressCancel() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Color.primary }}>
                <View style={{ flex: 1, borderTopWidth: 2, borderTopColor: '#fff', marginHorizontal: 10 }}>
                    <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center', marginTop: 40 }}>
                        <Text style={{ color: '#fff', fontSize: 27, fontWeight: 'bold', margin: 0 }} > Vacina</Text>
                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'normal', paddingTop: 3 }}>Garanhuns</Text>
                    </View>
                    <View style={{ flex: 0.9, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding: 25, paddingVertical: 10 }}>
                        <NavigationContainer >
                            <RegisterStack.Navigator initialRouteName="Cns" headerMode='none' screenOptions={{ cardStyle: { backgroundColor: Color.primary } }} >

                                <RegisterStack.Screen name='Perfil'>
                                    {props => <Perfil {...props}
                                        onDataFilled={(value) => this._handlePerfil(value)}
                                        onPressCancel={() => this._handlePressCancel()}
                                    />}
                                </RegisterStack.Screen>
                                <RegisterStack.Screen name='Cns'>
                                    {props => <Cns {...props}
                                        onDataFilled={(value) => this._handleCns(value)}
                                        onPressCancel={() => this._handlePressCancel()}
                                    />}
                                </RegisterStack.Screen>
                                <RegisterStack.Screen name='NascTel'>
                                    {props => <NascTel {...props}
                                        onDataFilled={(value) => this._handleNascTel(value)}
                                    />}
                                </RegisterStack.Screen>
                                <RegisterStack.Screen name='Endereco'>
                                    {props => <Endereco {...props}
                                        onDataFilled={(value) => this._handleEndereco(value)}
                                    />}
                                </RegisterStack.Screen>
                                <RegisterStack.Screen name='Localizacao'>
                                    {props => <Localizacao {...props}
                                        onDataFilled={(value) => this._handleLocalizacao(value)}
                                        onPressFinish={() => this._handlePressFinish()}
                                    />}
                                </RegisterStack.Screen>
                                <RegisterStack.Screen name='Welcome'>
                                    {props => <Welcome {...props}
                                        onDataFilled={(value) => this._handleWelcome(value)}
                                    />}
                                </RegisterStack.Screen>
                            </RegisterStack.Navigator>
                        </NavigationContainer>

                    </View>
                </View>
            </View>
        );
    }
}


export default Register;