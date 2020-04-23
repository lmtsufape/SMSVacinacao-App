import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, ScrollView, TextInput } from "react-native";
import { Color } from '@common';

class Endereco extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.2, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}> Informe seu Endereco </Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 0.5, marginBottom: 20 }}
                >
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 22 }}>CEP*</Text>
                        <TextInput
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='000.000.000'
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 22 }}>Rua*</Text>
                        <TextInput
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='000.000.000'
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 22 }}>Bairro*</Text>
                        <TextInput
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='000.000.000'
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 22 }}>Cidade*</Text>
                        <TextInput
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='000.000.000'
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 22 }}>Estado*</Text>
                        <TextInput
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='000.000.000'
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 22 }}>Numero*</Text>
                        <TextInput
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='000'
                        />
                    </View>

                </ScrollView>
                <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableHighlight
                        activeOpacity={0.3}
                        underlayColor="#1111"
                        style={{ borderRadius: 10 }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <View style={{
                            height: 60,
                            width: 100,
                            backgroundColor: Color.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            borderWidth: 2.5,
                            borderColor: '#fff',
                            elevation: 8
                        }}>
                            <Text style={{
                                marginVertical: 10,
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: '#fff'
                            }}>Voltar</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={0.3}
                        underlayColor="#1111"
                        style={{ borderRadius: 10 }}
                        onPress={() => this.props.navigation.navigate('Localizacao')}
                    >
                        <View style={{
                            height: 60,
                            width: 100,
                            backgroundColor: Color.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            borderWidth: 2.5,
                            borderColor: '#fff',
                            elevation: 8
                        }}>
                            <Text style={{
                                marginVertical: 10,
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: '#fff'
                            }}>Próximo</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

export default Endereco;