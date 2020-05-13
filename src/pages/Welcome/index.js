import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from "@common";
import LottieView from 'lottie-react-native';

const slides = [
  {
    key: 1,
    title: 'Seja bem vindo ao App',
    text: '',
    animation: <View style={{ marginTop: -80, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <LottieView
                    source={require('@assets/animation1_welcome.json')}
                    autoPlay
                    loop={true}
                    hardwareAccelerationAndroid={true}
                />
            </View>,
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Funcionalidades',
    text: 'Com este app você pode solicitar a visita de um a gente de saúde a sua casa para receber uma determinada vacina.',
    animation: <View style={{ marginTop: -80, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <LottieView
                    source={require('@assets/animation2_welcome.json')}
                    autoPlay
                    loop={true}
                    hardwareAccelerationAndroid={true}
                />
            </View>,
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Funcionalidades',
    text: 'Com este app você pode verificar unidades de saúde próximas a você',
    animation: <View style={{ marginTop: -80, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <LottieView
                    source={require('@assets/animation3_welcome.json')}
                    autoPlay
                    loop={true}
                    hardwareAccelerationAndroid={true}
                />
            </View>,
    backgroundColor: '#22bcb5',
  }
];
 
export default class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            welcome: true
        }
    }

    _renderItem = ({ item }) => {
      return (
        <View style={{flex: 1}}>
            
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 40 }}>
                    <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'normal', paddingTop: 3 }}>{item.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center',  }}>
                    <Text style={{ color: '#fff', fontSize: 27, fontWeight: 'bold', margin: 0 }} > VacinaGaranhuns</Text>
                </View>
            </View>

            <Text style={{ opacity: 0.8, fontWeight: 'bold', fontSize: 20, marginTop: 10, paddingHorizontal: 10, paddingRight: 0, textAlign: 'justify' }}>{item.text}</Text>

            {item.animation}
            
            
        </View>
      );
    }
  
    _renderNextButton = () => {
      return (
        <View style={styles.buttonCircle}>
          <Icon
            name="md-arrow-round-forward"
            color="rgba(0, 0, 0, .9)"
            size={24}
          />
        </View>
      );
    };
    _renderPrevButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="md-arrow-round-back"
              color="rgba(0, 0, 0, .9)"
              size={24}
            />
          </View>
        );
      };
    _renderDoneButton = () => {
      return (
        <View style={styles.buttonCircle}>
          <Icon
            name="md-checkmark-circle"
            color="rgba(0, 0, 0, .9)"
            size={24}
          />
        </View>
      );
    };

    _onDone = () =>{
        this.setState({ welcome: false });
    }
  
    render() {
        if(this.state.welcome){
            return <AppIntroSlider style={{backgroundColor: Color.primary}}
                renderItem={this._renderItem} 
                data={slides} 
                onDone={this._onDone}
                renderDoneButton={this._renderDoneButton}
                renderNextButton={this._renderNextButton}
                showPrevButton={true}
                renderPrevButton={this._renderPrevButton}
                />;
        }
        else{
          this.props.navigation.navigate('Home');
          return null
        }
    }
  }

const styles = StyleSheet.create({
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    //[...]
});