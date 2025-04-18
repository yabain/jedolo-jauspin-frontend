

import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import updateUserProfilReducer from './users/updateprofile/reducer';
import setUsersReducer from './users/setUsersReducer';

// annonces user Import
import annoncesReducer from './annonces/data/dataReducer';
import getAnnoncesReducer from './annonces/getUserAnnonces/getReducer';
import addAnnoncesReducer from './annonces/addAnnonce/reducer';
import deleteAnnoncesReducer from './annonces/deleteAnnonce/reducer'
import updateUserAnnoncesReducer from './annonces/updateAnnonce/reducer'
import updateAnnonceNbrViewReducer from './annonces/updateNbrView/reducer'
import bannedUserAnnoncesReducer from './annonces/banAnnonce/reducer'
import uploadAnnonceImageReducer from './annonces/uploadImage/reducer'

//  users Import 
import disableUsersReducer from './users/disable/reducer';
import getProfilReducer from './users/getProfil/reducer';


// annonces users Import 
import usersSAnnoncesReducer from './annonces/data/users';
import getUsersAnnoncesReducer from './annonces/getUsersAnnonces/reducer';
import getLastAnnoncesPostNbrReducer from './annonces/getLastAnnoncesPostNbr/reducer';


// annonces comments Import 
import getUsersAnnoncesCommentsReducer from './comments/get/reducer';
import addUsersAnnoncesCommentsReducer from './comments/add/reducer';


// annonces signal Import 
import getUserAnnonceSignalsReducer from './signal/get/reducer';
import addUserAnnonceSignalReducer from './signal/add/reducer';

// annonces signals Import 
import getUsersAnnonceSignalsReducer from './signal/gets/reducer';


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

// city Import 
import getTopCityReducer from './city/topCity/reducer';

// Combinaison des réducteurs traditionnels et des slices
const rootReducer = combineReducers({

       updateUserProfil: updateUserProfilReducer,
       setUsers: setUsersReducer,

       annonces: annoncesReducer,
       getAnnonces: getAnnoncesReducer,
       addAnnonces: addAnnoncesReducer,
       deleteUserAnnonce: deleteAnnoncesReducer,
       updateUserAnnonce: updateUserAnnoncesReducer,
       bannedUserAnnonce: bannedUserAnnoncesReducer,
       updateAnnonceNbrView: updateAnnonceNbrViewReducer,
       uploadAnnonceImage: uploadAnnonceImageReducer,

       // user 
       disableUsers: disableUsersReducer,
       getProfil: getProfilReducer,



       // users 
       usersAnnonces: usersSAnnoncesReducer,
       getUsersAnnonces: getUsersAnnoncesReducer,
       getLastAnnoncesPostNbr: getLastAnnoncesPostNbrReducer,



       // comments
       getUsersAnnoncesComments: getUsersAnnoncesCommentsReducer,
       addUsersAnnoncesComments: addUsersAnnoncesCommentsReducer,



       // signal
       getUserAnnonceSignals: getUserAnnonceSignalsReducer,
       addUserAnnonceSignal: addUserAnnonceSignalReducer,



       // signals
       getUsersAnnonceSignals: getUsersAnnonceSignalsReducer,



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



       // city
       getTopCity: getTopCityReducer,
});

// Configuration du store avec Redux Toolkit
const store = configureStore({ reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk) });



export default store;

