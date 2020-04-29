import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { Color } from '@common';

export default (props) => {
    return (
        <View>
            <Text>Perfil</Text>
            <TouchableHighlight
                activeOpacity={0.3}
                underlayColor="#1111"
                style={{ borderRadius: 10, marginBottom: 10 }}
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
                style={{ borderRadius: 10, marginBottom: 10 }}
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
    );
}