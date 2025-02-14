import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './usersReducer';
import setUsersReducer from './setUsersReducer';

// annonces Import
import annoncesReducer from './annonces/annoncesReducer';
import getAnnoncesReducer from './annonces/getReducer';
import addAnnoncesReducer from './annonces/addAnnonce/reducer';

// Combinaison des réducteurs traditionnels et des slices
const rootReducer = combineReducers( {

       users: usersReducer,
       setUsers: setUsersReducer,

       annonces: annoncesReducer,
       getAnnonces: getAnnoncesReducer,
       addAnnonces: addAnnoncesReducer,
} );

// Configuration du store avec Redux Toolkit
const store = configureStore( {
       reducer: rootReducer,
       // Redux DevTools et middleware sont configurés automatiquement

       // Désactiver la vérification de la sérialisation pour les actions spécifiques
       middleware: ( getDefaultMiddleware ) =>
              getDefaultMiddleware( {
                     serializableCheck: {
                            ignoredActions: [ 'getList/fulfilled' ],  // Ici, on ignore les actions spécifiques
                     },
              } ),
} );



export default store;

