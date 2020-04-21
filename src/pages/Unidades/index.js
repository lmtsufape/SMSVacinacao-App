import React, { PureComponent } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView, Linking } from "react-native";
import { Icon } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import { Color } from "@common";
import { Api } from "@services";


class Unidades extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            unidades: [],
            coords: null
        }
    }

    componentDidMount() {
        this._getUnidades();
    }

    _onRefresh() {
        this._getUnidades();
    }

    _getUnidades() {
        this.setState({ refreshing: true });
        Geolocation.getCurrentPosition(
            position => {
                Api.unidades(40000, position.coords.latitude, position.coords.longitude).then((value) => {
                    this.setState({ unidades: value });
                    this.setState({ refreshing: false, coords: position.coords });
                });
            },
            error => {
            },
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 1000 }
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Color.primary }}>
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
                <View>
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
                    >
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Unidades</Text>
                        <FlatList
                            data={this.state.unidades}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 8, marginVertical: 5, marginLeft: 15, marginRight: 40, borderRadius: 12, elevation: 10 }}
                                    onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${this.state.coords.latitude},${this.state.coords.longitude}&destination=${item.lat},${item.lng}`)}
                                >
                                    <View style={{ flex: 0.92 }}>
                                        <Text style={{ color: '#1119', fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5 }}>{item.nome}</Text>
                                        <Text style={{ color: Color.text_secundary, paddingHorizontal: 5 }}>Rua: {item.rua}, {item.num}</Text>
                                        <Text style={{ color: Color.text_secundary, paddingHorizontal: 5 }}>Bairro: {item.bairro}</Text>
                                        <Text style={{ color: '#8889', paddingHorizontal: 5 }}>Distância: à {item.distance} metros de você</Text>
                                    </View>
                                    <View style={{ flex: 0.08, justifyContent: 'center', paddingBottom: 5 }}>
                                        <Icon
                                            name='angle-right'
                                            type='font-awesome'
                                            color='#2222'
                                            size={30}
                                        />
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={item => item.nome}
                        />

                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default Unidades;