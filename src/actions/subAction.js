import { ADD_SUB, REMOVE_SUB } from './types';

export const addSub = () => {
    return {
        type: ADD_SUB,
    };
};

export const removeSub = () => {
    return {
        type: REMOVE_SUB,
    };
};
