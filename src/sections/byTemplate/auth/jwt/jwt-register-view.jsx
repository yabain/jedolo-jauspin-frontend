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
import { HOST_BACKEND_URL, HOST_FRONTEND_URL, PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { city } from 'src/assets/data/location.service';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
       const { register } = useAuthContext();

       const { enqueueSnackbar } = useSnackbar();
       const router = useRouter();

       const [errorMsg, setErrorMsg] = useState('');

       const searchParams = useSearchParams();

       const returnTo = searchParams.get('returnTo');

       const ville = city;
       const villeNames = [...new Set(ville.map((item) => item.name))];

       const password = useBoolean();

       // Schéma de validation avec messages en français
       const RegisterSchema = Yup.object().shape({
              firstName: Yup.string().required("Le prénom est requis"),
              lastName: Yup.string().required("Le nom est requis"),
              email: Yup.string()
                     .required("L'email est requis")
                     .email("L'email doit être une adresse email valide"),
              password: Yup.string()
                     .required("Le mot de passe est requis")
                     .min(8, "Le mot de passe doit contenir au moins 8 caractères")
                     .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                            "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
                     ),
              dateOfBirth: Yup.string()
                     .required("La date de naissance est obligatoire")
                     .test(
                            "is-valid-date",
                            "Format de date invalide (YYYY-MM-DD requis)",
                            (value) => {
                                   if (!value) return false;
                                   const date = new Date(value);
                                   return !Number.isNaN(date.getTime());
                            }
                     )
                     .test(
                            "is-adult",
                            "Vous devez avoir au moins 18 ans",
                            (value) => {
                                   if (!value) return false;

                                   const birthDate = new Date(value);
                                   const today = new Date();

                                   let age = today.getFullYear() - birthDate.getFullYear();
                                   const monthDiff = today.getMonth() - birthDate.getMonth();

                                   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                                          age -= 1;
                                   }

                                   return age >= 18;
                            }
                     )
                     .transform((originalValue) => {
                            if (typeof originalValue === 'string') {
                                   const date = new Date(originalValue);
                                   if (!Number.isNaN(date.getTime())) {
                                          // Retourne la date au format YYYY-MM-DD
                                          return date.toISOString().split('T')[0];
                                   }
                            }
                            return originalValue;
                     }),
              country: Yup.string().required("Le pays est requis"),
              city: Yup.string().required("La ville est requise"),
              location: Yup.string().required("Le quartier est requis"),
              gender: Yup.string().required("Le sexe est requis"),
              phoneNumber: Yup.string().required("Le numéro de téléphone est requis"),
       });

       // Valeurs par défaut vides
       const defaultValues = {
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              dateOfBirth: '',
              country: 'Cameroun',
              city: '',
              location: '',
              gender: '',
              phoneNumber: '',
       };

       const methods = useForm({
              resolver: yupResolver(RegisterSchema),
              defaultValues,
       });

       const {
              reset,
              handleSubmit,
              formState: { isSubmitting },
       } = methods;

       const onSubmit = handleSubmit(async (data) => {
              try {
                     // const dateToSend = { ...data, "photoURL": "", "about": "", "role": "user", "isPublic": true, displayName: ` ${ data.firstName } ${ data.lastName }` }
                     const dateToSend = { ...data, "about": "a propose de l'tilisateur", displayName: ` ${data.firstName} ${data.lastName}` }
                     await register?.(dateToSend);
                     enqueueSnackbar("Compte créer avec success !")
                     router.push(`/auth/jwt/login`);

                     reset();
                     console.log(dateToSend)
              } catch (error) {
                     console.error(error);
                     console.log(data)
                     setErrorMsg(typeof error === 'string' ? error : error.message);
              }
       });

       const renderHead = (
              <Stack spacing={0} sx={{ mt: -3, mb: 1, position: 'relative' }}>
                     {/* <Typography variant="h4">Get started absolutely free</Typography> */}

                     <Stack direction="row" spacing={0.5}>
                            <Typography variant="body2"> Vous avez deja un compte? </Typography>

                            <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
                                   Connectez vous
                            </Link>
                     </Stack>
              </Stack>
       );

       const renderTerms = (
              <Typography
                     component="div"
                     sx={{
                            mt: 2.5,
                            textAlign: 'center',
                            typography: 'caption',
                            color: 'text.secondary',
                     }}
              >
                     {'En m\'inscrivant, j\'accepte les   '}
                     <Link underline="always" color="text.primary">
                            {'Conditions d\'utilisation'}
                     </Link>
                     {' et la '}
                     <Link underline="always" color="text.primary">
                            Politique de confidentialité.
                     </Link>
                     .
              </Typography>
       );

       const renderForm = (
              <Stack spacing={2.5}>
                     <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
                            <RHFTextField name="firstName" label="Nom" />
                            <RHFTextField name="lastName" label="Prenom" />
                     </Stack>


                     <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
                            <RHFTextField
                                   type='date'
                                   name="dateOfBirth"
                                   label="Date de naissance"
                                   sx={{ flex: 1 }} // Largeur flexible
                            />
                            <RHFTextField
                                   name="country"
                                   label="Pays"
                                   sx={{ flex: 1 }} // Largeur flexible
                            />
                            <RHFAutocomplete
                                   name="city"
                                   label="Villes"
                                   freeSolo
                                   options={villeNames}
                                   getOptionLabel={(option) => option}
                                   renderOption={(props, option) => (
                                          <li {...props} key={option}>
                                                 {option}
                                          </li>
                                   )}
                                   sx={{ flex: 1 }} // Largeur flexible
                            />
                     </Stack>

                     <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
                            <RHFTextField sx={{ flex: 1 }} name="location" label="Quartier" />
                            <RHFAutocomplete
                                   name="gender"
                                   label="Sexe"
                                   freeSolo
                                   options={['Homme', 'Femme']}
                                   getOptionLabel={(option) => option}
                                   renderOption={(props, option) => (
                                          <li {...props} key={option}>
                                                 {option}
                                          </li>
                                   )}
                                   sx={{ flex: 1 }} // Largeur flexible
                            />
                            <RHFTextField sx={{ flex: 1 }} type='number' name="phoneNumber" label="Telephone" />
                     </Stack>

                     <RHFTextField name="email" label="Address Mail" />

                     <RHFTextField
                            name="password"
                            label="Mot de passe"
                            type={password.value ? 'text' : 'password'}
                            InputProps={{
                                   endAdornment: (
                                          <InputAdornment position="end">
                                                 <IconButton onClick={password.onToggle} edge="end">
                                                        <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                                 </IconButton>
                                          </InputAdornment>
                                   ),
                            }}
                     />

                     <LoadingButton
                            fullWidth
                            color="inherit"
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                     >
                            Creer le compte
                     </LoadingButton>
              </Stack>
       );

       return (
              <>
                     {renderHead}

                     {!!errorMsg && (
                            <Alert severity="error" sx={{ m: 3 }}>
                                   {errorMsg}
                            </Alert>
                     )}

                     <FormProvider methods={methods} onSubmit={onSubmit}>
                            {renderForm}
                     </FormProvider>

                     {renderTerms}
              </>
       );
}
