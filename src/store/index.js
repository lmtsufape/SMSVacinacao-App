import { createStore } from 'redux';
import { Reducers } from './ducks';
import { persistStore, persistReducer, } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import Reactotron from "../../ReactotronConfig";
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import AsyncStorage from "@react-native-community/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, Reducers)

const store = createStore(persistedReducer, Reactotron.createEnhancer());

const persistor = persistStore(store);

export { store, persistor };
