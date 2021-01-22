import React, { PureComponent } from "react";
import { View, Button, Dimensions, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView, Alert } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PacienteActions } from "@store/ducks/paciente";
import { Icon } from 'react-native-elements';
import { Color } from "@common";
import { Api } from "@services";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { MenuProvider } from 'react-native-popup-menu';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

class Perfis extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
        }
    }

    componentDidMount() {
    }

    _onRefresh() {

    }

    clickBotaoVoltar() {
        this.props.navigation.goBack();
    }

    clickBotaoInicio() {
        this.props.navigation.popToTop();
    }
  
    clickBotaoCreatePerfil() {
        this.props.navigation.navigate('CreatePerfil');
    }

    clickBotaoUpdatePerfil(item) {
        this.props.navigation.navigate('EditPerfil', { paciente: item });
    }

    _onRemove(value) {
        console.log(value)
        Alert.alert('Remoção', `Tem certeza que deseja remover o perfil de ${value.nome}`, [
            {
                text: 'Cancelar',
                onPress: () => null,
                style: 'cancel'
            },
            {
                text: 'Ok',
                onPress: () => this.props.removePaciente(value.cns)
            }
        ])
    }

    // opcao = 1 é quando a tela de perfis é aberta pelo menu lateral
    // opcao = 2 é quando a tela de perfis é aberta pela tela de detalhes da campanha
    render() {
        const { pacientes } = this.props;
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
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Perfis Cadastrados </Text>
                        <FlatList
                            data={pacientes}
                            keyExtractor={item => item.cns}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Solicitacoes', { cns: item.cns, nome: item.nome })}>
                                    <View style={{ backgroundColor: '#fff', padding: 8, paddingBottom: 15, marginVertical: 5, marginLeft: 15, marginRight: 40, borderRadius: 12, elevation: 10 }}
                                    >
                                        <View opacity={this.state.isBottomMenuVisible}
                                            style={{ alignItems: "flex-end", marginBottom: -20, marginTop: -5, marginRight: 0 }}>
                                            <Menu>
                                                <MenuTrigger style={{ padding: 10 }}>
                                                    <FontAwesome5 name={'ellipsis-v'} color={"#BEBEBE"} size={20}
                                                        style={{ backgroundColor: "#ffffff" }} />
                                                </MenuTrigger>
                                                <MenuOptions>
                                                    <MenuOption onSelect={() => this.clickBotaoUpdatePerfil(item)} text='Editar' />
                                                    <MenuOption onSelect={() => this._onRemove(item)} >
                                                        <Text style={{ color: 'red' }}>Deletar</Text>
                                                    </MenuOption>
                                                </MenuOptions>
                                            </Menu>
                                        </View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5, marginRight: 30 }}>{item.nome}</Text>
                                        <Text style={{ color: '#000000', paddingHorizontal: 5 }}>{item.cns}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                    <View style={{ flexDirection: 'column-reverse' }}>

                        <ScrollView horizontal={true}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 5, backgroundColor: Color.primary, color: '#ffffff', padding: 10, paddingRight: 0 }}>Deseja adicionar um novo perfil? </Text>
                                <TouchableOpacity
                                    onPress={() => this.clickBotaoCreatePerfil()}>
                                    <View style={{ backgroundColor: Color.primary, padding: 10, paddingLeft: 0, marginLeft: -5 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff' }}> Clique Aqui</Text>
                                        <Text style={{ marginTop: -20, marginLeft: 5, borderColor: '#ffffff', paddingHorizontal: 5, borderBottomWidth: 1.5 }}></Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </MenuProvider>
        );
    }
}

const mapStateToProps = state => ({
    pacientes: Object.values(state.pacienteState)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...PacienteActions }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Perfis);
