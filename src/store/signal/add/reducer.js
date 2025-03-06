import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as service from './service';










const pendingAction = ( state ) => 
{
       state.isPending = true;
}









const resetState = ( state ) => 
{
       state.isPending = false;
       state.isFulled = false;
       console.log( 'resetAfterRequest' );
}









const fulfilledAction = ( state, action ) => 
{
       state.isFulled = true;
       state.isPending = false;
       state.data = [ { ...action.payload.data.annonce } ];
       console.log( 'Données chargées avec succès dans Redux:', action.payload );
}









const rejectedAction = ( state, action ) => 
{
       state.isPending = false;
       state.msg = action?.payload?.data ? action.payload.data.message : action.error.message;
       console.log( 'Erreur detecter depuis le reducer lors de la recuperation des données:', state.msg );
}









const requestCases = ( builder ) => builder
       .addCase( request.pending, pendingAction )
       .addCase( request.rejected, rejectedAction )
       .addCase( request.fulfilled, fulfilledAction );













export const addSlice = createSlice( {
       name: 'addSignal', extraReducers: requestCases,
       reducers: { resetAfterRequest: resetState },
       initialState: { data: [], isPending: false, isFulled: false, }
} );









export default addSlice.reducer
export const { resetAfterRequest } = addSlice.actions;
export const request = createAsyncThunk( 'addSignal', async ( data ) => service.request( data ) )
