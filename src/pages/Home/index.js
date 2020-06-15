import React, { PureComponent, useState } from "react";
import { View, Button, Dimensions, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ConfigActions } from "@store/ducks/config";
import { Icon, CheckBox } from 'react-native-elements';
import { Color } from "@common";
import { Api } from "@services";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DateFns } from "@common";

const SelectStack = createStackNavigator();

import _Perfis from '../Perfis';

import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Initial = (props) => {
    const handlePressSolic = () => {
        const data = new Date(props.campanha.data_ini);
        const mes = data.getMonth() + 1;
        Api.getCampanha(props.campanha.id, mes).then((resposta) => {
            props.navigation.navigate('Publico', {
                select: {
                    campanha_id: resposta.id,
                },
                publicos: resposta.publicos
            });
        })
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: .2, paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.3, borderColor: '#1112', marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{props.campanha.nome}</Text>
            </View>
            <ScrollView style={{ flex: props.portrait ? .5 : .1, shadowColor: '#ff0000' }}>
                <Text style={{ fontSize: 16, color: '#8B8989', paddingHorizontal: 5 }}>{props.campanha.desc}</Text>
            </ScrollView>

            {
                props.campanha.atend_domic ?
                    <View style={{ flex: props.portrait ? .3 : .7, padding: 5, borderTopWidth: 0.3, borderColor: '#1112', }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 5 }}>Solicitar o Atendimento</Text>
                        <TouchableOpacity onPress={() => handlePressSolic()}>
                            <Text style={{ fontSize: 18, backgroundColor: Color.primary, color: '#ffffff', borderRadius: 10, textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>Desejo Solicitar o Atendimento</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flex: props.portrait ? .3 : .7, padding: 5, borderTopWidth: 0.3, borderColor: '#1112', }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 5 }}>Solicitar o Atendimento</Text>
                        <TouchableOpacity onPress={() => handlePressSolic()} disabled={true}>
                            <Text style={{ fontSize: 18, backgroundColor: '#1112', color: '#ffffff', borderRadius: 10, textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>Solicitação Indisponível</Text>
                        </TouchableOpacity>
                    </View>
            }

        </View>
    );
}

