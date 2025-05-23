import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { _mock } from 'src/_mock';
import { setUsers } from 'src/store/users/setUsersReducer';
import { Tooltip } from '@mui/material';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

export default function JwtLoginView()
{

       const setUser = useSelector( ( state ) => state.setUsers.selectedUser ); // Assure-toi que `selectedUser` est bien défini dans le store


       const { login } = useAuthContext();
       const dispatch = useDispatch()

       const { method } = useAuthContext();
       const router = useRouter();

       const [ errorMsg, setErrorMsg ] = useState( '' );

       const searchParams = useSearchParams();

       const returnTo = searchParams.get( 'returnTo' );

       const password = useBoolean();

       const LoginSchema = Yup.object().shape( {
              email: Yup.string().required( 'Email is required' ).email( 'Email must be a valid email address' ),
              password: Yup.string().required( 'Password is required' ),
       } );

       const defaultValues = {
              // email: 'demo@minimals.cc',
              // password: 'demo1234',
              email: '',
              password: '',
       };

       const methods = useForm( {
              resolver: yupResolver( LoginSchema ),
              defaultValues,
       } );

       const {
              reset,
              handleSubmit,
              formState: { isSubmitting },
       } = methods;

       const user = {
              id: '8864c717-587d-472a-929a-8e5f298024da-0',
              displayName: 'Jaydon Frankie',
              email: 'demo@minimals.cc',
              password: 'demo1234',
              photoURL: _mock.image.avatar( 24 ),
              phoneNumber: '+40 777666555',
              country: 'United States',
              address: '90210 Broadway Blvd',
              state: 'California',
              city: 'San Franciscoo',
              zipCode: '94116',
              about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
              role: 'admin',
              isPublic: true,
       };

       const METHODS = [
              {
                     id: 'jwt',
                     label: 'Jwt',
                     path: paths.auth.jwt.login,
                     icon: '/assets/icons/auth/ic_jwt.svg',
              },
              {
                     id: 'firebase',
                     label: 'Firebase',
                     path: paths.auth.firebase.login,
                     icon: '/assets/icons/auth/ic_firebase.svg',
              },
              {
                     id: 'amplify',
                     label: 'Amplify',
                     path: paths.auth.amplify.login,
                     icon: '/assets/icons/auth/ic_amplify.svg',
              },
              {
                     id: 'auth0',
                     label: 'Auth0',
                     path: paths.auth.auth0.login,
                     icon: '/assets/icons/auth/ic_auth0.svg',
              },
              {
                     id: 'supabase',
                     label: 'Supabase',
                     path: paths.auth.supabase.login,
                     icon: '/assets/icons/auth/ic_supabase.svg',
              },
       ];

       const onSubmit = handleSubmit( async ( data ) =>
       {
              try
              {
                     const updatedUser = {
                            ...user, // Copier les autres propriétés
                            role: data.email !== "demo@minimals.cc" ? "user" : user.role, // Modifier le rôle si nécessaire
                            email: data.email,
                     };

                     await login?.( data.email, data.password );
                     // dispatch( setUsers( updatedUser ) )
                     // console.log( 'utilisateur enregistrer dans le store', setUser );


                     router.push( returnTo || '/home' );

              } catch ( error )
              {
                     console.error( error );
                     reset();
                     setErrorMsg( typeof error === 'string' ? error : error.message );
              }
       } );

       const renderHead = (
              <Stack spacing={ 0 } sx={ { mb: 4 } }>
                     <Typography variant="h4">Connectez vous à Ndolo</Typography>

                     <Stack direction="row" spacing={ 0.5 }>
                            <Typography variant="body2">Vous etes Nouveau ?</Typography>

                            <Link component={ RouterLink } href={ paths.auth.jwt.register } variant="subtitle2">
                                   Creez un Compte
                            </Link>
                     </Stack>
              </Stack>
       );
       const rendLogType = ( { showOnMobile, showOnDesktop } ) => (
              <Stack
                     sx={ {
                            // Masquer ou afficher en fonction de showOnMobile et showOnDesktop
                            display: {
                                   xs: showOnMobile ? 'flex' : 'none', // Afficher sur mobile si showOnMobile est true
                                   sm: showOnDesktop ? 'flex' : 'none', // Afficher sur desktop si showOnDesktop est true
                            }

                            , mt: {
                                   xs: 5, // Afficher sur mobile si showOnMobile est true
                                   sm: 8, // Afficher sur desktop si showOnDesktop est true
                            },
                     } }
                     direction="row"
                     justifyContent="center"
                     spacing={ 2 }
              >
                     { METHODS.map( ( option ) => (
                            <Tooltip key={ option.label } title={ option.label }>
                                   <Link component={ RouterLink } href={ option.path }>
                                          <Box
                                                 component="img"
                                                 alt={ option.label }
                                                 src={ option.icon }
                                                 sx={ {
                                                        width: 32,
                                                        height: 32,
                                                        ...( method !== option.id && {
                                                               filter: 'grayscale(100%)',
                                                        } ),
                                                 } }
                                          />
                                   </Link>
                            </Tooltip>
                     ) ) }
              </Stack>
       );
       const renderForm = (
              <Stack spacing={ 2.5 }>
                     <RHFTextField name="email" label="Email address" />

                     <RHFTextField
                            sx={ { mt: { xs: 0.5, md: 2 } } }
                            name="password"
                            label="Password"
                            type={ password.value ? 'text' : 'password' }
                            InputProps={ {
                                   endAdornment: (
                                          <InputAdornment position="end">
                                                 <IconButton onClick={ password.onToggle } edge="end">
                                                        <Iconify icon={ password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold' } />
                                                 </IconButton>
                                          </InputAdornment>
                                   ),
                            } }
                     />

                     <Link variant="body2" color="inherit" underline="always" sx={ { alignSelf: 'flex-end' } }>
                            Mot de passe oublier?
                     </Link>

                     <LoadingButton
                            fullWidth
                            color="inherit"
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={ isSubmitting }
                     >
                            Connexion
                     </LoadingButton>

                     {/* { rendLogType( { showOnMobile: true, showOnDesktop: true } ) } */ }
              </Stack>
       );

       return (
              <>
                     { renderHead }

                     {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert> */}

                     { !!errorMsg && (
                            <Alert severity="error" sx={ { mb: 3 } }>
                                   { errorMsg }
                            </Alert>
                     ) }

                     <FormProvider methods={ methods } onSubmit={ onSubmit }>
                            { renderForm }
                     </FormProvider>
              </>
       );
}
