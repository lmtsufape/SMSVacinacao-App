import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

const RNRedux = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
};

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(RNRedux));
