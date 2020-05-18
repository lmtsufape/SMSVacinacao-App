import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, Animated } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import LottieView from 'lottie-react-native';
import { Color } from '@common';

const animateButtonOpacity = new Animated.Value(0);

class Localizacao extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tela: 1,
            complete: false,
            lat: '',
            lng: '',
        }
    }

    componentDidMount() {
        this._getLocation();

    }

    _getLocation() {
        Geolocation.getCurrentPosition(
            position => {
                console.log('loc:', position.coords.latitude);
                this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
                this._handleComplete();
                this.props.onDataFilled({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            error => {
            },
            { enableHighAccuracy: false, timeout: 8000, maximumAge: 1000 }
        );
    }

    _handleComplete() {
        setTimeout(() => {
            this.setState({ complete: true });
            Animated.timing(animateButtonOpacity, {
                toValue: 1,
                delay: 400,
                useNativeDriver: true,
            }).start();
        }, 1000);
    }

    _handleOnPressFinish() {
        this.props.onPressFinish();
        if(this.state.tela === 1){
            this.props.navigation.navigate('Perfil');
        }
        else{
            alert('Perfil Cadastrado');
            this.props.onPressCancel();
        }
    }

    render() {

        if(this.props.route.params){
            const t = this.props.route.params.tela;
            this.setState({ tela: t });
        }
        else{
            this.setState({ tela: 1 });
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.2, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 23, fontWeight: 'bold' }}> Buscando suas coordenadas de GPS </Text>
                </View>
                <View style={{ flex: 0.4, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    {this.state.complete ?
                        <LottieView
                            source={require('@assets/reskinnedCheckmark.json')}
                            autoPlay
                            loop={false}
                            hardwareAccelerationAndroid={true}
                        /> :
                        <LottieView
                            source={require('@assets/bluePreloader.json')}
                            style={{ flex: 1 }}
                            autoPlay
                            hardwareAccelerationAndroid={true}
                        />
                    }
                </View>
                <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Animated.View
                        style={{ opacity: animateButtonOpacity }}
                    >
                        <TouchableHighlight
                            activeOpacity={0.3}
                            underlayColor="#1111"
                            style={{ borderRadius: 10 }}
                            onPress={() => this._handleOnPressFinish()}
                        >
                            <View style={{
                                height: 60,
                                width: 200,
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
                                }}>Terminar</Text>
                            </View>
                        </TouchableHighlight>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

export default Localizacao;