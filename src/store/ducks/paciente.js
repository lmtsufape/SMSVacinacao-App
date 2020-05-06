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
const INITIAL_STATE = [
];

/* Functions Reducers */
const addPaciente = (state = INITIAL_STATE, action) => {
    let result = true
    state.forEach((item) => {
        if (item.cns === action.value.cns) {
            result = false;
        }
    })

    if (result) {
        return [...state, action.value]
    } else {
        return state;
    }

};

const changePaciente = (state = INITIAL_STATE, action) => {
    return state[action.cns] = action.value;
};

const removePaciente = (state = INITIAL_STATE, action) => {
    delete state[action.cns];
    return state;
};

const getPaciente = (state = INITIAL_STATE, action) => {
    return state[action.cns];
};

const listPaciente = (state = INITIAL_STATE, action) => {
    return state;
};


/* Create reducers */
export default createReducer(INITIAL_STATE, {
    [Types.ADD_PACIENTE]: addPaciente,
    [Types.CHANGE_PACIENTE]: changePaciente,
    [Types.REMOVE_PACIENTE]: removePaciente,
    [Types.GET_PACIENTE]: getPaciente,
    [Types.LIST_PACIENTE]: listPaciente,
})

