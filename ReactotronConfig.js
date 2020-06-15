import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from "@react-native-community/async-storage";

const reactotron = Reactotron
    .configure({ name: 'GiftCard', host: '192.168.0.105', port: 9292 }) // controls connection & communication settings
    .use(reactotronRedux())
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!

export default reactotron