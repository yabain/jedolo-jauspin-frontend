import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as service from './service';










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
       state.data = [...action.payload.data];
       console.log('liste des annonce publier recu:', action.payload);
}









const rejectedAction = (state, action) => {
       state.isPending = false;
       state.msg = action?.payload?.data ? action.payload.message : action.error.message;
       console.log('Erreur detecter depuis le reducer lors de la recuperation des données:', state.msg);
}









const requestCases = (builder) => builder
       .addCase(request.pending, pendingAction)
       .addCase(request.rejected, rejectedAction)
       .addCase(request.fulfilled, fulfilledAction);













export const getSlice = createSlice({
       name: 'getusersAnnonces', extraReducers: requestCases,
       reducers: { resetAfterRequest: resetGetState },
       initialState: { data: null, isPending: false, isFulled: false, }
});









export default getSlice.reducer
export const { resetAfterRequest } = getSlice.actions;
export const request = createAsyncThunk('getusersAnnonces', async (data) => service.request(data))
