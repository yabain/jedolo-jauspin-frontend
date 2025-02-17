import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { paths } from 'src/routes/paths';
import { enqueueSnackbar } from 'notistack';
import * as usersService from './users.service';

// Action pour charger l'organisation existante
export const loadUsers = createAsyncThunk( 'users/load', async ( userId ) =>
       usersService.getUser( userId )
);

// Nouvelle action pour ajouter un utilisateur
export const addUser = createAsyncThunk(
       'users/addUser',
       async ( dataToAdd ) => usersService.addUser( dataToAdd ) // Passez uniquement `dataToAdd` à l'organisation service
);

// Nouvelle action pour ajouter le profil d'un utilisateur
export const addProfilUser = createAsyncThunk(
       'users/addProfilUser',
       async ( dataToAdd ) => usersService.addProfilUser( dataToAdd ) // Passez uniquement `dataToAdd` à l'organisation service
);

// Nouvelle action pour mdoifier le mot de passe de utilisateur
export const updatePassword = createAsyncThunk( 'users/updatePassword', async ( PasswordObject ) =>
       usersService.updatePassword( PasswordObject )
);

// Nouvelle action pour mdoifier le mot de passe de utilisateur
export const uploadImage = createAsyncThunk( 'users/uploadImage', async ( imageObject ) =>
       usersService.uploadImage( imageObject )
);


