import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, TextInput, Image, Animated } from "react-native";
import { SubTitle, ErrorMessage, ListItens, Footer, Button, ItemInput } from '../components';
import { TextInputMask } from 'react-native-masked-text';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PacienteActions } from "@store/ducks/paciente";
import { Color } from '@common';
import { Api } from '@services';

const cns = require('@assets/cns.png');
const cnsVersus = require('@assets/cns_versus.png');

const animateRotateY = new Animated.Value(0);
const animatedScaleY = new Animated.Value(0);
const animatedSourceImage = new Animated.Value(0);
const animateOpacity = new Animated.Value(0);

const setAnimateOpacity = animateOpacity.interpolate({
    inputRange: [0, 10, 90, 180],
    outputRange: [0, 1, 1, 0]
});

const setAnimateOpacityVersus = animateOpacity.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [0, 1, 1]
});
const setAnimatedScaleY = animatedScaleY.interpolate({
    inputRange: [0, 180],
    outputRange: [0.9, 1.1]
});
const setAnimateRotateY = animateRotateY.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
});
const setAnimatedSourceImage = animatedSourceImage.interpolate({
    inputRange: [0, 10, 180],
    outputRange: [cnsVersus, cns, cnsVersus]
});

class Cns extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tela: 1,
            animateState: 0,
            haveInvalidData: false,
            showErrorMessege: false,
            errorMessege: '',
            cns: '',
        }

        this.textInput = []
    }

    componentDidMount() {
        this._handleAnimation();
    }

    _handleAnimation() {

        if (this.state.animateState === 0) {
            Animated.sequence([
                Animated.timing(animateOpacity, { toValue: 10, delay: 300, useNativeDriver: true }),
                Animated.parallel([
                    Animated.timing(animateRotateY, { toValue: 180, delay: 1000, useNativeDriver: true }),
                    Animated.timing(animateOpacity, { toValue: 180, delay: 1000, useNativeDriver: true }),

                ]),
                Animated.timing(animatedScaleY, { toValue: 180, delay: 1000, useNativeDriver: true })
            ]).start();
        }

    }

    _handleValidValue(ref) {
        clearTimeout(ref.timer);
        ref.timer = setTimeout(() => {
            if (ref.isValid) {
                if (!ref.isValid()) {
                    ref.getElement().setNativeProps({ style: { color: '#FF4000', borderWidth: 1.5, borderColor: '#FF4000' } });
                    this.setState({ haveInvalidData: true })
                } else {
                    ref.getElement().setNativeProps({ style: { color: '#111', borderColor: '#fff' } });
                    this.setState({ haveInvalidData: false })
                }
            }
        }, 800)
    }

    _handlePressCancelar() {
        if(this.state.tela === 1){
            this.props.navigation.goBack();
        }
        else{
            this.props.onPressCancel();
        }
    }

    _handlePressProximo() {
        if (this.state.haveInvalidData === true) {
            this.setState({ showErrorMessege: true, errorMessege: 'Alguns dados estão incorreto ou faltando!' });
        } else if (this.state.cns === '') {
            this.setState({ showErrorMessege: true, errorMessege: 'Preencha os campos obrigatorios!' });
        } else {
            const dados = {
                cns: this.textInput.getRawValue(),
            };

            Api.getPaciente(dados.cns).then((resposta) => {
                const { addPaciente } = this.props;
                if(this.state.tela === 1){
                    this.props.navigation.navigate('Welcome', { data: { cns: resposta.cns, nome: resposta.nome } });
                }
                else{
                    this._handlePressCancelar();
                    alert('Perfil Cadastrado');
                }
                addPaciente({ cns: resposta.cns, nome: resposta.nome });
            }).catch((e) => {
                this.props.onDataFilled(dados);
                this.props.navigation.navigate('NascTel');
            });
        }

    }

    // tela == 1, tá abrindo da tela de solicitação de uma campanha,
    // tela == 2, tá abrindo da tela de perfis
    render() {
        if(this.props.route.params){
            const t = this.props.route.params.tela;
            this.setState({ tela: t });
        }
        else{
            this.setState({ tela: 1 });
        }

        return (
            <View style={{ flex: 1 }}>
                <SubTitle>Olá, preencha o campo com o número do CNS.</SubTitle>
                <View
                    style={{ flex: 0.6 }}
                >
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <Animated.View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 5,
                                opacity: setAnimateOpacity,
                                transform: [{ rotateY: setAnimateRotateY }, { scale: setAnimatedScaleY }]
                            }}
                        >
                            <Image
                                style={{
                                    flex: 1,
                                    resizeMode: "contain",
                                }}
                                source={cns}
                            />
                        </Animated.View>
                        <Animated.View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 4,
                                opacity: setAnimateOpacityVersus,
                                transform: [{ rotateY: setAnimateRotateY }, { scale: setAnimatedScaleY }]
                            }}
                        >
                            <Image
                                style={{
                                    flex: 1,
                                    resizeMode: "contain",
                                }}
                                source={cnsVersus}
                            />
                        </Animated.View>
                    </View>
                    <ErrorMessage
                        show={this.state.showErrorMessege}
                        message={this.state.errorMessege}
                    />
                    <View style={{ flex: 0.5, marginBottom: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 22 }}>CNS*</Text>
                        <TextInputMask
                            ref={ref => { this.textInput = ref }}
                            onSubmitEditing={() => this._handlePressProximo()}
                            type={'custom'}
                            options={{
                                mask: '999.9999.9999.9999',
                                validator: function (value, settings) {
                                    const count = value.replace(/[^0-9]/g, "").length;
                                    const result = count === 15 ? true : false
                                    return result;
                                },
                                getRawValue: function (value, settings) {
                                    return value.replace(/[^0-9]/g, "");
                                },
                            }}

                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            keyboardType={'numeric'}
                            placeholder='000.0000.0000.0000'
                            value={this.state.cns}
                            onChangeText={(value) => {
                                this.setState({ cns: value });
                                this._handleValidValue(this.textInput);
                            }}
                        />
                        <Text style={{ color: '#fff', fontSize: 12 }}>CNS, Cartão Nacional de Saúde.</Text>
                    </View>

                </View>
                <Footer>
                    <Button onPress={() => this._handlePressCancelar()} text={'Cancelar'} />
                    <Button onPress={() => this._handlePressProximo()} text={'Próximo'} />
                </Footer>
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
)(Cns);