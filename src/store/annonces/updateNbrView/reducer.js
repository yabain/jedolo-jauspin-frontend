import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateAnnonceInArray } from 'src/1functions/annonces';
import * as service from './service';
import { setData } from '../data/dataReducer';










const pendingAction = (state) => {
       state.isPending = true;
}









const resetGetState = (state) => {
       state.isPending = false;
       state.isFulled = false;
}









const fulfilledAction = (state, action) => {
       state.isFulled = true;
       state.isPending = false;
       state.data = [{ ...action.payload.data }];
       console.log('Données modifier avec succès dans Redux:', action.payload.data);
}









const rejectedAction = (state, action) => {
       state.isPending = false;
       state.msg = action?.payload?.data ? action.payload.data.message : action.error.message;
       console.log('Erreur detecter depuis le reducer lors de la recuperation des données:', state.msg);
}









const requestCases = (builder) => builder
       .addCase(request.pending, pendingAction)
       .addCase(request.rejected, rejectedAction)
       .addCase(request.fulfilled, fulfilledAction);













export const getSlice = createSlice({
       name: 'updateNrView/annonce', extraReducers: requestCases,
       reducers: { resetAfterRequest: resetGetState },
       initialState: { data: [], isPending: false, isFulled: false, }
});









export default getSlice.reducer
export const { resetAfterRequest } = getSlice.actions;
export const request = createAsyncThunk('updateNrView/annonce', async (data) => service.request(data))




// export const request = createAsyncThunk(
//        'update/annonce',
//        async ( data, thunkAPI = {} ) =>
//        {  // thunkAPI est optionnel

//               // Extraction des paramètres avec valeurs par défaut
//               const { getState = () => ( {} ), dispatch = () => { } } = thunkAPI;

//               const state = getState();

//               const annonceFromStore = state.annonces?.data || []; // Fallback si annonces n'existe pas

//               const response = await service.request( data );

//               // Si dispatch est disponible, on met à jour l'autre reducer

//               console.log( 'execccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc' );
//               if ( dispatch && getState )
//               {
//                      dispatch( setData( updateAnnonceInArray( annonceFromStore, data ) ) );
//               }

//               return { data: response.data };

//        }
// );