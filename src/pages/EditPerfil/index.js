import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PacienteActions } from "@store/ducks/paciente";
import { Endereco, Welcome, NascTel, Localizacao } from './pages';
import { Color } from "@common";
import { Api } from '@services';

const RegisterStack = createStackNavigator();

class EditPerfil extends PureComponent {

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
            paciente: 1,
            campanhaIdadePublico: null,
            q: ''
        }
        this.NaviRef = null;
    }

    componentDidMount() {
        const payload = this.props.route.params;
        this.setState({ campanhaIdadePublico: payload });
        const p = this.props.route.params.paciente;
        this._getPaciente(p.cns);
    }

    componentWillReceiveProps(nextProps) {
        const payload = nextProps.route.params;
        this.setState({ campanhaIdadePublico: payload })
    }

    _handleEndereco(value) {
        this.setState({ data: { ...this.state.data, ...value } });
    }

    _handleNascTel(value) {
        this.setState({ data: { ...this.state.data, ...value } });
    }

    _handleLocalizacao(value) {
        this.setState({ data: { ...this.state.data, ...value } });
    }

    _handlePressFinish(value) {
        const data = { ...this.props.route.params.paciente, ...value };
        Api.editPaciente(data).then((resposta) => {
            this.setState({ paciente: resposta });
            this.props.changePaciente(resposta.cns, { nome: resposta.nome })
            alert('Dados Atualizados');
        }).catch(e => {
            alert("Ocorreu um erro ao editar o paciente.");
        });
    }

    _getPaciente(numero_cns) {
        Api.getPaciente(numero_cns).then((resposta) => {
            this.setState({ paciente: resposta });
        }).catch((e) => {
            Alert.alert(
                'Alert',
                e.message,
                [
                    {
                        text: 'Ok',
                        onPress: () => this.props.navigation.goBack()
                    },
                ]
            );
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

                        <RegisterStack.Navigator initialRouteName="Welcome" headerMode='none' screenOptions={{ cardStyle: { backgroundColor: Color.primary } }} >

                            <RegisterStack.Screen name='Welcome'>
                                {props => <Welcome {...props}
                                    onPressCancel={() => this._handlePressCancel()}
                                />}
                            </RegisterStack.Screen>
                            <RegisterStack.Screen name='NascTel'>
                                {props => <NascTel {...props}
                                    onDataFilled={(value) => this._handleNascTel(value)}
                                    onPressFinish={(value) => this._handlePressFinish(value)}
                                    paciente={this.state.paciente}
                                />}
                            </RegisterStack.Screen>
                            <RegisterStack.Screen name='Endereco'>
                                {props => <Endereco {...props}
                                    onDataFilled={(value) => this._handleEndereco(value)}
                                    onPressFinish={(value) => this._handlePressFinish(value)}
                                    paciente={this.state.paciente}
                                />}
                            </RegisterStack.Screen>
                            <RegisterStack.Screen name='Localizacao'>
                                {props => <Localizacao {...props}
                                    onPressFinish={(value) => this._handlePressFinish(value)}
                                    paciente={this.state.paciente}
                                />}
                            </RegisterStack.Screen>
                        </RegisterStack.Navigator>

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
)(EditPerfil);