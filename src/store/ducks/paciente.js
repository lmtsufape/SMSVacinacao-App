import { createActions, createReducer } from 'reduxsauce';

/* Types and actions */
export const { Types, Creators } = createActions({
    addPaciente: ['value'],
    changePaciente: ['cns', 'value'],
    removePaciente: ['cns'],
    getPaciente: ['cns'],
    listPaciente: [''],
});

/* Valaue init */
const INITIAL_STATE = {
};

/* Functions Reducers */
const addPaciente = (state = INITIAL_STATE, action) => {
    const newValue = {};
    newValue[action.value.cns] = action.value;
    return state[action.value.cns] ? state : { ...state, ...newValue };
};

const changePaciente = (state = INITIAL_STATE, action) => {
    const newValue = state;
    const data  = { ...newValue[action.cns], ...action.value };
    console.log("changePaciente", data);
    newValue[action.cns] = data;
    
    return { ...newValue };
};

const removePaciente = (state = INITIAL_STATE, action) => {
    const excludeValue = state;
    delete excludeValue[action.cns];
    return { ...excludeValue };
};

const getPaciente = (state = INITIAL_STATE, action) => {
    return state[action.cns];
};

const listPaciente = (state = INITIAL_STATE, action) => {
    return Object.values(state);
};


/* Create reducers */
export default createReducer(INITIAL_STATE, {
    [Types.ADD_PACIENTE]: addPaciente,
    [Types.CHANGE_PACIENTE]: changePaciente,
    [Types.REMOVE_PACIENTE]: removePaciente,
    [Types.GET_PACIENTE]: getPaciente,
    [Types.LIST_PACIENTE]: listPaciente,
})

