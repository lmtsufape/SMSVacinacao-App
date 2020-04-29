import React, { PureComponent } from "react";
import { View, Button, Dimensions, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Color } from "@common";
import { Api } from "@services";

import CampanhasPerfil from '../Perfis//campanhas_perfil';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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

    clickBotaoVoltar(){
        this.props.navigation.goBack();
    }

    clickBotaoInicio(){
        this.props.navigation.popToTop();
    }

    // opcao = 1 é quando a tela de perfis é aberta pelo menu lateral
    // opcao = 2 é quando a tela de perfis é aberta pela tela de detalhes da campanha
    render() {
        
        const opcao = this.props.navigation.getParam('opcao', 1);
        
        let titulo;
        let botao_voltar;

        if(opcao === 1){
            titulo = "Perfis Cadastrados";
        }else{
            titulo = "Selecione o perfil para concluir a solicitação";
            botao_voltar =
            <View style={{marginLeft: 5, padding: 10, backgroundColor: Color.primary, flexDirection: 'row'}}>
                <TouchableOpacity onPress = { () => this.clickBotaoVoltar()} >       
                    <Text style={{ fontSize: 18, padding: 20, fontWeight: 'bold', backgroundColor: Color.primary, color: '#ffffff', borderRadius: 5, textAlign: 'center', paddingTop: 10, paddingBottom: 10, borderWidth: 1, borderColor: '#ffffff'}}>Voltar</Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress = { () => this.clickBotaoInicio()} >       
                    <Text style={{ marginLeft: 15, fontSize: 18, padding: 20, fontWeight: 'bold', backgroundColor: Color.primary, color: '#ffffff', borderRadius: 5, textAlign: 'center', paddingTop: 10, paddingBottom: 10, borderWidth: 1, borderColor: '#ffffff'}}>Início</Text>
                </TouchableOpacity> 
            </View> 
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
                    <View style={{flex:1}}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> {titulo}</Text>
                        <ScrollView
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
                        >
                            
                            <TouchableOpacity
                                onPress = { () => this.props.navigation.navigate('CampanhasPerfil', {nome: 'Maria José'}) }>
                                <View style={{ backgroundColor: '#fff', padding: 8, paddingBottom: 15, marginVertical: 5, marginLeft: 15, marginRight: 40, borderRadius: 12, elevation: 10 }} 
                                    >
                                    <View opacity={this.state.isBottomMenuVisible}  
                                        style={{ alignItems: "flex-end", marginBottom: -20, marginTop: -5, marginRight: 0}}>
                                        <Menu>
                                            <MenuTrigger style={{padding: 10}}>
                                                <FontAwesome5 name={'ellipsis-v'} color={"#BEBEBE"} size={20} 
                                                style={{backgroundColor: "#ffffff" }} />
                                            </MenuTrigger>
                                            <MenuOptions>
                                                <MenuOption onSelect={() => alert(`Editar`)} text='Editar' />
                                                <MenuOption onSelect={() => alert(`Deletar`)} >
                                                    <Text style={{color: 'red'}}>Deletar</Text>
                                                </MenuOption>
                                            </MenuOptions>
                                        </Menu>
                                    </View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5, marginRight: 30 }}>Maria José</Text>
                                    <Text style={{ color: '#000000', paddingHorizontal: 5 }}>CNS: 00.000.00.00</Text>
                                </View>
                            </TouchableOpacity> 

                        </ScrollView>

                    </View>

                    {botao_voltar}

                    <View style={{ flexDirection: 'column-reverse'}}>
                        
                        <ScrollView horizontal={true}>
                            <View style={{ flexDirection: 'row'}}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 5, backgroundColor: Color.primary, color: '#ffffff', padding: 10, paddingRight: 0 }}>Deseja adicionar um novo perfil? </Text>
                                <TouchableOpacity
                                    onPress={() => alert(`Tela Criar Novo Perfil`)}>
                                    <View style={{backgroundColor: Color.primary, padding: 10, paddingLeft: 0, marginLeft: -5}}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff'}}> Clique Aqui</Text>
                                        <Text style={{ marginTop: -20, marginLeft: 5, borderColor:'#ffffff', paddingHorizontal: 5, borderBottomWidth: 1.5 }}></Text>
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

const AppNavigation = createStackNavigator(
    {
      Perfis: {
        screen: Perfis,
        navigationOptions: {
            header: null
        }
      },
      CampanhasPerfil: {
        screen: CampanhasPerfil,
        navigationOptions: {
            header: null
        }
      }
    },
    {
      initialRouteName: 'Perfis'
    }
  );
  
const AppContainer = createAppContainer(AppNavigation);

export default AppContainer;