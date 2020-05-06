import React, { PureComponent } from "react";
import { View, Button, Dimensions, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Color } from "@common";
import { Api } from "@services";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';

import { MenuProvider } from 'react-native-popup-menu';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

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
            solicitacoes: []
        }

        /* Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        }); */
    }

    toggleModal = (item) => {
        this.setState({ campanha: item });
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    componentDidMount() {
        this._getSolicitacoes();
    }

    componentWillReceiveProps(nextProps) {
        this._getSolicitacoes();
    }

    _getSolicitacoes() {
        this.setState({ refreshing: true });
        const { cns, nome } = this.props.route.params;
        this.setState({ nome: nome });
        Api.getSolicitacoes(cns).then((resposta) => {
            console.log('Luan>', resposta)
            this.setState({ solicitacoes: resposta, refreshing: false });
        });
    }

    _onRefresh() {
        this._getSolicitacoes();
    }

    clickBotaoVoltar() {
        this.props.navigation.goBack();
    }

    clickBotaoInicio() {
        this.props.navigation.popToTop();
    }

    // opcao = 1 é quando a tela de perfis é aberta pelo menu lateral
    // opcao = 2 é quando a tela de perfis é aberta pela tela de detalhes da campanha
    render() {

        let popup_details;

        if (this.state.orientation === 'portrait') {
            popup_details =
                <Modal isVisible={this.state.isModalVisible} style={{ marginLeft: 8, marginRight: 8, marginTop: 65, marginBottom: 30 }}
                    onBackButtonPress={this.toggleModal}>
                    <View style={{ flex: 1, backgroundColor: Color.primary }}>

                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Detalhes</Text>

                        <View style={{
                            flex: 1, marginTop: -7, backgroundColor: '#fff', padding: 8, marginVertical: 5,
                            marginLeft: 15, marginRight: 15, borderRadius: 12, elevation: 10, marginBottom: 10
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
                                    onPress={() => this.toggleModal()}>
                                    <View style={{ backgroundColor: '#fff', padding: 8, paddingBottom: 15, marginVertical: 5, marginLeft: 15, marginRight: 40, borderRadius: 12, elevation: 10 }}>
                                        <View opacity={this.state.isBottomMenuVisible}
                                            style={{ alignItems: "flex-end", marginBottom: -20, marginTop: -5, marginRight: 0 }}>
                                            <Menu>
                                                <MenuTrigger style={{ padding: 10 }}>
                                                    <FontAwesome5 name={'ellipsis-v'} color={"#BEBEBE"} size={20}
                                                        style={{ backgroundColor: "#ffffff" }} />
                                                </MenuTrigger>
                                                <MenuOptions>
                                                    <MenuOption onSelect={() => alert(`Editar`)} text='Editar' />
                                                    <MenuOption onSelect={() => alert(`Deletar`)} >
                                                        <Text style={{ color: 'red' }}>Cancelar Solicitação</Text>
                                                    </MenuOption>
                                                </MenuOptions>
                                            </Menu>
                                        </View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5, marginRight: 30 }}>{item.campanha_idade_publico.campanha.nome}</Text>
                                        <Text style={{ color: '#000000', paddingHorizontal: 5 }}>Status: {item.status}</Text>
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