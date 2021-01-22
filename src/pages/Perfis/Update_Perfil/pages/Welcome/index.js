import React, { PureComponent } from "react";
import { SubTitle, ErrorMessage, ListItens, Footer, Button } from '../../../../Register/pages/components';
import { View, Text, TouchableOpacity } from "react-native";
import { Color } from '@common';


class Welcome extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showErrorMessege: false,
            errorMessege: '',
        }

        this.textInput = []
    }

    componentDidMount() {

    }

    _handlePressCancelar() {
        this.props.onPressCancel();
    }

    render() {


        return (
            <View style={{ flex: 1 }}>
                <SubTitle>Selecione os dados que você deseja modificar</SubTitle>
                <ErrorMessage
                    show={this.state.showErrorMessege}
                    message={this.state.errorMessege}
                />
                <ListItens>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('NascTel')}
                    >
                        <View style={{ backgroundColor: '#fff', borderRadius: 10, borderWidth: 2.5, borderColor: '#000', marginTop: 30, padding: 8, paddingBottom: 15, marginVertical: 5, marginLeft: 15, marginRight: 15, borderRadius: 12, elevation: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5, marginRight: 30 }}>Dados Pessoais</Text>
                            <Text style={{ paddingHorizontal: 5 }}>Nome, Data de Nascimento, Telefone</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Endereco')}
                    >
                        <View style={{ backgroundColor: '#fff', borderRadius: 10, borderWidth: 2.5, borderColor: '#000', marginTop: 20, padding: 8, paddingBottom: 15, marginVertical: 5, marginLeft: 15, marginRight: 15, borderRadius: 12, elevation: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5, marginRight: 30 }}>Endereço</Text>
                            <Text style={{ paddingHorizontal: 5 }}>Cep, Rua, Número, Complemento, Bairro, Cidade, Estado</Text>
                        </View>
                    </TouchableOpacity>
                    
                </ListItens>

                <Footer>
                    <Button onPress={() => this._handlePressCancelar()} text={'Voltar'} />
                </Footer>
            </View>
        );
    }
}

export default Welcome;