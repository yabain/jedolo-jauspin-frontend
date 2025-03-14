

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

//  users Import 
import disableUsersReducer from './users/disable/reducer';


// annonces users Import 
import usersSAnnoncesReducer from './annonces/data/users';
import getUsersAnnoncesReducer from './annonces/getUsersAnnonces/reducer';


// annonces comments Import 
import getUsersAnnoncesCommentsReducer from './comments/get/reducer';
import addUsersAnnoncesCommentsReducer from './comments/add/reducer';


// annonces signal Import 
import getUserAnnonceSignalsReducer from './signal/get/reducer';
import addUserAnnonceSignalReducer from './signal/add/reducer';


// annonces Sponsor Import 
import addSponsorReducer from './sponsor/add/reducer';
import updateSponsorReducer from './sponsor/update/reducer';

// annonces Sponsors Import 
import getSponsorsReducer from './sponsor/get/reducer';

// annonce transaction Import 
import addTransactionReducer from './transaction/add/reducer';
import getTransactionReducer from './transaction/get/reducer';

// annonce transactions Import 
import getTransactionsReducer from './transaction/gets/reducer';

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

       // user 
       disableUsers: disableUsersReducer,



       // users 
       usersAnnonces: usersSAnnoncesReducer,
       getUsersAnnonces: getUsersAnnoncesReducer,



       // comments
       getUsersAnnoncesComments: getUsersAnnoncesCommentsReducer,
       addUsersAnnoncesComments: addUsersAnnoncesCommentsReducer,



       // annonce
       getUserAnnonceSignals: getUserAnnonceSignalsReducer,
       addUserAnnonceSignal: addUserAnnonceSignalReducer,



       // Sponsors
       getSponsors: getSponsorsReducer,



       // Sponsor
       addSponsor: addSponsorReducer,
       updateSponsor: updateSponsorReducer,



       // transaction
       addTransaction: addTransactionReducer,
       getTransaction: getTransactionReducer,



       // transactions
       getTransactions: getTransactionsReducer,
} );

// Configuration du store avec Redux Toolkit
const store = configureStore( { reducer: rootReducer, middleware: ( getDefaultMiddleware ) => getDefaultMiddleware( { serializableCheck: false } ).concat( thunk ) } );



export default store;

