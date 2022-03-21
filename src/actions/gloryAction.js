import { ADD_CARGO, REMOVE_CARGO } from './types';

export const addCargo = (cargoData) => {
    return {
        type: ADD_CARGO,
        payload: cargoData,
    };
};

export const removeCargo = () => {
    return {
        type: REMOVE_CARGO,
    };
};
