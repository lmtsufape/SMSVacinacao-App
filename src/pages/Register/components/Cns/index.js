import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, TextInput, Image, Animated } from "react-native";
import { Color } from '@common';

const cns = require('@assets/cns.png');
const cnsVersus = require('@assets/cns_versus.png');

const animateRotateY = new Animated.Value(0);
const animatedScaleY = new Animated.Value(0);
const animatedSourceImage = new Animated.Value(0);
const animateOpacity = new Animated.Value(0);

const setAnimateOpacity = animateOpacity.interpolate({
    inputRange: [0, 10, 90, 180],
    outputRange: [0, 1, 1, 0]
});

const setAnimateOpacityVersus = animateOpacity.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [0, 1, 1]
});
const setAnimatedScaleY = animatedScaleY.interpolate({
    inputRange: [0, 180],
    outputRange: [0.9, 1.1]
});
const setAnimateRotateY = animateRotateY.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
});
const setAnimatedSourceImage = animatedSourceImage.interpolate({
    inputRange: [0, 10, 180],
    outputRange: [cnsVersus, cns, cnsVersus]
});

class Cns extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            animateState: 0
        }
    }

    componentDidMount() {
        this._handleAnimation();
    }

    _handleAnimation() {

        if (this.state.animateState === 0) {
            Animated.sequence([
                Animated.timing(animateOpacity, { toValue: 10, delay: 300, useNativeDriver: true }),
                Animated.parallel([
                    Animated.timing(animateRotateY, { toValue: 180, delay: 1000, useNativeDriver: true }),
                    Animated.timing(animateOpacity, { toValue: 180, delay: 1000, useNativeDriver: true }),

                ]),
                Animated.timing(animatedScaleY, { toValue: 180, delay: 1000, useNativeDriver: true })
            ]).start();
        }

    }

    render() {


        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.2, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}> Olá, preencha o campo com o número do CNS. </Text>
                </View>
                <View
                    style={{ flex: 0.6 }}
                >
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <Animated.View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 5,
                                opacity: setAnimateOpacity,
                                transform: [{ rotateY: setAnimateRotateY }, { scale: setAnimatedScaleY }]
                            }}
                        >
                            <Image
                                style={{
                                    flex: 1,
                                    resizeMode: "contain",
                                }}
                                source={cns}
                            />
                        </Animated.View>
                        <Animated.View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 4,
                                opacity: setAnimateOpacityVersus,
                                transform: [{ rotateY: setAnimateRotateY }, { scale: setAnimatedScaleY }]
                            }}
                        >
                            <Image
                                style={{
                                    flex: 1,
                                    resizeMode: "contain",
                                }}
                                source={cnsVersus}
                            />
                        </Animated.View>
                    </View>
                    <View style={{ flex: 0.5, marginBottom: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 22 }}>CNS*</Text>
                        <TextInput
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='000.000.000'
                        />
                        <Text style={{ color: '#fff', fontSize: 12 }}>CNS, Cartão Nacional de Saúde.</Text>
                    </View>

                </View>
                <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableHighlight
                        activeOpacity={0.3}
                        underlayColor="#1111"
                        style={{ borderRadius: 10 }}
                        onPress={() => this.props.onPressCancel()}
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
                            }}>Cancelar</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={0.3}
                        underlayColor="#1111"
                        style={{ borderRadius: 10 }}
                        onPress={() => this.props.navigation.navigate('NascTel')}
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
                            }}>Proseguir</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

export default Cns;