import React, { PureComponent } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Color } from "@common";

class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        }

        this.fakes = [
            {
                nome: 'H1N1',
                desc: 'Teste',
                data_ini: '02-04-2020',
                data_end: '02-04-2020'
            },
            {
                nome: 'Covid-19',
                desc: 'Teste',
                data_ini: '02-04-2020',
                data_end: '02-04-2020'
            }
        ]
    }


    componentDidMount() {

    }


    _onRefresh() {
        this.setState({ refreshing: true });
        new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
            this.setState({ refreshing: false });
        });
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
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Este Mês</Text>
                        <FlatList
                            data={this.fakes}
                            renderItem={({ item }) =>
                                <View style={{ backgroundColor: '#fff', padding: 8, marginVertical: 5, marginLeft: 15, marginRight: 40, borderRadius: 12, elevation: 10 }} >
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5 }}>{item.nome}</Text>
                                    <Text style={{ color: Color.text_secundary, paddingHorizontal: 5 }}>Periodo</Text>
                                    <Text style={{ color: '#8889', paddingHorizontal: 5 }}>{item.data_ini} à {item.data_end}</Text>
                                </View>
                            }
                            keyExtractor={item => item.nome}
                        />

                    </ScrollView>
                </View>
            </View>
        );
    }
}


export default Home;