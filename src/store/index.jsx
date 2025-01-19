import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './usersReducer';

// Combinaison des réducteurs traditionnels et des slices
const rootReducer = combineReducers( {
       users: usersReducer,
} );

// Configuration du store avec Redux Toolkit
const store = configureStore( {
       reducer: rootReducer,
       // Redux DevTools et middleware sont configurés automatiquement
} );

export default store;

// export default createStore(
//   combineReducers({
//     settings: SettingsReducer,
//     user: userReducer,
//     sections: sectionsReducer,
//     answers: answerReducer,
//     formSettings: formSettingsReducter,
//   }),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

/* export default configureStore({
  reducer: {
    settings: SettingsReducer,
    user: userReducer,
    sections: sectionsReducer,
    answers: answerReducer,
    formSettings: formSettingsReducter,
    esignature:eSignatureReducer
  },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) */
