import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { _tags, PRODUCT_SIZE_OPTIONS, PRODUCT_GENDER_OPTIONS, PRODUCT_COLOR_NAME_OPTIONS, PRODUCT_CATEGORY_GROUP_OPTIONS } from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFEditor, RHFUpload, RHFSwitch, RHFTextField, RHFMultiSelect, RHFAutocomplete, RHFMultiCheckbox } from 'src/components/hook-form';
import { addAnnoncesToUsersList } from 'src/1functions/annonces';
import { useLocation, useNavigate } from 'react-router';
import { addData, setData } from 'src/store/annonces/data/dataReducer';
import { request, resetAfterRequest } from 'src/store/annonces/addAnnonce/reducer';
import { request as updateAnnoncesRequest, resetAfterRequest as resetAfterUpdate } from 'src/store/annonces/updateAnnonce/reducer';
import { useAuthContext } from 'src/auth/hooks';
import DialogAnnonceBuy from 'src/1VALDO/components/annonces/dialog-annonce-buy';
import { useBoolean } from 'src/hooks/use-boolean';
import { city } from 'src/assets/data/location.service';
import { Autocomplete, TextField } from '@mui/material';
import { useUpdate } from 'src/1VALDO/hook/annonce/useUpdate';
import { uploadImage } from 'src/store/annonces/uploadImage/reducer';

// ----------------------------------------------------------------------

