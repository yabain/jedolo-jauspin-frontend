import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dataObject } from 'src/1data/annonces/defaut';


const initialSetState =
{
       data: [ dataObject ],
};



const SetDatasSlice = createSlice( {
       name: 'setData',
       initialState: initialSetState,
       reducers: {
              setData: ( state, action ) =>
              {


                     const dataTemp = action.payload;
                     state.data = [ ...state.data, dataTemp ];
                     console.log( 'update anc' );



              },
       },
} );




export const { setData } = SetDatasSlice.actions;
export default SetDatasSlice.reducer;

