import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as service from './service';

// Action pour charger l'organisation existante


export const uploadImage = createAsyncThunk(
    'uploadImageAnnonce',
    async (imageObject) => service.uploadImage(imageObject,)
);


export const uploadImageSlice = createSlice({
    name: 'uploadImageAnnonce',
    initialState: {
        imageObjectGet: {},
        isUploading: false,
        isloaded: false,

    },
    reducers: {

        resetDataAfterRequete: (state) => {

            state.isloaded = false;
            state.isUploading = false;
            state.imageObjectGet = {}


            console.log('reset appeler', state.deleteFormationSuccess);

        },
    },











    extraReducers: (builder) => {




        // Cas pour l' upload des images'
        builder
            .addCase(uploadImage.pending, (state) => {
                state.isUploading = true;
                state.isloaded = false;
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.isUploading = false;
                state.isloaded = true;
                console.log('image uploader avec succès:', action.payload);
                // enqueueSnackbar( 'image uploader avec succès' );
                state.imageObjectGet = { ...action.payload };
                // console.log( state.imageObjectGet );

            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.isUploading = false;
                state.isloaded = false;
                state.msg = action?.payload?.data ? action.payload.message : action.error.message;
                // console.log("Erreur lors de l'upload de l'image", action.data);
                // console.log("Message de l'Erreur:", state.msg);
            });
    },
});



// Exportation des actions et du reducer
export const { resetDataAfterRequete } = uploadImageSlice.actions;
export default uploadImageSlice.reducer;