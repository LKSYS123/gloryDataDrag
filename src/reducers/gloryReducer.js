import { ADD_CARGO, REMOVE_CARGO } from '../actions/types';

const initialState = {
    cargoList: [],
    // cargoList: 3,
};

const gloryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARGO:
            return {
                ...state,
                cargoList: action.payload,
                // cargoList: state.cargoList + 1,
            };
        case REMOVE_CARGO:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default gloryReducer;
