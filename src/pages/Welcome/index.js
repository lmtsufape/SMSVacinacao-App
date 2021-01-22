import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from "@common";
import LottieView from 'lottie-react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ConfigActions } from "@store/ducks/config";

const slides = [
  {
    key: 1,
    title: 'Seja bem vindo ao App',
    text: 'Estamos nos empenhando para proteger você e sua família contra vírus e infeções',
    animation: <View style={{ marginTop: -80, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <LottieView
        source={require('@assets/animation4_welcome.json')}
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
    text: 'Com este app você pode solicitar a visita de um agente de saúde à sua casa para receber uma determinada vacina.',
    animation: <View style={{ marginTop: -80, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <LottieView
        source={require('@assets/animation6_welcome.json')}
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
    text: 'Através de um formulário simples, onde pegamos seu endereço e localização você estará apto a fazer uma solicitação de atendimento domiciliar e receber sua vacina em casa.',
    animation: <View style={{ marginTop: -80, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <LottieView
        source={require('@assets/animation10_welcome.json')}
        autoPlay
        loop={true}
        hardwareAccelerationAndroid={true}
      />
    </View>,
    backgroundColor: '#febe29',
  },
  {
    key: 4,
    title: 'Funcionalidades',
    text: 'Pronto, em poucos dias um profissional agente de saúde será direcionado até o seu local para aplicar sua vacina.',
    animation: <View style={{ marginTop: -80, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <LottieView
        source={require('@assets/animation13_welcome.json')}
        autoPlay
        loop={true}
        hardwareAccelerationAndroid={true}
      />
    </View>,
    backgroundColor: '#febe29',
  },
  {
    key: 5,
    title: 'Funcionalidades',
    text: 'Você também pode pesquisar por postos de saúdes próximos de você e receber sua vacina no local',
    animation: <View style={{ marginTop: -80, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <LottieView
        source={require('@assets/animation2_welcome.json')}
        autoPlay
        loop={true}
        hardwareAccelerationAndroid={true}
      />
    </View>,
    backgroundColor: '#22bcb5',
  },
  {
    key: 5,
    title: 'Funcionalidades',
    text: 'Vamos nessa, agora você está pronto para a batalha contra vírus e infecções',
    animation: <View style={{ marginTop: -80, flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <LottieView
        source={require('@assets/animation5_welcome.json')}
        autoPlay
        loop={true}
        hardwareAccelerationAndroid={true}
      />
    </View>,
    backgroundColor: '#22bcb5',
  },
];

class Welcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      welcome: true
    }
  }

  _renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 40 }}>
            <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'normal', paddingTop: 3 }}>{item.title}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 27, fontWeight: 'bold', margin: 0 }} > VacinaGaranhuns</Text>
          </View>
        </View>
        <View style={{ margin: 15 }}>
          <Text style={{ color: '#303030', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{item.text}</Text>
        </View>


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

  _onDone = () => {
    this.props.noWelcome();
  }

  render() {
    return (
      <AppIntroSlider style={{ backgroundColor: Color.primary }}
        renderItem={this._renderItem}
        data={slides}
        onDone={this._onDone}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        showPrevButton={true}
        renderPrevButton={this._renderPrevButton}
      />
    );
  }
}

const mapStateToProps = state => ({
  config: state.configState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ConfigActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);

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