export const usersSlice = createSlice( {
       name: 'users',
       initialState: {
              users: {},
              userObject: {},
              passwordObject: {},
              isLoading: false,
              msg: '', // Remplace 'error' par 'msg'
              isAddingUser: false,
              addUserSuccess: false,
              updatePasswordSuccess: false,
              imageObjectGet: {},
              isUploadingImage: false,
              uploadImagedSuccess: false,
              isUpdatingProfil: false,
              isUpdatingProfilSuccess: false,
       },
       reducers: {
              initUsers: ( state, action ) =>
              {
                     state.userObject = { ...action.payload };
              },
              addedUser: ( state, action ) =>
              {
                     state.users = { ...state.users, ...action.payload };
              },
              modifyPassword: ( state, action ) =>
              {
                     state.passwordObject = { ...state.passwordObject, ...action.payload };
              },
              resetDataAfterRequete: ( state ) =>
              {
                     state.uploadImagedSuccess = false;
                     state.isUploadingImage = false;
                     state.isUpdatingProfilSuccess = false;
                     state.isUpdatingProfil = false;
                     state.isAddingUser = false;
                     state.addUserSuccess = false;
                     state.isLoading = false; // Optionnel : réinitialiser l'état de chargement si nécessaire
              },
       },
       extraReducers: ( builder ) =>
       {
              builder
                     // Cas pour le chargement de l'utilisateur
                     .addCase( loadUsers.pending, ( state ) =>
                     {
                            state.isLoading = true;
                     } )
                     .addCase( loadUsers.fulfilled, ( state, action ) =>
                     {
                            state.isLoading = false;
                            state.addUserSuccess = true;
                            console.log( 'Données chargées avec succès dans Redux:', action.payload.data.data );
                            state.userObject = { ...action.payload.data.data };
                     } )
                     .addCase( loadUsers.rejected, ( state, action ) =>
                     {
                            state.isLoading = false;
                            state.msg = action?.payload?.data ? action.payload.data.message : action.error.message;
                            console.log( 'Erreur lors du chargement des données:', state.msg );
                     } );

              // Cas pour l'ajout d'un utilisateur
              builder
                     .addCase( addUser.pending, ( state ) =>
                     {
                            state.isAddingUser = true;
                            state.addUserSuccess = false;
                     } )
                     .addCase( addUser.fulfilled, ( state, action ) =>
                     {
                            state.isAddingUser = false;
                            state.addUserSuccess = true;
                            enqueueSnackbar( 'utilisateur ajouter avec succès!' );
                            console.log( 'Utilisateur ajouté avec succès:', action.payload.data );
                            // Ajoutez les données utilisateur dans l'état si nécessaire
                            state.users = { ...state.users, ...action.payload.data };
                     } )
                     .addCase( addUser.rejected, ( state, action ) =>
                     {
                            state.isAddingUser = false;
                            state.addUserSuccess = false;
                            state.msg = action?.payload?.data ? action.payload.data.message : action.error.message;
                            console.log( "Erreur lors de l'ajout de l'utilisateur:", state.msg );
                     } );

              // Cas pour l'ajout du profil d'un utilisateur
              builder
                     .addCase( addProfilUser.pending, ( state ) =>
                     {
                            state.isUpdatingProfil = true;
                            state.isUpdatingProfilSuccess = false;
                     } )
                     .addCase( addProfilUser.fulfilled, ( state, action ) =>
                     {
                            state.isUpdatingProfil = false;
                            state.isUpdatingProfilSuccess = true;
                            enqueueSnackbar( 'profil Update success!' );
                            // setTimeout(() => {
                            //   window.location.href = paths.traineeNewPath;
                            // }, 100);
                            console.log( "profil de l'Utilisateur ajouté avec succès:", action.payload.data );
                            // Ajoutez les données utilisateur dans l'état si nécessaire
                            state.users = { ...state.users, ...action.payload.data };
                     } )
                     .addCase( addProfilUser.rejected, ( state, action ) =>
                     {
                            state.isUpdatingProfil = false;
                            state.isUpdatingProfilSuccess = false;
                            state.msg = action?.payload?.data ? action.payload.data.message : action.error.message;
                            console.log( "Erreur lors de l'ajout du profil de l'utilisateur:", state.msg );
                     } );

              // Cas pour la modification du mot de passe de l'utilisateurr
              builder
                     .addCase( updatePassword.pending, ( state ) =>
                     {
                            state.isLoading = true;
                            state.updatePasswordSuccess = false;
                     } )
                     .addCase( updatePassword.fulfilled, ( state, action ) =>
                     {
                            state.isLoading = false;
                            state.updatePasswordSuccess = true;
                            console.log( 'Mot de passe modifié avec succès:', action.payload.data );
                            enqueueSnackbar( 'Mot de passe modifié avec succès' );
                            state.passwordObject = { ...state.passwordObject, ...action.payload.data };
                     } )
                     .addCase( updatePassword.rejected, ( state, action ) =>
                     {
                            state.isLoading = false;
                            state.updatePasswordSuccess = false;

                            // Assurez-vous de gérer les erreurs en fonction de ce que vous avez renvoyé
                            const errorMessage =
                                   action?.error?.message || action?.payload?.error || 'Une erreur est survenue';

                            state.msg = errorMessage;
                            console.log(
                                   "Erreur lors de la modification du mot de passe de l'utilisateur:",
                                   action.error
                            );
                            console.log( "Message de l'erreur:", state.msg );
                     } );

              // Cas pour l' upload des images'
              builder
                     .addCase( uploadImage.pending, ( state ) =>
                     {
                            state.isUploadingImage = true;
                            state.uploadImagedSuccess = false;
                     } )
                     .addCase( uploadImage.fulfilled, ( state, action ) =>
                     {
                            state.isUploadingImage = false;
                            state.uploadImagedSuccess = true;
                            console.log( 'image uploader avec succès:', action.payload.data );
                            enqueueSnackbar( 'image uploader avec succès' );
                            state.imageObjectGet = { ...state.imageObjectGet, ...action.payload.data };
                     } )
                     .addCase( uploadImage.rejected, ( state, action ) =>
                     {
                            state.isUploadingImage = false;
                            state.uploadImagedSuccess = false;
                            state.msg = action?.payload?.data ? action.payload.data.message : action.error.message;
                            console.log( "Erreur lors de l'upload de l'image", action.data );
                            console.log( "Message de l'Erreur:", state.msg );
                     } );
       },
} );



// Exportation des actions et du reducer
export const { initUsers, addedUser, modifyPassword, resetDataAfterRequete } = usersSlice.actions;
export default usersSlice.reducer;
