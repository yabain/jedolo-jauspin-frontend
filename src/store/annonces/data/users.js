import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dataObject } from 'src/1data/annonces/defaut';


const initialSetState = { data: [] };









const resetDataAction = ( state ) =>
{

       state.data = [];
       // console.log( 'data reset' );
}









const setDataAction = ( state, action ) =>
{
       const dataTemp = action.payload;
       state.data = dataTemp;
       // console.log( 'data set succesffuly from store', state.data );
}









const addDataAction = ( state, action ) =>
{
       const dataTemp = action.payload;
       state.data = [ ...state.data, dataTemp ];
       console.log( 'data add succesffuly from store' );
}










const datasSlice = createSlice( {
       name: 'usersData',
       initialState: initialSetState,
       reducers: { addData: addDataAction, setData: setDataAction, resetData: resetDataAction },
} );









export default datasSlice.reducer;
export const { addData, setData, resetData } = datasSlice.actions;

