

import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './users/usersReducer';
import setUsersReducer from './users/setUsersReducer';

// annonces user Import
import annoncesReducer from './annonces/data/dataReducer';
import getAnnoncesReducer from './annonces/getUserAnnonces/getReducer';
import addAnnoncesReducer from './annonces/addAnnonce/reducer';
import deleteAnnoncesReducer from './annonces/deleteAnnonce/reducer'
import updateUserAnnoncesReducer from './annonces/updateAnnonce/reducer'
import bannedUserAnnoncesReducer from './annonces/banAnnonce/reducer'

// annonces users Import 
import usersSAnnoncesReducer from './annonces/data/users';
import getUsersAnnoncesReducer from './annonces/getUsersAnnonces/reducer';


// annonces users Import 
import getUsersAnnoncesCommentsReducer from './comments/get/reducer';
import addUsersAnnoncesCommentsReducer from './comments/add/reducer';

// Combinaison des réducteurs traditionnels et des slices
const rootReducer = combineReducers( {

       users: usersReducer,
       setUsers: setUsersReducer,

       annonces: annoncesReducer,
       getAnnonces: getAnnoncesReducer,
       addAnnonces: addAnnoncesReducer,
       deleteUserAnnonce: deleteAnnoncesReducer,
       updateUserAnnonce: updateUserAnnoncesReducer,
       bannedUserAnnonce: bannedUserAnnoncesReducer,

       // users 
       usersAnnonces: usersSAnnoncesReducer,
       getUsersAnnonces: getUsersAnnoncesReducer,

       // comments
       getUsersAnnoncesComments: getUsersAnnoncesCommentsReducer,
       addUsersAnnoncesComments: addUsersAnnoncesCommentsReducer,

} );

// Configuration du store avec Redux Toolkit
const store = configureStore( {
       reducer: rootReducer,
       // Redux DevTools et middleware sont configurés automatiquement

       // Désactiver la vérification de la sérialisation pour les actions spécifiques
       middleware: ( getDefaultMiddleware ) =>
              getDefaultMiddleware( {
                     serializableCheck: false
              } ).concat( thunk ), // Ajout de redux-thunk explicitement,
} );



export default store;