export default function ProductNewEditForm({ currentProduct2 }) {
  const annonceFromStore = useSelector((state) => state.annonces.data);
  const { user } = useAuthContext();
  // console.log( user );

  const { data, isFulled, isPending } = useSelector((state) => state.addAnnonces);
  const isFulledUpdate = useSelector((state) => state.updateUserAnnonce.isFulled);
  const isPendingUpdate = useSelector((state) => state.updateUserAnnonce.isPending);

  const [selectedTag, setSelectedTag] = useState(null);

  const redirect = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [imageTab, setImageTab] = useState([]);
  const [allfileToUpload, setAllfileToUpload] = useState([]);

  const showDialog = useBoolean();
  const showPaiementStatut = useBoolean();
  const currentProduct = location.state?.data;
  const [aLaUne, setChecked] = useState(currentProduct?.aLaUne || false); // État du switch
  // const currentProduct = location.state !== null ? location.state.data : undefined;
  // console.log( currentProduct );

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();
  const [dataToAdd, setDataToAdd] = useState({});

  // const NewProductSchema = Yup.object().shape( {
  //        // name: Yup.string().required( 'Name is required' ),
  //        phoneNumber: Yup.string().required( 'veuiller entrer le numero de teleohone pour l\'annonce telephone' ),
  //        // images: Yup.array().min( 1, 'Images is required' ),
  //        // tags: Yup.array().min( 2, 'Must have at least 2 tags' ),
  //        // category: Yup.string().required( 'Category is required' ),
  //        // price: Yup.number().moreThan( 0, 'Price should not be $0.00' ),
  //        // description: Yup.string().required( 'Description is required' ),
  //        // not required

  // } );

  const NewProductSchema = Yup.object().shape({
    // Section Détails
    name: Yup.string().required('Le titre est requis').min(10, 'Le titre doit contenir au moins 10 caractères').max(100, 'Le titre ne doit pas dépasser 100 caractères'),

    subDescription: Yup.string().required('La description courte est requise').min(20, 'La description doit contenir au moins 20 caractères').max(300, 'La description ne doit pas dépasser 300 caractères'),

    images: Yup.array().min(1, 'Au moins une image est requise').max(5, 'Maximum 5 images autorisées'),

    city: Yup.string().required('Veuillez sélectionner une ville'), // Changez de array à string

    location: Yup.string().required('Le lieu est requis').min(5, 'Le lieu doit contenir au moins 5 caractères'),

    category: Yup.array().min(1, 'Veuillez sélectionner au moins un service').max(5, 'Maximum 5 services autorisés'),

    personAccept: Yup.array().min(1, 'Veuillez sélectionner au moins une option').required('Veuillez spécifier qui vous acceptez'),

    seDeplace: Yup.array().min(1, 'Veuillez sélectionner une option').required('Veuillez spécifier si vous vous déplacez'),

    price: Yup.number().required('Le prix minimum est requis').min(1000, "Le prix minimum doit être d'au moins 1000 FCFA").max(100000, 'Le prix maximum ne peut excéder 100 000 FCFA'),
  });

  const ville = city;
  const villeNames = [...new Set(ville.map((item) => item.name))];
  // console.log( ville );
  // console.log( villeNames );

  const catgOptions = ['Pipe', 'Chatte', 'Vaginal', 'Anal', 'Massage', 'Partouze'];

  const genre = [
    { label: 'Homme', value: 'Homme' },
    { label: 'Femme', value: 'Femme' },
  ];

  const accept = [
    { label: 'Oui', value: 'Oui' },
    { label: 'Non', value: 'Non' },
  ];

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      subDescription: currentProduct?.subDescription || '',
      images: currentProduct?.images || [],
      price: currentProduct?.price || 0,
      city: currentProduct?.city || '',
      // phoneNumber: currentProduct?.phoneNumber || user.phoneNumber || '',
      phoneNumber: user.phoneNumber,
      category: currentProduct?.category || [],
      location: currentProduct?.location || '',
      seDeplace: currentProduct?.seDeplace || '',
      personAccept: currentProduct?.personAccept || '',
      coverUrl: currentProduct?.coverUrl || '',

      // code: currentProduct?.code || '',
      // sku: currentProduct?.sku || '',
      // sizes: currentProduct?.sizes || [],
      // colors: currentProduct?.colors || [],
      // quantity: currentProduct?.quantity || 0,
      // prixNuit: currentProduct?.prixNuit || 0,
      // priceSale: currentProduct?.priceSale || 0,
      // prix2coup: currentProduct?.prix2coup || 0,
      // prix1coup: currentProduct?.prix1coup || 0,
      // description: currentProduct?.description || '',
      // prixMassage: currentProduct?.prixMassage || 0,
      // newLabel: currentProduct?.newLabel || { enabled: false, content: '' },
      // saleLabel: currentProduct?.saleLabel || { enabled: false, content: '' },
    }),
    [currentProduct, user?.phoneNumber]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    if (isFulled && !isPending) {
      dispatch(resetAfterRequest());
      // console.log('data a ajouter apres la mise a jour', data);

      dispatch(addData(data));
      enqueueSnackbar('annonce publier avec succes');
      // redirect(-1);
    }
  }, [isFulled, isPending, data, dispatch, redirect, enqueueSnackbar]);

  useEffect(() => {
    if (!isPendingUpdate && isFulledUpdate) {
      dispatch(resetAfterUpdate());
      redirect(-1);

      // enqueueSnackbar('Annonce mis à jour avec succes!');
    }
  }, [dispatch, redirect, isFulledUpdate, isPendingUpdate]);

  useUpdate();

  const onSubmit = handleSubmit(async (dataGet) => {
    try {
      // console.log( 'datat to add', data );
      const { phoneNumber, ...data2 } = dataGet;
      if (!data2.coverUrl && !currentProduct?.coverUrl) {
        enqueueSnackbar('veuillez cliker sur le bouton telecharger pour uploader les imges', { variant: 'error' });
        return; // Arrête la soumission si pas de coverUrl
      }

      // await new Promise((resolve) => setTimeout(resolve, 500));

      // reset();
      // console.log( 'user du send ', user );

      const object = { ...data2, images: imageTab };
      // const object = { ...data2, images: imageTab, transactionToken: 'MP250416BC2ED35E5396B9B6DB2A' }

      if (!currentProduct) {
        // dispatch(request(object))
        setDataToAdd(object);
        showDialog.onTrue();

        // console.log( 'email du user', user?.email, 'user email envoyer', object.userEmail );
        // console.log(user);
        console.log('data a creer ', object);

        console.log('dtaa to add', object);
      }

      if (currentProduct) {
        // console.log({ ...currentProduct, ...object });
        dispatch(updateAnnoncesRequest({ _id: currentProduct._id, data: object }));
        // console.log( 'dtaa to add', object );
        // console.log( 'email du user', user?.email, 'user email envoyer', object.userEmail );
      }
    } catch (error) {
      console.error(error);
    }
  });

  // const handleDrop = useCallback(
  //        (acceptedFiles) => {
  //               const files = values.images || [];

  //               const newFiles = acceptedFiles.map((file) =>
  //                      Object.assign(file, {
  //                             preview: URL.createObjectURL(file),
  //                      })
  //               );

  //               setValue('images', [...files, ...newFiles], { shouldValidate: true });
  //        },
  //        [setValue, values.images]
  // );
  const uploadAllImages = useCallback(
    async (imagesArray, dispatchGet) => {
      try {
        const uploadedUrls = []; // Tableau pour stocker les URLs
        let coverUrl = null; // Variable pour stocker l'URL cover

        // Utilisation de map + Promise.all
        const uploadPromises = imagesArray.map(async (imageObj) => {
          const result = await dispatchGet(uploadImage(imageObj.file)).unwrap();
          const imageUrl = result.data; // URL de l'image uploadée

          // Ajoute l'URL au tableau
          uploadedUrls.push(imageUrl);

          // Si c'est l'image de couverture, on stocke l'URL
          if (imageObj.iscover) {
            coverUrl = imageUrl;
          }

          return imageUrl;
        });

        // Attend que tous les uploads soient terminés
        const allUrls = await Promise.all(uploadPromises);
        enqueueSnackbar('tous les images on ete uploader avec success');

        console.log('Toutes les images ont été uploadées', allUrls);

        // Retourne à la fois le tableau complet et l'URL cover
        return {
          allUrls,
          coverUrl,
        };
      } catch (error) {
        console.error("Erreur lors de l'upload:", error);
        throw error;
      }
    },
    [enqueueSnackbar] // Aucune dépendance
  );

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const files = values.images || [];

      const updatedFiles = files.map((file) => ({
        file,
        iscover: false,
      }));

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      const allFiles = [...updatedFiles, { file: newFiles[0], iscover: true }];
      setAllfileToUpload(allFiles);

      console.log('filchier a uploader', allFiles);
      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images] // img retiré car c'est une variable locale
  );

  const uploadAllImageCharged = async () => {
    try {
      const { allUrls, coverUrl } = await uploadAllImages(allfileToUpload, dispatch);

      setImageTab(allUrls);
      if (coverUrl) {
        setValue('coverUrl', coverUrl); // Stocke l'URL cover
      }
    } catch (error) {
      // Gestion des erreurs
    }
  };

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  const handleChange = (event) => {
    setChecked(event.target.checked); // Mettre à jour l'état
    console.log('Valeur du Switch :', event.target.checked); // Log de la valeur
  };

  const renderDetails = (
    <>
      {/* {mdUp && (
                            <Grid md={4}>
                                   <Typography variant="h6" sx={{ mb: 0.5 }}>
                                          Details
                                   </Typography>
                                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                          titre, courte description, image...
                                   </Typography>
                            </Grid>
                     )} */}

      <Grid xs={12} md={12}>
        <Card>
          {/* {!mdUp && <CardHeader title="Details" />} */}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Titre de l'annonce" />

            <RHFTextField name="subDescription" label="Description" multiline rows={4} />

            {/* <Stack spacing={ 1.5 }>
                                                 <Typography variant="subtitle2">Content</Typography>
                                                 <RHFEditor simple name="description" />
                                          </Stack> */}

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Images</Typography>
              <RHFUpload multiple thumbnail name="images" maxSize={3145728} onDrop={handleDrop} onRemove={handleRemoveFile} onRemoveAll={handleRemoveAllFiles} onUpload={() => uploadAllImageCharged()} />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {/* {mdUp && (
                            <Grid md={4}>
                                   <Typography variant="h6" sx={{ mb: 0.5 }}>
                                          Autre details
                                   </Typography>
                                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                          Details additionels
                                   </Typography>
                            </Grid>
                     )} */}

      <Grid xs={12} md={12}>
        <Card>
          {/* {!mdUp && <CardHeader title="Autre details" />} */}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              {/* <RHFTextField name="code" label="Product Code" />

                                                 <RHFTextField name="sku" label="Product SKU" /> */}

              {/* <RHFTextField
                                                        name="quantity"
                                                        label="Quantity"
                                                        placeholder="0"
                                                        type="number"
                                                        InputLabelProps={ { shrink: true } }
                                                 /> */}

              <RHFTextField type="number" disabled name="phoneNumber" label="Numero de Telephone" />
              {/* 
                                                 <RHFAutocomplete
                                                        name="city"
                                                        label="Villes"
                                                        placeholder="Sélectionnez une ville"
                                                        freeSolo
                                                        options={villeNames}
                                                        getOptionLabel={(option) => option}
                                                        value={watch("city") || ''} // Chaîne vide par défaut
                                                        onChange={(event, newValue) => {
                                                               setValue("city", newValue || '', { shouldValidate: true }); // Force une chaîne
                                                        }}
                                                        renderOption={(props, option) => (
                                                               <li {...props} key={option}>
                                                                      {option}
                                                               </li>
                                                        )}
                                                 /> */}
              <Autocomplete
                options={villeNames}
                value={values.city || null}
                onChange={(event, newValue) => {
                  setValue('city', newValue, { shouldValidate: true });
                }}
                renderInput={(params) => <TextField {...params} label="Villes" error={!!methods.formState.errors.city} helperText={methods.formState.errors.city?.message} />}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
              <RHFTextField name="location" label="Lieux" />
              <Stack>
                <RHFAutocomplete
                  name="category"
                  label="Services"
                  placeholder="+"
                  multiple
                  freeSolo
                  options={catgOptions}
                  getOptionLabel={(option) => option}
                  value={watch('category')} // Utiliser React Hook Form pour stocker la valeur
                  // value={ selectedTag ? [ selectedTag ] : [] } // Autoriser uniquement un élément
                  // onChange={ ( event, newValue ) =>
                  // {
                  //        if ( newValue.length > 1 )
                  //        {
                  //               return; // Bloquer l'ajout de plus d'un élément
                  //        }
                  //        setSelectedTag( newValue[ 0 ] || null ); // Stocker uniquement un élément
                  // } }
                  onChange={(event, newValue) => {
                    // if ( newValue.length > 1 )
                    // {
                    //        return; // Bloquer l'ajout de plus d'un élément
                    // }
                    setValue('category', newValue); // Mettre à jour React Hook Form
                  }}
                  renderOption={(props, option) => (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  )}
                  renderTags={(selected, getTagProps) => selected.map((option, index) => <Chip {...getTagProps({ index })} key={option} label={option} size="small" color="info" variant="soft" />)}
                />
              </Stack>

              <Stack>
                <Typography variant="subtitle2">Personne accepté</Typography>
                <RHFMultiCheckbox row name="personAccept" spacing={2} options={genre} />
              </Stack>

              <Stack>
                <Typography variant="subtitle2">Se deplace</Typography>
                <RHFMultiCheckbox row name="seDeplace" spacing={2} options={accept} />
              </Stack>

              {/* <RHFMultiSelect
                                                        checkbox
                                                        name="colors"
                                                        label="Colors"
                                                        options={ PRODUCT_COLOR_NAME_OPTIONS }
                                                 />

                                                 <RHFMultiSelect checkbox name="sizes" label="Sizes" options={ PRODUCT_SIZE_OPTIONS } /> */}
            </Box>

            {/* <RHFAutocomplete
                                                 name="tags"
                                                 label="Tags"
                                                 placeholder="+ Tags"
                                                 multiple
                                                 freeSolo
                                                 options={ _tags.map( ( option ) => option ) }
                                                 getOptionLabel={ ( option ) => option }
                                                 renderOption={ ( props, option ) => (
                                                        <li { ...props } key={ option }>
                                                               { option }
                                                        </li>
                                                 ) }
                                                 renderTags={ ( selected, getTagProps ) =>
                                                        selected.map( ( option, index ) => (
                                                               <Chip
                                                                      { ...getTagProps( { index } ) }
                                                                      key={ option }
                                                                      label={ option }
                                                                      size="small"
                                                                      color="info"
                                                                      variant="soft"
                                                               />
                                                        ) )
                                                 }
                                          /> */}

            <Divider sx={{ borderStyle: 'dashed' }} />

            {/* <Stack direction="row" alignItems="center" spacing={ 3 }>
                                                 <RHFSwitch name="saleLabel.enabled" label={ null } sx={ { m: 0 } } />
                                                 <RHFTextField
                                                        name="saleLabel.content"
                                                        label="Sale Label"
                                                        fullWidth
                                                        disabled={ !values.saleLabel.enabled }
                                                 />
                                          </Stack>

                                          <Stack direction="row" alignItems="center" spacing={ 3 }>
                                                 <RHFSwitch name="newLabel.enabled" label={ null } sx={ { m: 0 } } />
                                                 <RHFTextField
                                                        name="newLabel.content"
                                                        label="New Label"
                                                        fullWidth
                                                        disabled={ !values.newLabel.enabled }
                                                 />
                                          </Stack> */}
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderPricing = (
    <>
      {/* {mdUp && (
                            <Grid md={4}>
                                   <Typography variant="h6" sx={{ mb: 0.5 }}>
                                          Tarif
                                   </Typography>
                                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                          Different prix
                                   </Typography>
                            </Grid>
                     )} */}

      <Grid xs={12} md={12}>
        <Card>
          {/* {!mdUp && <CardHeader title="Tarif" />} */}

          <Stack direction="row" alignItems="center" flexWrap={{ xs: 'wrap', md: 'nowrap' }} spacing={3} sx={{ p: 3 }}>
            <RHFTextField
              name="price"
              label="Prix minimum"
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      fcfa
                    </Box>
                  </InputAdornment>
                ),
              }}
            />

            {/* <RHFTextField
                                                 name="prix2coup"
                                                 label="2 coup"
                                                 placeholder="0.00"
                                                 type="number"
                                                 InputLabelProps={ { shrink: true } }
                                                 InputProps={ {
                                                        startAdornment: (
                                                               <InputAdornment position="start">
                                                                      <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                             fcfa
                                                                      </Box>
                                                               </InputAdornment>
                                                        ),
                                                 } }
                                          /> */}

            {/* <FormControlLabel
                                        
                                   </Stack>

                                   <Stack direction="row" alignItems="center" flexWrap={ { xs: "wrap", md: "nowrap" } } spacing={ 3 } sx={ { p: 3 } }>
                                          {/* <RHFTextField
                                                 name="prixMassage"
                                                 label="Massage"
                                                 placeholder="0.00"
                                                 type="number"
                                                 InputLabelProps={ { shrink: true } }
                                                 InputProps={ {
                                                        startAdornment: (
                                                               <InputAdornment position="start">
                                                                      <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                             fcfa
                                                                      </Box>
                                                               </InputAdornment>
                                                        ),
                                                 } }
                                          />

                                          <RHFTextField
                                                 name="prixNuit"
                                                 label="Nuit Entiere"
                                                 placeholder="0.00"
                                                 type="number"
                                                 InputLabelProps={ { shrink: true } }
                                                 InputProps={ {
                                                        startAdornment: (
                                                               <InputAdornment position="start">
                                                                      <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                             fcfa
                                                                      </Box>
                                                               </InputAdornment>
                                                        ),
                                                 } }
                                          /> */}
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        {/* { user?.role === "admin" && <FormControlLabel
                                   control={ <Switch checked={ aLaUne } onChange={ handleChange } /> }
                                   label="A la lune"
                                   sx={ { flexGrow: 1, pl: 3 } }
                            /> } */}

        <LoadingButton sx={{ marginLeft: 'auto' }} type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentProduct ? 'Publier' : 'Modifier'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <>
      <DialogAnnonceBuy showDialog={showDialog} dataGet={dataToAdd} />
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderDetails}

          {renderProperties}

          {renderPricing}

          {renderActions}
        </Grid>
      </FormProvider>
    </>
  );
}

ProductNewEditForm.propTypes = {
  currentProduct2: PropTypes.object,
};
