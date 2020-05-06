import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import LottieView from 'lottie-react-native';
import { Color } from '@common';


class Welcome extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            nome: ''
        }
    }

    componentDidMount() {
        this._sendSolicitacao();
    }

    componentWillReceiveProps(nextProps) {
        this._sendSolicitacao();
    }

    _sendSolicitacao() {
        if (this.props.data) {
            const { data } = this.props;
            this.setState({ nome: data.nome });
        } else {
            const { data } = this.props.route.params;
            this.setState({ nome: data.nome });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.2, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 23, fontWeight: 'bold' }}> Bem vindo {this.state.nome}. Estamos realizando sua solicitação...</Text>
                </View>
                <View style={{ flex: 0.4, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <LottieView
                        source={require('@assets/progress.json')}
                        autoPlay
                        loop={true}
                        hardwareAccelerationAndroid={true}
                    />
                </View>
                <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <TouchableHighlight
                            activeOpacity={0.3}
                            underlayColor="#1111"
                            style={{ borderRadius: 10 }}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <View style={{
                                height: 60,
                                width: 200,
                                backgroundColor: Color.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                borderWidth: 2.5,
                                borderColor: '#fff',
                                elevation: 5
                            }}>
                                <Text style={{
                                    marginVertical: 10,
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: '#fff'
                                }}>Cancelar</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

export default Welcome;