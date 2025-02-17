import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dataObject } from 'src/1data/annonces/defaut';


const initialSetState = { data: [], adminData: [], };









const resetDataAction = ( state ) =>
{

       state.data = [];
       console.log( 'data reset' );
}









const setDataAction = ( state, action ) =>
{
       const dataTemp = action.payload;
       state.data = dataTemp;
       // console.log( 'data set succesffuly from store', state.data );
}









const setAdminDataAction = ( state, action ) =>
{
       const dataTemp = action.payload;
       state.adminData = dataTemp;
       // console.log( 'adminData set succesffuly from store', state.data );
}









const addDataAction = ( state, action ) =>
{
       const dataTemp = action.payload;
       state.data = [ ...state.data, dataTemp ];
       console.log( 'data add succesffuly from store' );
}








const addAdminDataAction = ( state, action ) =>
{
       const dataTemp = action.payload;
       state.adminData = [ dataTemp, ...state.adminData ];
       console.log( 'adminData add succesffuly from store' );
}










const datasSlice = createSlice( {
       name: 'data',
       initialState: initialSetState,
       reducers: { addData: addDataAction, addAdminData: addAdminDataAction, setData: setDataAction, resetData: resetDataAction, setAdminData: setAdminDataAction },
} );









export default datasSlice.reducer;
export const { addData, addAdminData, setData, setAdminData, resetData } = datasSlice.actions;

