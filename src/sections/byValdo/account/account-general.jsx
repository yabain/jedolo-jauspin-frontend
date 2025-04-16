import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { fData } from 'src/utils/format-number';

import { countries } from 'src/assets/data';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
       RHFSwitch,
       RHFTextField,
       RHFUploadAvatar,
       RHFAutocomplete,
} from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { InputAdornment } from '@mui/material';
import Iconify from 'src/components/iconify';
import { city } from 'src/assets/data/location.service';
import { formatDate } from 'src/1functions/annonces';
import { request } from 'src/store/users/updateprofile/reducer';
import { useDispatch } from 'react-redux';
import { useUpdateProfil } from 'src/1VALDO/hook/user/use-update-profile';
import { uploadImage } from 'src/store/annonces/uploadImage/reducer';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
       const { enqueueSnackbar } = useSnackbar();

       const { user } = useAuthContext();
       const dispatch = useDispatch()


       const [imageTab, setImageTab] = useState([])
       const [allfileToUpload, setAllfileToUpload] = useState([])
       const [isUploadingImage, setIsUploadingImage] = useState(false);


       // console.log(user);

       const ville = city;
       const villeNames = [...new Set(ville.map((item) => item.name))];

       // const UpdateUserSchema = Yup.object().shape( {
       //        displayName: Yup.string().required( 'Name is required' ),
       //        email: Yup.string().required( 'Email is required' ).email( 'Email must be a valid email address' ),
       //        photoURL: Yup.mixed().nullable().required( 'Avatar is required' ),
       //        phoneNumber: Yup.string().required( 'Phone number is required' ),
       //        country: Yup.string().required( 'Country is required' ),
       //        dateOfBirth: Yup.string().required( 'dateOfBirth is required' ),
       //        state: Yup.string().required( 'State is required' ),
       //        city: Yup.string().required( 'City is required' ),
       //        zipCode: Yup.string().required( 'Zip code is required' ),
       //        about: Yup.string().required( 'About is required' ),
       //        // not required
       //        isPublic: Yup.boolean(),
       // } );

       // const defaultValues = {
       //        displayName: user?.displayName || '',
       //        email: user?.email || '',
       //        photoURL: 'https://testapi.postgrad.fr/stordateOfBirth/imdateOfBirths/imdateOfBirth_1728812247.jpg',
       //        phoneNumber: user?.phoneNumber || '',
       //        country: user?.country || '',
       //        dateOfBirth: user?.dateOfBirth || '',
       //        state: user?.state || '',
       //        city: user?.city || '',
       //        zipCode: user?.zipCode || '',
       //        about: user?.about || '',
       //        isPublic: user?.isPublic || false,
       // };
       const UpdateUserSchema = Yup.object().shape({
              // firstName: Yup.string().required("Le prénom est requis"),
              // lastName: Yup.string().required("Le nom est requis"),
              // email: Yup.string()
              //        .required( "L'email est requis" )
              //        .email( "L'email doit être une adresse email valide" ),
              // password: Yup.string()
              //        .required( "Le mot de passe est requis" )
              //        .min( 8, "Le mot de passe doit contenir au moins 8 caractères" )
              //        .matches(
              //               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              //               "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
              //        ),
              // dateOfBirth: Yup.string().required("L'âge est requis"),
              // country: Yup.string().required("Le pays est requis"),
              // city: Yup.string().required("La ville est requise"),
              // location: Yup.string().required("Le quartier est requis"),
              // gender: Yup.string().required("Le sexe est requis"),
              // phoneNumber: Yup.string().required("Le numéro de téléphone est requis"),


              firstName: Yup.string().required("Le prénom est requis"),
              lastName: Yup.string().required("Le nom est requis"),
              // email: Yup.string()
              //        .required("L'email est requis")
              //        .email("L'email doit être une adresse email valide"),
              // password: Yup.string()
              //        .required("Le mot de passe est requis")
              //        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
              //        .matches(
              //               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              //               "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
              //        ),
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
              photoURL: user?.photoURL || '',
              firstName: user?.firstName || '',
              lastName: user?.lastName || '',
              // email: user?.email || '',

              dateOfBirth: formatDate(user?.dateOfBirth) || '',
              about: user?.about || '',
              country: 'Cameroun',
              city: user?.city || '',
              location: user?.location || '',
              gender: user?.gender || '',
              phoneNumber: user?.phoneNumber || '',
       };
       const methods = useForm({
              resolver: yupResolver(UpdateUserSchema),
              defaultValues,
       });

       const {
              setValue,
              getValues,
              handleSubmit,
              formState: { isSubmitting },
       } = methods;

       const onSubmit = handleSubmit(async (data) => {
              try {

                     if (imageTab.length === 0 && allfileToUpload.length !== 0) {
                            enqueueSnackbar('veuillez cliker sur le bouton upload pour uploader votre photo', { variant: 'error' });
                            return; // Arrête la soumission si pas de coverUrl
                     }
                     const dataToSend = { ...data, displayName: ` ${data.firstName} ${data.lastName}`, photoURL: imageTab[0] }
                     await new Promise((resolve) => setTimeout(resolve, 500));
                     dispatch(request(dataToSend))
                     // enqueueSnackbar( 'Update success!' );
                     console.info('DATA', dataToSend);
              } catch (error) {
                     console.error(error);
              }
       });

       const uploadAllImages = useCallback(
              async (imagesArray, dispatchGet) => {
                     try {
                            const uploadedUrls = []; // Tableau pour stocker les URLs

                            // Utilisation de map + Promise.all
                            const uploadPromises = imagesArray.map(async (imageFile) => {
                                   const result = await dispatchGet(uploadImage(imageFile)).unwrap();
                                   const imageUrl = result.data; // URL de l'image uploadée

                                   // Ajoute l'URL au tableau
                                   uploadedUrls.push(imageUrl);

                                   // Si c'est l'image de couverture, on stocke l'URL


                                   return imageUrl;
                            });

                            // Attend que tous les uploads soient terminés
                            const allUrls = await Promise.all(uploadPromises);

                            console.log('Toutes les images ont été uploadées', allUrls);

                            // Retourne à la fois le tableau complet et l'URL cover
                            return {
                                   allUrls
                            };

                     } catch (error) {
                            console.error("Erreur lors de l'upload:", error);
                            throw error;
                     }
              },
              [] // Aucune dépendance
       );











       const handleDrop = useCallback(async (acceptedFiles) => {


              console.log(getValues('photoURL'));
              const file = acceptedFiles[0];

              const newFile = Object.assign(file, {
                     preview: URL.createObjectURL(file),
              });

              if (file) {
                     setValue('photoURL', newFile, { shouldValidate: true });
              }






              setAllfileToUpload([newFile])







       },
              [setValue, getValues] // img retiré car c'est une variable locale
       );



       const uploadAllImageCharged = async () => {
              setIsUploadingImage(true)
              try {
                     const { allUrls } = await uploadAllImages(allfileToUpload, dispatch);

                     setImageTab(allUrls);


              } catch (error) {
                     // Gestion des erreurs
              } finally {
                     setIsUploadingImage(false); // réactive le bouton
                     enqueueSnackbar('photo uploader avec succes')
              }

       }




       useUpdateProfil()

       return (
              <FormProvider methods={methods} onSubmit={onSubmit}>
                     <Grid container spacing={3} sx={{ alignItems: 'center' }}>
                            <Grid xs={12} md={4}>
                                   <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
                                          <RHFUploadAvatar
                                                 name="photoURL"
                                                 maxSize={3145728}
                                                 onDrop={handleDrop}

                                                 helperText={
                                                        <Typography
                                                               variant="caption"
                                                               sx={{
                                                                      mt: 3,
                                                                      mx: 'auto',
                                                                      display: 'block',
                                                                      textAlign: 'center',
                                                                      color: 'text.disabled',
                                                               }}
                                                        >
                                                               Allowed *.jpeg, *.jpg, *.png, *.gif
                                                               <br /> max size of {fData(3145728)}
                                                        </Typography>
                                                 }
                                          />

                                          <LoadingButton
                                                 variant="soft"
                                                 color="success"
                                                 sx={{ mt: 3 }}
                                                 onClick={() => uploadAllImageCharged()}
                                                 loading={isUploadingImage} // indique s'il est en chargement
                                          >
                                                 Uploader
                                          </LoadingButton>


                                          {/* <Button onClick={() => uploadAllImageCharged()} variant="soft" color="success" sx={{ mt: 3 }}>
                                                 enregistrer
                                          </Button> */}
                                   </Card>
                            </Grid>

                            <Grid xs={12} md={8}>
                                   <Card sx={{ p: 3 }}>
                                          <Stack spacing={2.5}>
                                                 <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
                                                        <RHFTextField name="firstName" label="Nom" />
                                                        <RHFTextField name="lastName" label="Prenom" />
                                                 </Stack>


                                                 <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
                                                        <RHFTextField
                                                               type='date'
                                                               name="dateOfBirth"
                                                               label="date de naissance"
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

                                                 {/* <RHFTextField name="email" label="Address Mail" /> */}



                                          </Stack>

                                          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                                                 <RHFTextField name="about" multiline rows={4} label="About" />

                                                 <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                                        enregistrer
                                                 </LoadingButton>
                                          </Stack>
                                   </Card>
                            </Grid>
                     </Grid>
              </FormProvider>
       );
}
