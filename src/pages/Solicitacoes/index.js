import React, { PureComponent } from "react";
import { Alert, View, Button, Dimensions, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView, Animated } from "react-native";
import { Icon } from 'react-native-elements';
import { Color } from "@common";
import { Api } from "@services";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';

import { MenuProvider } from 'react-native-popup-menu';

const colorAnimated = new Animated.Value(0);
const backgroundColorAnimated = colorAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(230,100,100)", "rgb(220,220,0)"]
})

class Solicitacoes extends PureComponent {

    constructor(props) {
        super(props);

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };

        this.state = {
            refreshing: false,
            isModalVisible: false,
            campanha: 1,
            orientation: isPortrait() ? 'portrait' : 'landscape',
            nome: '',
            recusa_desc: '',
            campanha_nome: '',
            solicitacoes: []
        }

    }

    toggleModal = (item) => {
        if (item.status === 'Recusado') {
            this.setState({ recusa_desc: item.recusa_desc });
            this.setState({ isModalVisible: !this.state.isModalVisible });
        }

    };

    componentDidMount() {
        this._getSolicitacoes(this.props);

    }

    _startAnimations() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(colorAnimated, {
                    toValue: 1,
                    duration: 700,
                    delay: 1000,
                    useNativeDriver: false
                }),
                Animated.timing(colorAnimated, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false
                })
            ]),
            {
                iterations: 4,
            }
        ).start()
    }

    componentWillReceiveProps(nextProps) {
        console.log('PRops');
        this._getSolicitacoes(nextProps);
    }

    _getSolicitacoes(props) {
        this._startAnimations();
        this.setState({ refreshing: true, solicitacoes: [] });
        const { cns, nome } = props.route.params;
        this.setState({ nome: nome });
        console.log('debug>', props.route.params);
        Api.getSolicitacoes(cns).then((resposta) => {
            this.setState({ solicitacoes: resposta, refreshing: false });
        }).catch(e => {
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

    _onRefresh() {

        this._getSolicitacoes(this.props);
    }

    clickBotaoVoltar() {
        this.props.navigation.popToTop();
    }

    clickBotaoInicio() {
        this.props.navigation.popToTop();
    }

    _handleExcludeSolic(value) {
        console.log("cal", value);
        Api.deleteSolicitacao(value).then((resposta) => {
            console.log("solic cancel", resposta);
            alert('Solicitação cancelada');
            this._getSolicitacoes(this.props);
        }).catch(e => {
            alert(e.message);
            this._getSolicitacoes(this.props);
        });
    }

    getStatus(value) {
        let result = '';
        if (value === 'Aceito') {
            result = <Text style={{ color: '#388E8E' }}> {value}</Text>;
        } else if (value === 'Recusado') {
            result = <Text style={{ color: '#ff1919' }}> {value}</Text>;
        } else if (value === 'Vacinado') {
            result = <Text style={{ color: '#32CD32' }}> {value}</Text>;
        } else {
            result = <Text style={{ color: '#ffbf00' }}> {value}</Text>;
        }

        return result;
    }

    // opcao = 1 é quando a tela de perfis é aberta pelo menu lateral
    // opcao = 2 é quando a tela de perfis é aberta pela tela de detalhes da campanha
    render() {

        let popup_details;

        if (this.state.orientation === 'portrait') {
            popup_details =
                <Modal isVisible={this.state.isModalVisible} style={{ marginLeft: 8, marginRight: 8, marginTop: 65, marginBottom: 30 }}
                    onBackButtonPress={() => this.setState({ isModalVisible: false })}>
                    <View style={{
                        maxHeight: '60%',
                        marginTop: 0, backgroundColor: '#fff', padding: 8, marginVertical: 5,
                        marginLeft: 15, marginRight: 15, borderRadius: 12, marginBottom: 10
                    }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Recusa da Solicitação</Text>

                            <FontAwesome5.Button name={'times'} color={"#BEBEBE"} size={25}
                                style={{ backgroundColor: "#fff" }}
                                onPress={() => this.setState({ isModalVisible: false })}
                            />
                        </View>
                        <ScrollView>
                            <Text style={{ color: "#000000", paddingHorizontal: 10 }}>{this.state.recusa_desc}</Text>
                        </ScrollView>

                    </View>
                </Modal >;
        }
        else {
            popup_details =
                <Modal isVisible={this.state.isModalVisible} onBackButtonPress={this.toggleModal}
                    style={{ marginLeft: 8, marginRight: 8, marginTop: 65, marginBottom: 10 }}>
                    <View style={{ flex: 1, backgroundColor: Color.primary }}>

                        <Text style={{ color: '#fff', marginTop: -10, fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Detalhes</Text>

                        <View style={{
                            flex: 1, marginTop: -7, backgroundColor: '#fff', padding: 8, marginVertical: 5, marginLeft: 15,
                            marginRight: 15, borderRadius: 12, elevation: 10, marginBottom: 10
                        }} >

                            <View style={{ alignItems: "flex-end", marginBottom: -20, marginTop: -5 }}>
                                <FontAwesome5.Button name={'times'} color={"#BEBEBE"} size={25}
                                    style={{ backgroundColor: "#ffffff" }}
                                    onPress={this.toggleModal}
                                />
                            </View>

                            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5, marginRight: 40 }}>H1N1</Text>

                            <Text style={{ color: "#000000", paddingHorizontal: 5 }}>Status: Aprovado</Text>

                        </View>

                    </View>
                </Modal>;
        }

        return (
            <MenuProvider>
                <View style={{ flex: 1, backgroundColor: Color.primary, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Color.primary, height: 60, elevation: 3 }}>
                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', padding: 10 }}>VacinaGaranhuns</Text>
                        <View style={{ padding: 10 }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.toggleDrawer()}
                            >
                                <Icon
                                    name='navicon'
                                    type='font-awesome'
                                    color='#fff'
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Campanhas Solicitadas Por {this.state.nome}</Text>
                        <FlatList
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
                            data={this.state.solicitacoes}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => this.toggleModal(item)}>
                                    <View style={{ backgroundColor: '#fff', padding: 8, marginVertical: 5, marginLeft: 15, marginRight: 40, borderRadius: 12, elevation: 10 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5, marginRight: 30 }}>{item.campanha_idade_publico.campanha.nome}</Text>
                                        <Text style={{ fontWeight: 'bold', color: '#BEBEBE', fontSize: 13, paddingBottom: 5, paddingHorizontal: 5, marginRight: 30 }}>{item.campanha_idade_publico.publico.nome}, {item.campanha_idade_publico.idade.grupo} de {item.campanha_idade_publico.idade.idade_ini} à {item.campanha_idade_publico.idade.idade_end} anos</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#111', paddingLeft: 5 }}>Status:</Text>
                                            {this.getStatus(item.status)}
                                        </View>
                                        {item.status === 'Em espera' ?
                                            <View style={{ alignItems: 'center', marginVertical: 5, marginTop: 10 }}>
                                                <TouchableOpacity
                                                    onPress={() => this._handleExcludeSolic(item.id)}
                                                >
                                                    <Animated.View style={{ height: 28, width: 180, backgroundColor: backgroundColorAnimated, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: "#fff" }}>Cancelar Solicitação</Text>
                                                    </Animated.View>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            null
                                        }
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                    <View style={{ marginLeft: 5, padding: 10, backgroundColor: Color.primary, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.clickBotaoVoltar()} >
                            <Text style={{ fontSize: 18, padding: 20, fontWeight: 'bold', backgroundColor: Color.primary, color: '#ffffff', borderRadius: 5, textAlign: 'center', paddingTop: 10, paddingBottom: 10, borderWidth: 1, borderColor: '#ffffff' }}>Voltar</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {popup_details}
            </MenuProvider>
        );
    }
}

export default Solicitacoes;