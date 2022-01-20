import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const POLYGON_ACTION = 'polygon/POLYGON_ACTION';

export const polygonAction = createAction(POLYGON_ACTION);

const initialState = {
    polygonList: [],
};

const polygon = handleActions(
    {
        [POLYGON_ACTION]: (state, action) => state,
    },
    initialState
);

export default polygon;
