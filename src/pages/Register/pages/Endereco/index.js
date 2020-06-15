import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, ScrollView, TextInput } from "react-native";
import { SubTitle, ErrorMessage, ListItens, Footer, Button, ItemInput } from '../components';
import { TextInputMask } from 'react-native-masked-text';
import { Api } from '@services';
import { Color } from '@common';

class Endereco extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            haveInvalidData: false,
            showErrorMessege: false,
            errorMessege: '',
            cep: '',
            rua: '',
            num: '',
            comp: '',
            bairro: '',
            cidade: '',
            uf: '',
        }

        this.textInput = []
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
        }, 100)
    }

    _handleCep(ref) {
        if (ref.isValid()) {
            Api.cep(ref.getRawValue()).then((request) => {
                request.logradouro === "" ? this.textInput[1].setNativeProps({ editable: true, style: { backgroundColor: '#fff' } }) : this.setState({ rua: request.logradouro });
                request.bairro === "" ? this.textInput[4].setNativeProps({ editable: true, style: { backgroundColor: '#fff' } }) : this.setState({ bairro: request.bairro });
                request.localidade === "" ? this.textInput[5].setNativeProps({ editable: true, style: { backgroundColor: '#fff' } }) : this.setState({ cidade: request.localidade });
                request.uf === "" ? this.textInput[6].setNativeProps({ editable: true, style: { backgroundColor: '#fff' } }) : this.setState({ uf: request.uf });
                this.textInput[2].getElement().focus();
            });
        }
    }


    _handlePressCancelar() {
        this.props.navigation.goBack();
    }

    _handlePressProximo() {
        if (this.state.haveInvalidData === true) {
            this.setState({ showErrorMessege: true, errorMessege: 'Alguns dados estão incorreto ou faltando!' });
        } else if (this.state.cep === '') {
            this.setState({ showErrorMessege: true, errorMessege: 'Preencha os campos obrigatorios!' });
        } else if (this.state.rua === '') {
            this.setState({ showErrorMessege: true, errorMessege: 'Preencha os campos obrigatorios!' });
        } else if (this.state.num === '') {
            this.setState({ showErrorMessege: true, errorMessege: 'Preencha os campos obrigatorios!' });
        } else {
            const dados = {
                cep: this.textInput[0].getRawValue(),
                rua: this.state.rua,
                num: this.state.num,
                complemento: this.state.comp,
                bairro: this.state.bairro,
                cidade: this.state.cidade,
                uf: this.state.uf,
            };
            this.props.onDataFilled(dados);
            this.props.navigation.navigate('Localizacao');
        }

    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <SubTitle>Preencha os dados</SubTitle>
                <ErrorMessage
                    show={this.state.showErrorMessege}
                    message={this.state.errorMessege}
                />
                <ListItens>

                    <ItemInput name={'CEP*'}>
                        <TextInputMask
                            ref={ref => this.textInput[0] = ref}
                            onSubmitEditing={() => this.textInput[1].focus()}
                            type={'zip-code'}
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='00000-000'
                            value={this.state.cep}
                            onEndEditing={() => { this._handleCep(this.textInput[0]) }}
                            onChangeText={(value) => {
                                this.setState({ cep: value });
                                this._handleValidValue(this.textInput[0]);
                            }}
                        />
                    </ItemInput>

                    <ItemInput name={'Rua*'}>
                        <TextInput
                            ref={ref => this.textInput[1] = ref}
                            onSubmitEditing={() => this.textInput[2].getElement().focus()}
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='Av Exemplo '
                            value={this.state.rua}
                            onEndEditing={() => this._handleValidValue(this.textInput[1])}
                            onChangeText={(value) => this.setState({ rua: value })}
                        />
                    </ItemInput>

                    <ItemInput name={'Número*'}>
                        <TextInputMask
                            ref={ref => { this.textInput[2] = ref }}
                            onSubmitEditing={() => this.textInput[3].focus()}
                            type={'custom'}
                            options={{
                                mask: '9999'
                            }}
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            keyboardType={'numeric'}
                            placeholder='000'
                            value={this.state.num}
                            onChangeText={(value) => {
                                this.setState({ num: value });
                                this._handleValidValue(this.textInput[2]);
                            }}
                        />
                    </ItemInput>

                    <ItemInput name={'Complemento'}>
                        <TextInput
                            ref={ref => this.textInput[3] = ref}
                            onSubmitEditing={() => this.textInput[4].focus()}
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='Exemplo '
                            value={this.state.comp}
                            onEndEditing={() => this._handleValidValue(this.textInput[3])}
                            onChangeText={(value) => this.setState({ comp: value })}
                        />
                    </ItemInput>

                    <ItemInput name={'Bairro*'}>
                        <TextInput
                            ref={ref => this.textInput[4] = ref}
                            onSubmitEditing={() => this.textInput[5].focus()}
                            editable={false}
                            style={{ backgroundColor: '#DCDCDC', borderRadius: 6 }}
                            placeholder='Bairro Exemplo '
                            value={this.state.bairro}
                            onEndEditing={() => this._handleValidValue(this.textInput[4])}
                            onChangeText={(value) => this.setState({ bairro: value })}
                        />
                    </ItemInput>

                    <ItemInput name={'Cidade*'}>
                        <TextInput
                            ref={ref => this.textInput[5] = ref}
                            onSubmitEditing={() => this.textInput[6].getElement.focus()}
                            editable={false}
                            style={{ backgroundColor: '#DCDCDC', borderRadius: 6 }}
                            placeholder='Cidade Exemplo '
                            value={this.state.cidade}
                            onEndEditing={() => this._handleValidValue(this.textInput[5])}
                            onChangeText={(value) => this.setState({ cidade: value })}

                        />
                    </ItemInput>

                    <ItemInput name={'Estado*'}>
                        <TextInputMask
                            ref={ref => { this.textInput[6] = ref }}
                            onSubmitEditing={() => this._handlePressProximo()}
                            type={'custom'}
                            options={{
                                mask: 'AA'
                            }}
                            editable={false}
                            style={{ backgroundColor: '#DCDCDC', borderRadius: 6 }}
                            autoCapitalize={"characters"}
                            placeholder='PE'
                            value={this.state.uf}
                            onChangeText={(value) => {
                                this.setState({ uf: value });
                                this._handleValidValue(this.textInput[6]);
                            }}
                        />
                    </ItemInput>

                </ListItens>

                <Footer>
                    <Button onPress={() => this._handlePressCancelar()} text={'Voltar'} />
                    <Button onPress={() => this._handlePressProximo()} text={'Próximo'} />
                </Footer>
            </View>
        );
    }
}

export default Endereco;