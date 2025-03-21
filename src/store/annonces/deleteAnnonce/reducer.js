import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as service from './service';










const pendingAction = ( state ) => 
{
       state.isPending = true;
       state.isFulled = false;
}









const resetDeleteState = ( state ) => 
{
       state.isPending = false;
       state.isFulled = false;
}









const fulfilledAction = ( state, action ) => 
{
       state.isFulled = true;
       state.isPending = false;
       state.data = action.payload.data;
       // console.log( 'Données supprimer:', action.payload.data );
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













export const getSlice = createSlice( {
       name: 'delete', extraReducers: requestCases,
       reducers: { resetAfterRequest: resetDeleteState },
       initialState: { data: [], isPending: false, isFulled: false, }
} );









export default getSlice.reducer
export const { resetAfterRequest } = getSlice.actions;
export const request = createAsyncThunk( 'delete', async ( data ) => service.request( data ) )
