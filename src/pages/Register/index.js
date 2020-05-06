import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PacienteActions } from "@store/ducks/paciente";
import { Perfil, Cns, Endereco, Localizacao, Welcome, NascTel } from './pages';
import { Color } from "@common";
import { Api } from '@services';

const RegisterStack = createStackNavigator();

class Register extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                cns: '',
                nome: '',
                nasc: '',
                rua: '',
                num: '',
                comp: '',
                bairro: '',
                uf: '',
                cidade: '',
                cep: '',
                tel: '',
                lat: '',
                lng: '',
            },
            paciente: null
        }
        this.NaviRef = null;
    }

    componentDidMount() {

    }

    _handlePerfil(value) {
        this.setState({ data: value });
    }

    _handleSelectedProfile(value) {
        this.props.navigation.navigate('Solicitacoes', value);
    }

    _handleCns(value) {
        this.setState({ data: { ...this.state.data, ...value } });

    }

    _handleEndereco(value) {
        this.setState({ data: { ...this.state.data, ...value } });
    }

    _handleNascTel(value) {
        this.setState({ data: { ...this.state.data, ...value } });
    }

    _handleLocalizacao(value) {
        this.setState({ data: { ...this.state.data, ...value } });
        console.log(this.state);
    }

    _handleWelcome(value) {

    }

    _handlePressFinish() {
        const { addPaciente } = this.props;
        Api.createPaciente(this.state.data).then((resposta) => {
            console.log('Resposta', resposta);
            this.setState({ paciente: resposta });
            addPaciente({ cns: resposta.cns, nome: resposta.nome });
        }).catch((e) => {
            console.log('Nao foi');
        });
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
                        <NavigationContainer
                            independent={true}
                        >
                            <RegisterStack.Navigator initialRouteName="Perfil" headerMode='none' screenOptions={{ cardStyle: { backgroundColor: Color.primary } }} >

                                <RegisterStack.Screen name='Perfil'>
                                    {props => <Perfil {...props}
                                        onDataFilled={(value) => this._handlePerfil(value)}
                                        onSelectedProfile={(value) => this._handleSelectedProfile(value)}
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
                                        data={this.state.paciente}
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


const mapStateToProps = state => ({
    pacientes: state.pacienteState
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...PacienteActions }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);