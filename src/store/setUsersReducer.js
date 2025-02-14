import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialSetState = {
       users: [],
       selectedUser: null, // Stocke le user mis à jour
};



const SetUsersSlice = createSlice( {
       name: 'setusers',
       initialState: initialSetState,
       reducers: {
              setUsers: ( state, action ) =>
              {
                     const user = action.payload;
                     state.selectedUser = user; // Met à jour l'utilisateur dans le store
                     console.log( 'fonctionnnnnnnnn aaappeeeeee' );

              },
       },
} );




export const { setUsers } = SetUsersSlice.actions;
export default SetUsersSlice.reducer;

