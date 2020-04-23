import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { Color } from '@common';


class Welcome extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {


        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.2, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}> Informe seu Endereco </Text>
                </View>
                <View style={{ flex: 0.7 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 22 }}>Data de Nascimento*</Text>
                        <TextInput
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='000.000.000'
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 22 }}>Telefone*</Text>
                        <TextInput
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='000.000.000'
                        />
                    </View>
                </View>
                <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableHighlight
                        activeOpacity={0.3}
                        underlayColor="#1111"
                        style={{ borderRadius: 10 }}
                        onPress={() => props.onTest('Ola')}
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
                        onPress={() => props.navigation.navigate('Cns')}
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

export default Welcome;