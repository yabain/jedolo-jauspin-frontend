import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as service from './service';










const pendingAction = (state) => {
       state.isPending = true;
}









const resetGetState = (state) => {
       state.isPending = false;
       state.isFulled = false;
       console.log('Réinitialisation du state');

}









const fulfilledAction = (state, action) => {
       state.isFulled = true;
       state.isPending = false;
       state.data = action.payload.data;
       // console.log('ville avec le plus grans nombre d\'annonce recu:', action.payload);
}









const rejectedAction = (state, action) => {
       state.isPending = false;
       state.isError = true
       state.msg = action?.payload?.data ? action.payload.message : action.error.message;
       console.log('Erreur detecter depuis le reducer lors de la recuperation des données:', state.msg);
}









const requestCases = (builder) => builder
       .addCase(request.pending, pendingAction)
       .addCase(request.rejected, rejectedAction)
       .addCase(request.fulfilled, fulfilledAction);













export const getSlice = createSlice({
       name: 'getTopCity', extraReducers: requestCases,
       reducers: { resetAfterRequest: resetGetState },
       initialState: { data: [], isPending: false, isFulled: false, isError: false }
});









export default getSlice.reducer
export const { resetAfterRequest } = getSlice.actions;
export const request = createAsyncThunk('getTopCity', async (data) => service.request(data))
