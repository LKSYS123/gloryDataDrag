import { combineReducers } from 'redux';
// import tutorials from "./tutorials";
import tutorialReducer from './tutorialReducer';
import gloryReducer from './gloryReducer';
import subReducer from './subReducer';

// export default combineReducers({
//   tutorials,
// });

// tutorialList: cargotutorial,
const rootReducer = combineReducers({
    tutorialReducer,
    gloryReducer,
    subReducer,
});

export default rootReducer;
