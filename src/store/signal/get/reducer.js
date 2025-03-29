import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as service from './service';










const pendingAction = ( state ) => 
{
       state.isPending = true;
}









const resetGetState = ( state ) => 
{
       state.isPending = false;
       state.isFulled = false;
       console.log( 'Réinitialisation du state' );

}









const fulfilledAction = ( state, action ) => 
{
       state.isFulled = true;
       state.isPending = false;
       state.data = action.payload;
       console.log( 'fonction appeler:', action.payload );
}









const rejectedAction = ( state, action ) => 
{
       state.isPending = false;
       state.msg = action?.payload?.data ? action.payload.message : action.error.message;
       console.log( 'Erreur detecter depuis le reducer lors de la recuperation des données:', state.msg );
}









const requestCases = ( builder ) => builder
       .addCase( request.pending, pendingAction )
       .addCase( request.rejected, rejectedAction )
       .addCase( request.fulfilled, fulfilledAction );













export const getSlice = createSlice( {
       name: 'getuserAnnonceSignals', extraReducers: requestCases,
       reducers: { resetAfterRequest: resetGetState },
       initialState: { data: [], isPending: false, isFulled: false, }
} );









export default getSlice.reducer
export const { resetAfterRequest } = getSlice.actions;
export const request = createAsyncThunk( 'getuserAnnonceSignals', async ( data ) => service.request( data ) )
