import React, { PureComponent } from "react";
import { View, Button, Dimensions, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Color } from "@common";
import { Api } from "@services";

import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class Home extends PureComponent {

    constructor(props) {
        super(props);

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };
      
        this.state = {
            refreshing: false,
            isModalVisible: false,
            campanhas: [],
            campanha: 1,
            orientation: isPortrait() ? 'portrait' : 'landscape'
        }
      
        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
    }

    toggleModal = (item) => {
        this.setState({ campanha: item });
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    componentDidMount() {
        this._getCampanhas();
    }

    _onRefresh() {
        this._getCampanhas();
    }

    _getCampanhas(){
        this.setState({ refreshing: true });
        Api.campanhas().then((value) => {
            this.setState({campanhas: value});
            this.setState({ refreshing: false });
        });
    }

    render() {

        let popup_details;

        if (this.state.orientation === 'portrait') {
            popup_details = 
            <Modal isVisible={this.state.isModalVisible} style={{marginLeft: 8, marginRight: 8, marginTop: 65, marginBottom: 30}}
                onBackButtonPress={this.toggleModal}>
                <View style={{ flex: 1, backgroundColor: Color.primary }}>
                    
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Detalhes</Text>
                        
                        <View style={{ flex: 1, marginTop: -7, backgroundColor: '#fff', padding: 8, marginVertical: 5,
                         marginLeft: 15, marginRight: 15, borderRadius: 12, elevation: 10, marginBottom: 10 }} >
                            
                            <View style={{ alignItems: "flex-end", marginBottom: -20, marginTop: -5}}>
                                <FontAwesome5.Button name={'times'} color={"#BEBEBE"} size={25} 
                                style={{backgroundColor: "#ffffff" }} 
                                onPress={this.toggleModal}
                                />
                            </View> 
        
                            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5, marginRight: 40 }}>{this.state.campanha.nome}</Text>
                            
                            <Text style={{ color: "#000000", paddingHorizontal: 5 }}>Pessoas entre {this.state.campanha.idade_ini} e {this.state.campanha.idade_end} anos</Text>
                            <Text style={{ color: "#000000", paddingHorizontal: 5 }}>Periodo: {this.state.campanha.data_ini} à {this.state.campanha.data_end}</Text>
                            
                            <View style={{ flex: 1, marginTop: -5 }}>

                                <Text style={{ borderColor:'#BEBEBE', paddingHorizontal: 5, borderBottomWidth: 0.8 }}></Text>
                                
                                <ScrollView style={{ marginTop: 10, shadowColor: '#ff0000' }}>
                                    <Text style={{ fontSize: 16, color: '#8B8989', paddingHorizontal: 5 }}>{this.state.campanha.desc}</Text>
                                </ScrollView>
    
                                <Text style={{ marginTop: 10, borderColor:'#BEBEBE',  paddingHorizontal: 5, borderTopWidth: 0.8 }}></Text>
    
                            </View>

                            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5, marginRight: 40, marginTop: 0, marginBottom: 10 }}>Solicitar o Atendimento</Text>
                                    
                            <Text style={{ fontSize: 18, backgroundColor: Color.primary, color: '#ffffff', borderRadius: 10, textAlign: 'center', paddingTop: 10, paddingBottom: 10}}>Desejo Solicitar o Atendimento</Text>
                                    
        
                        </View>
        
                </View>
            </Modal>;
        }
        else {
            popup_details = 
            <Modal isVisible={this.state.isModalVisible} onBackButtonPress={this.toggleModal} 
            style={{marginLeft: 8, marginRight: 8, marginTop: 65, marginBottom: 10}}>
                <View style={{ flex: 1, backgroundColor: Color.primary }}>
                    
                    <Text style={{ color: '#fff', marginTop: -10, fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Detalhes</Text>
                        
                    <View style={{ flex: 1, marginTop: -7, backgroundColor: '#fff', padding: 8, marginVertical: 5, marginLeft: 15,
                     marginRight: 15, borderRadius: 12, elevation: 10, marginBottom: 10 }} >
                          
                        <View style={{ alignItems: "flex-end", marginBottom: -20, marginTop: -5}}>
                            <FontAwesome5.Button name={'times'} color={"#BEBEBE"} size={25} 
                            style={{backgroundColor: "#ffffff" }} 
                            onPress={this.toggleModal}
                            />
                        </View> 
    
                        <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5, marginRight: 40 }}>{this.state.campanha.nome}</Text>
                        
                        <View style={{flex: 0.3}}>
                            <ScrollView>

                                <Text style={{ color: "#000000", paddingHorizontal: 5 }}>Pessoas entre {this.state.campanha.idade_ini} e {this.state.campanha.idade_end} anos</Text>
                                <Text style={{ color: "#000000", paddingHorizontal: 5 }}>Periodo: {this.state.campanha.data_ini} à {this.state.campanha.data_end}</Text>
                                
                            </ScrollView>
                        </View>

                        <View style={{ flex: 1, marginTop: -10 }}>

                            <Text style={{ borderColor:'#BEBEBE', paddingHorizontal: 5, borderBottomWidth: 0.8 }}></Text>
                                
                            <ScrollView style={{ marginTop: 10, shadowColor: '#ff0000' }}>
                                <Text style={{ fontSize: 16, color: '#8B8989', paddingHorizontal: 5 }}>{this.state.campanha.desc}</Text>
                            </ScrollView>

                            <Text style={{ marginTop: 10, borderColor:'#BEBEBE',  paddingHorizontal: 5, borderTopWidth: 0.8 }}></Text>

                        </View>
                                
                        <Text style={{ marginTop: -10, fontSize: 18, backgroundColor: Color.primary, color: '#ffffff', borderRadius: 10, textAlign: 'center', paddingTop: 10, paddingBottom: 10}}>Desejo Solicitar o Atendimento</Text>

                    </View>
        
                </View>
            </Modal>;
        }
        
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
                            data={this.state.campanhas}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                onPress = { () => 
                                    this.toggleModal(item) 
                                }>
                                    <View style={{ backgroundColor: '#fff', padding: 8, marginVertical: 5, marginLeft: 15, marginRight: 40, borderRadius: 12, elevation: 10 }} 
                                     >
                                        <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 5, paddingHorizontal: 5 }}>{item.nome}</Text>
                                        <Text style={{ color: Color.text_secundary, paddingHorizontal: 5 }}>Periodo</Text>
                                        <Text style={{ color: '#8889', paddingHorizontal: 5 }}>{item.data_ini} à {item.data_end}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={item => item.nome}
                        />

                    </ScrollView>

                    {popup_details}

                </View>
                
            </View>
        );
    }
}

export default Home;