const Publico = (props) => {
    const payload = props.route.params;
    const handlePressSelect = (value) => {
        props.navigation.navigate('Idade', {
            select: {
                ...payload.select,
                publico_id: value.id
            },
            idades: value.idades
        });
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: .2, paddingVertical: 20, paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Icon
                        name='arrow-left'
                        type='material-community'
                        color='#585858'
                        size={30}
                        onPress={() => props.navigation.goBack()}
                    />
                </View>
                <View style={{ flex: 9, marginLeft: 20 }}>
                    <Text style={{ fontSize: 25 }}>Selecione o Público</Text>
                </View>
            </View>
            <View style={{ flex: 8, marginTop: 20 }}>
                <FlatList
                    data={payload.publicos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handlePressSelect(item)}
                        >
                            <View style={{ backgroundColor: '#fff', padding: 8, paddingBottom: 15, marginVertical: 5, marginHorizontal: 20, borderRadius: 12, elevation: 2 }}>
                                <Text style={{ fontSize: 20, paddingBottom: 5, paddingHorizontal: 5, marginRight: 30 }}>{item.nome}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

const Idade = (props) => {
    const payload = props.route.params;
    const handlePressSelect = (value) => {
        props.navigation.navigate('Termo', {
            select: {
                ...payload.select,
                idade_id: value.id
            },
        });
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: .2, paddingVertical: 20, paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Icon
                        name='arrow-left'
                        type='material-community'
                        color='#585858'
                        size={30}
                        onPress={() => props.navigation.goBack()}
                    />
                </View>
                <View style={{ flex: 9, marginLeft: 20 }}>
                    <Text style={{ fontSize: 25 }}>Selecione a Idade</Text>
                </View>
            </View>
            <View style={{ flex: 8, marginTop: 20 }}>
                <FlatList
                    data={payload.idades}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handlePressSelect(item)}
                        >
                            <View style={{ backgroundColor: '#fff', padding: 8, paddingBottom: 15, marginVertical: 5, marginHorizontal: 20, borderRadius: 12, elevation: 2 }}>
                                <Text style={{ fontSize: 23, paddingBottom: 5, paddingHorizontal: 5, marginRight: 30 }}>{item.grupo}</Text>
                                <Text style={{ fontSize: 12, paddingBottom: 5, paddingHorizontal: 5, marginRight: 30 }}>{item.idade_ini} à {item.idade_end} anos</Text>
                                <Text style={{ fontSize: 12, paddingBottom: 5, paddingHorizontal: 5, marginRight: 30 }}>De {DateFns.mFormatRelative(item.pivot.data_ini)} à {DateFns.mFormatRelative(item.pivot.data_end)}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

const Termo = (props) => {
    const payload = props.route.params;
    const [aceitaTermo, setAceitaTermo] = useState(false);
    const handlePressSelect = () => {
        props.onPressSolic(payload.select);
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: props.portrait ? .2 : .3, paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Icon
                        name='arrow-left'
                        type='material-community'
                        color='#585858'
                        size={30}
                        onPress={() => props.navigation.goBack()}
                    />
                </View>
                <View style={{ flex: 9, marginLeft: 20 }}>
                    <Text style={{ fontSize: 25 }}>Aceite o Termo</Text>
                </View>
            </View>
            <ScrollView style={{ flex: props.portrait ? .6 : .4 }}>
                <Text style={{ fontSize: 20, color: "#1119", paddingHorizontal: 13, paddingVertical: 10, backgroundColor: '#fefdf6' }}>{props.campanha.termo_desc}</Text>
                <CheckBox
                    title='Aceito o termo de solicitação'
                    checked={aceitaTermo}
                    onPress={() => setAceitaTermo(!aceitaTermo)}
                />
            </ScrollView>
            <View style={{ flex: props.portrait ? .2 : .3, padding: 5 }}>
                <TouchableOpacity disabled={!aceitaTermo} onPress={() => handlePressSelect()}>
                    <Text style={{ fontSize: 18, backgroundColor: aceitaTermo ? Color.primary : '#1114', color: '#ffffff', borderRadius: 10, textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>Solicitar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isModalVisible: false,
            campanhasEsteMes: [],
            campanhasDemaisMeses: [],
            campanha: 1,
            portrait: true
        }

        this.isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };

        Dimensions.addEventListener('change', () => {
            this.setState({
                portrait: this.isPortrait()
            });
        });
    }

    _getScreen = () => {
        return Dimensions.get('screen');
    }

    toggleModal = (item) => {
        this.setState({ campanha: item });
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    componentDidMount() {
        this._getCampanhas();
        console.log(this.state.campanhas)
    }

    _onRefresh() {
        this._getCampanhas();
    }

    _getCampanhas() {
        this.setState({ refreshing: true });
        const data = new Date();
        const mes = data.getMonth() + 1;
        console.log(mes);
        Api.campanhasMes(mes, false).then((value) => {
            this.setState({ campanhasEsteMes: value });
        });
        Api.campanhasMes(mes, true).then((value) => {
            this.setState({ campanhasDemaisMeses: value });
            this.setState({ refreshing: false });
        });
    }

    _handleButtonSolic(value) {
        console.log('valor:', value);
        this.setState({ isModalVisible: false });
        this.props.navigation.navigate('Register', value)
    }

    clickBotaoSolicitarAtendimento() {
        this.props.navigation.navigate('Perfis', { opcao: '2' });
        this.setState({ isModalVisible: false });
    }

    // opcao = 1 é quando a tela home é aberta pelo menu lateral
    // opcao = 2 é quando a tela home é aberta pelas telas de solicitação da campanha
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: Color.primary }}>
                <Modal isVisible={this.state.isModalVisible} style={{ flex: 1, margin: 0, marginTop: this.state.portrait ? 80 : 10, marginBottom: this.state.portrait ? 40 : 10, marginHorizontal: 20 }}
                    onBackButtonPress={this.toggleModal}>
                    <View style={{ flex: 1, backgroundColor: Color.primary, borderRadius: 10 }}>
                        <View style={{ flex: .06, paddingTop: 20, paddingBottom: 5, paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#fff', fontSize: 25, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Detalhes</Text>
                            <FontAwesome5.Button name={'times'} color={"#ffff"} size={25}
                                style={{ backgroundColor: Color.primary }}
                                onPress={this.toggleModal}
                            />
                        </View>
                        <View style={{ flex: .9, backgroundColor: '#fff', padding: 8, margin: 10, borderRadius: 12, elevation: 10 }} >
                            <NavigationContainer independent={true} >
                                <SelectStack.Navigator initialRouteName="Home" headerMode='none' screenOptions={{ cardStyle: { backgroundColor: '#fff' } }} >
                                    <SelectStack.Screen name='Home'>
                                        {props => <Initial
                                            {...props}
                                            campanha={this.state.campanha}
                                            portrait={this.state.portrait}
                                        />}
                                    </SelectStack.Screen>
                                    <SelectStack.Screen name='Publico'>
                                        {props => <Publico
                                            {...props}
                                            campanha={this.state.campanha}
                                            portrait={this.state.portrait}
                                        />}
                                    </SelectStack.Screen>
                                    <SelectStack.Screen name='Idade'>
                                        {props => <Idade
                                            {...props}
                                            campanha={this.state.campanha}
                                            portrait={this.state.portrait}
                                        />}
                                    </SelectStack.Screen>
                                    <SelectStack.Screen name='Termo'>
                                        {props => <Termo
                                            {...props}
                                            campanha={this.state.campanha}
                                            portrait={this.state.portrait}
                                            onPressSolic={(value) => this._handleButtonSolic(value)}
                                        />}
                                    </SelectStack.Screen>
                                </SelectStack.Navigator>
                            </NavigationContainer>
                        </View>
                    </View>
                </Modal>
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
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
                    >
                        <View >
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Este Mês</Text>
                            <FlatList
                                data={this.state.campanhasEsteMes}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.toggleModal(item)
                                        }>
                                        <View style={{ backgroundColor: '#fff', padding: 8, marginVertical: 5, marginLeft: 15, marginRight: 40, borderRadius: 12, elevation: 10 }}
                                        >
                                            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5 }}>{item.nome}</Text>
                                            <Text style={{ color: Color.text_secundary, paddingHorizontal: 5 }}>Período</Text>
                                            <Text style={{ color: '#8889', paddingHorizontal: 5 }}>{DateFns.mFormatRelative(item.data_ini)} à {DateFns.mFormatRelative(item.data_end)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                                keyExtractor={item => item.nome}
                            />
                        </View>
                        {
                            this.state.campanhasDemaisMeses.length > 0 ?
                                <View>
                                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Demais meses</Text>
                                    <FlatList

                                        data={this.state.campanhasDemaisMeses}
                                        renderItem={({ item }) =>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    this.toggleModal(item)
                                                }>
                                                <View style={{ backgroundColor: '#fff', padding: 8, marginVertical: 5, marginLeft: 15, marginRight: 40, borderRadius: 12, elevation: 10 }}
                                                >
                                                    <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5 }}>{item.nome}</Text>
                                                    <Text style={{ color: Color.text_secundary, paddingHorizontal: 5 }}>Período</Text>
                                                    <Text style={{ color: '#8889', paddingHorizontal: 5 }}>{DateFns.mFormatRelative(item.data_ini)} à {DateFns.mFormatRelative(item.data_end)}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        }
                                        keyExtractor={item => item.nome}
                                    />
                                </View>
                                :
                                null
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

/* const AppNavigation = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: null
            }
        },
        Perfis: {
            screen: _Perfis,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'Home'
    }
);

const AppContainer = createAppContainer(AppNavigation); */


const mapStateToProps = state => ({
    config: state.configState,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...ConfigActions }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
