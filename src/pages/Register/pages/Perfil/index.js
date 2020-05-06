import React, { PureComponent } from "react";
import { View, Dimensions, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import { SubTitle, ErrorMessage, ListItens, Footer, Button, ItemInput } from '../components';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PacienteActions } from "@store/ducks/paciente";
import { Icon } from 'react-native-elements';
import { Color } from "@common";
import { Api } from "@services";

class Perfis extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
        }
    }

    componentDidMount() {

    }

    _handlePressCancelar() {
        this.props.onPressCancel();
    }

    render() {
        const { pacientes } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <SubTitle>Selecione um dos Perfis</SubTitle>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={pacientes}
                        keyExtractor={item => item.cns}
                        ListFooterComponent={() => (
                            <TouchableOpacity
                                style={{ alignItems: 'center', marginTop: 30, marginBottom: 30 }}
                                onPress={() => this.props.navigation.navigate('Cns')}
                            >
                                <View style={{ height: 40, width: 200, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 2, borderColor: '#fff', backgroundColor: Color.primary, elevation: 5 }}>
                                    <Text style={{ color: '#fff', fontSize: 15 }} >Cadastrar novo perfil</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Welcome', { data: { cns: item.cns, nome: item.nome } })}>
                                <View style={{ backgroundColor: '#fff', padding: 8, paddingBottom: 15, marginVertical: 5, marginHorizontal: 20, borderRadius: 12, elevation: 10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5, marginRight: 30 }}>{item.nome}</Text>
                                    <Text style={{ color: '#000000', paddingHorizontal: 5 }}>{item.cns}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <Footer>
                    <Button
                        contentStyle={{ borderRadius: 50 }}
                        style={{ width: 125, justifyContent: 'flex-start', borderRadius: 50 }}
                        text={'Voltar'}
                        icon={
                            <Icon
                                name='arrow-left'
                                type='material-community'
                                raised
                                color='#585858'
                                size={20}
                            />
                        }
                        onPress={() => this._handlePressCancelar()}
                    />
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
)(Perfis);
