import { createActions, createReducer } from 'reduxsauce';

/* Types and actions */
export const { Types, Creators } = createActions({
    noWelcome: [''],
});


/* Valaue init */
const INITIAL_STATE = {
    welcome: true,
};


/* Functions Reducers */
const noWelcome = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        welcome: false
    }
};

/* Create reducers */
export default createReducer(INITIAL_STATE, {
    [Types.NO_WELCOME]: noWelcome,
})