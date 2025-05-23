import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';
import { HOST_BACKEND_URL, HOST_FRONT_PROD, HOST_DEV6, tokenUser } from 'src/config-global';

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

const initialState = {
       user: null,
       loading: true,
};

const reducer = (state, action) => {
       if (action.type === 'INITIAL') {
              return {
                     loading: false,
                     user: action.payload.user,
              };
       }
       if (action.type === 'LOGIN') {
              return {
                     ...state,
                     user: action.payload.user,
              };
       }
       if (action.type === 'REGISTER') {
              return {
                     ...state,
                     user: action.payload.user,
              };
       }
       if (action.type === 'LOGOUT') {
              return {
                     ...state,
                     user: null,
              };
       }
       return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
       const [state, dispatch] = useReducer(reducer, initialState);

       const initialize = useCallback(async () => {
              try {
                     // const accessToken = sessionStorage.getItem( STORAGE_KEY );

                     const accessToken = localStorage.getItem(STORAGE_KEY);
                     const storedUser = JSON.parse(localStorage.getItem('user'));


                     if (accessToken && isValidToken(accessToken)) {
                            setSession(accessToken);

                            // const response = await axios.get( endpoints.auth.me );

                            // const { user } = response.data;



                            // console.log( 'initiallisation du useer depuis authcontext' );

                            dispatch({
                                   type: 'INITIAL',
                                   payload: {
                                          user: {
                                                 ...storedUser,
                                                 accessToken,
                                          },
                                   },
                            });
                     } else {
                            dispatch({
                                   type: 'INITIAL',
                                   payload: {
                                          user: null,
                                   },
                            });
                     }
              } catch (error) {
                     console.error(error);
                     dispatch({
                            type: 'INITIAL',
                            payload: {
                                   user: null,
                            },
                     });
              }
       }, []);

       useEffect(() => {
              initialize();
       }, [initialize]);

       // LOGIN
       const login = useCallback(async (email, password) => {
              const data = {
                     email,
                     password,
              };

              const response = await axios.post(`${HOST_FRONT_PROD}/auth/login`, data)
              const { access_token, user } = response.data.data;



              // const response = await axios.post( `${ HOST_BACKEND_URL }/auth/login`, data );
              // const { access_token, user } = response.data;

              console.log('data recu', response.data);
              setSession(access_token);

              localStorage.setItem('user', JSON.stringify(user));


              dispatch({
                     type: 'LOGIN',
                     payload: {
                            user: {
                                   ...user,
                                   accessToken: access_token,
                            },
                     },
              });
       }, []);

       // REGISTER
       const register = useCallback(async (data) => {


              const response = await axios.post(`${HOST_FRONT_PROD}/auth/register`, data);

              console.log('data recu', response);

              // const { accessToken, user } = response.data.data;

              // sessionStorage.setItem( STORAGE_KEY, accessToken );

              // localStorage.setItem( STORAGE_KEY, accessToken );

              // dispatch( {
              //        type: 'REGISTER',
              //        payload: {
              //               user: {
              //                      ...user,
              //                      accessToken,
              //               },
              //        },
              // } );
       }, []);

       // LOGOUT
       const logout = useCallback(async () => {

              const response = await axios.get(`${HOST_FRONT_PROD}/auth/logout`, { headers: { Authorization: `Bearer:${tokenUser()}` } });
              console.log('deconnexion reussi', response.data);

              setSession(null);
              dispatch({
                     type: 'LOGOUT',
              });
       }, []);

       // ----------------------------------------------------------------------

       const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

       const status = state.loading ? 'loading' : checkAuthenticated;

       const memoizedValue = useMemo(
              () => ({
                     user: state.user,
                     method: 'jwt',
                     loading: status === 'loading',
                     authenticated: status === 'authenticated',
                     unauthenticated: status === 'unauthenticated',
                     //
                     login,
                     register,
                     logout,
              }),
              [login, logout, register, state.user, status]
       );

       return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
       children: PropTypes.node,
};
