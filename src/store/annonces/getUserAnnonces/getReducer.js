import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { paths } from 'src/routes/paths';
import { enqueueSnackbar } from 'notistack';
import * as getService from './get.service';

// Action pour charger l'organisation existante
export const getList = createAsyncThunk('getList', async (id) =>
       getService.getList(id)
);


export const getSlice = createSlice({
       name: 'getList',
       initialState: {

              data: [],
              isGeting: false,
              isGetingSuccess: false,

       },
       reducers: {

              resetAfterGetListRequete: (state) => {

                     state.data = [];
                     state.isGeting = false;
                     state.isGetingSuccess = false;
                     // console.log( "Les données ont été réinitialisées ." );

              },
       },
       extraReducers: (builder) => {
              builder

                     .addCase(getList.pending, (state) => {

                            state.isGeting = true;

                     })

                     .addCase(getList.fulfilled, (state, action) => {
                            state.isGeting = false;
                            state.isGetingSuccess = true;


                            // console.log('listes des annonces de l\'utilisateur recuperer avec success:', action.payload);
                            state.data = [...action.payload.data.data];
                     })

                     .addCase(getList.rejected, (state, action) => {

                            state.isGeting = false;
                            state.msg = action?.payload?.data ? action.payload.data.message : action.error.message;
                            console.log('Erreur lors du chargement des données:', state.msg);

                     });

       },
});



// Exportation des actions et du reducer
export const { resetAfterGetListRequete } = getSlice.actions;
export default getSlice.reducer;
