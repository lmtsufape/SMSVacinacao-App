import configReducer from './config';
import pacienteReducer from './paciente';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    configState: configReducer,
    pacienteState: pacienteReducer
});