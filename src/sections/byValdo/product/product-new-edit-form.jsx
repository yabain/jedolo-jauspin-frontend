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

import
{
       _tags,
       PRODUCT_SIZE_OPTIONS,
       PRODUCT_GENDER_OPTIONS,
       PRODUCT_COLOR_NAME_OPTIONS,
       PRODUCT_CATEGORY_GROUP_OPTIONS,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
       RHFSelect,
       RHFEditor,
       RHFUpload,
       RHFSwitch,
       RHFTextField,
       RHFMultiSelect,
       RHFAutocomplete,
       RHFMultiCheckbox,
} from 'src/components/hook-form';
import { addAnnoncesToUsersList } from 'src/1functions/annonces';
import { useLocation, useNavigate } from 'react-router';
import { addData, setData } from 'src/store/annonces/data/dataReducer';
import { request, resetAfterRequest } from 'src/store/annonces/addAnnonce/reducer';
import { request as updateAnnoncesRequest, resetAfterRequest as resetAfterUpdate } from 'src/store/annonces/updateAnnonce/reducer'
import { useAuthContext } from 'src/auth/hooks';
import DialogAnnonceBuy from 'src/1VALDO/components/annonces/dialog-annonce-buy';
import { useBoolean } from 'src/hooks/use-boolean';
import { city } from 'src/assets/data/location.service';

// ----------------------------------------------------------------------

export default function ProductNewEditForm( { currentProduct2 } )
{

       const annonceFromStore = useSelector( ( state ) => state.annonces.data );
       const { user } = useAuthContext()

       const { isFulled, isPending } = useSelector( ( state ) => state.addAnnonces );
       const isFulledUpdate = useSelector( ( state ) => state.updateUserAnnonce.isFulled );
       const isPendingUpdate = useSelector( ( state ) => state.updateUserAnnonce.isPending );

       const [ selectedTag, setSelectedTag ] = useState( null );



       const redirect = useNavigate();
       const dispatch = useDispatch()
       const location = useLocation();
       const [ dataAdded, setDataAdded ] = useState( {} )

       const showDialog = useBoolean()
       const showPaiementStatut = useBoolean()
       const currentProduct = location.state?.data;
       const [ aLaUne, setChecked ] = useState( currentProduct?.aLaUne || false ); // État du switch
       // const currentProduct = location.state !== null ? location.state.data : undefined;
       // console.log( currentProduct );



       const router = useRouter();

       const mdUp = useResponsive( 'up', 'md' );

       const { enqueueSnackbar } = useSnackbar();

       const [ includeTaxes, setIncludeTaxes ] = useState( false );
       const [ dataToAdd, setDataToAdd ] = useState( {} );

       const NewProductSchema = Yup.object().shape( {
              // name: Yup.string().required( 'Name is required' ),
              // images: Yup.array().min( 1, 'Images is required' ),
              // tags: Yup.array().min( 2, 'Must have at least 2 tags' ),
              // category: Yup.string().required( 'Category is required' ),
              // price: Yup.number().moreThan( 0, 'Price should not be $0.00' ),
              // description: Yup.string().required( 'Description is required' ),
              // not required
              taxes: Yup.number(),
              newLabel: Yup.object().shape( {
                     enabled: Yup.boolean(),
                     content: Yup.string(),
              } ),
              saleLabel: Yup.object().shape( {
                     enabled: Yup.boolean(),
                     content: Yup.string(),
              } ),
       } );

       const ville = city;
       const villeNames = [ ...new Set( ville.map( ( item ) => item.name ) ) ];
       // console.log( ville );
       // console.log( villeNames );



       const catgOptions = [


              'Pipe',
              'Chatte',
              'Vaginal',
              'Anal',
              'Massage',
              'Partouze',


       ];

       const genre = [
              { label: 'Homme', value: 'Homme' },
              { label: 'Femme', value: 'Femme' },
       ];

       const accept = [
              { label: 'Oui', value: 'Oui' },
              { label: 'Non', value: 'Non' },
       ];

       const defaultValues = useMemo(
              () => ( {


                     name: currentProduct?.name || '',
                     subDescription: currentProduct?.subDescription || '',
                     images: currentProduct?.images || [],
                     price: currentProduct?.price || 0,
                     city: currentProduct?.city || [],
                     categorie: currentProduct?.categorie || [],
                     localisation: currentProduct?.localisation || '',
                     seDeplace: currentProduct?.seDeplace || '',
                     personAccept: currentProduct?.personAccept || '',



                     // code: currentProduct?.code || '',
                     // sku: currentProduct?.sku || '',
                     // taxes: currentProduct?.taxes || 0,
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
              } ),
              [ currentProduct ]
       );

       const methods = useForm( {
              resolver: yupResolver( NewProductSchema ),
              defaultValues,
       } );

       const {
              reset,
              watch,
              setValue,
              handleSubmit,
              formState: { isSubmitting },
       } = methods;

       const values = watch();

       useEffect( () =>
       {
              if ( currentProduct )
              {
                     reset( defaultValues );
              }
       }, [ currentProduct, defaultValues, reset ] );

       useEffect( () =>
       {
              if ( includeTaxes )
              {
                     setValue( 'taxes', 0 );
              } else
              {
                     setValue( 'taxes', currentProduct?.taxes || 0 );
              }
       }, [ currentProduct?.taxes, includeTaxes, setValue ] );









       useEffect( () =>
       {
              if ( isFulled && !isPending )
              {

                     dispatch( resetAfterRequest() )
                     dispatch( addData( dataToAdd ) )
                     enqueueSnackbar( 'annonce publier avec succes' );
                     redirect( -1 );


              }
       }, [ isFulled, isPending, dataToAdd, dispatch, redirect, enqueueSnackbar ] )











       useEffect( () =>
       {



              if ( !isPendingUpdate && isFulledUpdate )
              {


                     dispatch( resetAfterUpdate() )
                     redirect( -1 );



                     enqueueSnackbar( 'Annonce mis à jour avec succes!' );

              }

       }, [ enqueueSnackbar, dispatch, redirect, isFulledUpdate, isPendingUpdate ] );














       const onSubmit = handleSubmit( async ( data ) =>
       {
              try
              {


                     // console.log( 'datat to add', data );

                     await new Promise( ( resolve ) => setTimeout( resolve, 500 ) );

                     // reset();
                     // console.log( 'user du send ', user );

                     const object = {



                            "publish": "published",
                            "price": "2500",
                            "profile": "standard",

                            "createdAt": Date.now(),

                            "coverUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg",



                            ...data,
                            aLaUne,
                            id: !currentProduct ? Date.now() : Number( currentProduct.id ),
                            userEmail: !currentProduct ? user.email : currentProduct.userEmail


                     }
                     if ( !currentProduct )
                     {

                            // dispatch( request( object ) )

                            setDataToAdd( object )
                            showDialog.onTrue()

                            // console.log( 'email du user', user.email, 'user email envoyer', object.userEmail );
                            // console.log( 'dtaa to add', object );

                     }


                     if ( currentProduct )
                     {

                            dispatch( updateAnnoncesRequest( object ) )
                            // console.log( 'dtaa to add', object );
                            // console.log( 'email du user', user.email, 'user email envoyer', object.userEmail );

                     }


              } catch ( error )
              {
                     console.error( error );
              }
       } );














       const handleDrop = useCallback(
              ( acceptedFiles ) =>
              {
                     const files = values.images || [];

                     const newFiles = acceptedFiles.map( ( file ) =>
                            Object.assign( file, {
                                   preview: URL.createObjectURL( file ),
                            } )
                     );

                     setValue( 'images', [ ...files, ...newFiles ], { shouldValidate: true } );
              },
              [ setValue, values.images ]
       );

       const handleRemoveFile = useCallback(
              ( inputFile ) =>
              {
                     const filtered = values.images && values.images?.filter( ( file ) => file !== inputFile );
                     setValue( 'images', filtered );
              },
              [ setValue, values.images ]
       );

       const handleRemoveAllFiles = useCallback( () =>
       {
              setValue( 'images', [] );
       }, [ setValue ] );

       const handleChangeIncludeTaxes = useCallback( ( event ) =>
       {
              setIncludeTaxes( event.target.checked );
       }, [] );

       const handleChange = ( event ) =>
       {
              setChecked( event.target.checked ); // Mettre à jour l'état
              console.log( "Valeur du Switch :", event.target.checked ); // Log de la valeur
       };


       const renderDetails = (
              <>
                     { mdUp && (
                            <Grid md={ 4 }>
                                   <Typography variant="h6" sx={ { mb: 0.5 } }>
                                          Details
                                   </Typography>
                                   <Typography variant="body2" sx={ { color: 'text.secondary' } }>
                                          titre, courte description, image...
                                   </Typography>
                            </Grid>
                     ) }

                     <Grid xs={ 12 } md={ 8 }>
                            <Card>
                                   { !mdUp && <CardHeader title="Details" /> }

                                   <Stack spacing={ 3 } sx={ { p: 3 } }>
                                          <RHFTextField name="name" label="Titre de l'annonce" />

                                          <RHFTextField name="subDescription" label="Description" multiline rows={ 4 } />

                                          {/* <Stack spacing={ 1.5 }>
                                                 <Typography variant="subtitle2">Content</Typography>
                                                 <RHFEditor simple name="description" />
                                          </Stack> */}

                                          <Stack spacing={ 1.5 }>
                                                 <Typography variant="subtitle2">Images</Typography>
                                                 <RHFUpload
                                                        multiple
                                                        thumbnail
                                                        name="images"
                                                        maxSize={ 3145728 }
                                                        onDrop={ handleDrop }
                                                        onRemove={ handleRemoveFile }
                                                        onRemoveAll={ handleRemoveAllFiles }
                                                        onUpload={ () => console.info( 'ON UPLOAD' ) }
                                                 />
                                          </Stack>
                                   </Stack>
                            </Card>
                     </Grid>
              </>
       );

       const renderProperties = (
              <>
                     { mdUp && (
                            <Grid md={ 4 }>
                                   <Typography variant="h6" sx={ { mb: 0.5 } }>
                                          Autre details
                                   </Typography>
                                   <Typography variant="body2" sx={ { color: 'text.secondary' } }>
                                          Details additionels
                                   </Typography>
                            </Grid>
                     ) }

                     <Grid xs={ 12 } md={ 8 }>
                            <Card>
                                   { !mdUp && <CardHeader title="Autre details" /> }

                                   <Stack spacing={ 3 } sx={ { p: 3 } }>
                                          <Box
                                                 columnGap={ 2 }
                                                 rowGap={ 3 }
                                                 display="grid"
                                                 gridTemplateColumns={ {
                                                        xs: 'repeat(1, 1fr)',
                                                        md: 'repeat(2, 1fr)',
                                                 } }
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
                                                 <RHFAutocomplete
                                                        name="city"
                                                        label="Villes"
                                                        placeholder="+"
                                                        multiple
                                                        freeSolo
                                                        options={ villeNames }
                                                        getOptionLabel={ ( option ) => option }
                                                        value={ watch( "city" ) } // Utiliser React Hook Form pour stocker la valeur

                                                        // value={ selectedTag ? [ selectedTag ] : [] } // Autoriser uniquement un élément
                                                        // onChange={ ( event, newValue ) =>
                                                        // {
                                                        //        if ( newValue.length > 1 )
                                                        //        {
                                                        //               return; // Bloquer l'ajout de plus d'un élément
                                                        //        }
                                                        //        setSelectedTag( newValue[ 0 ] || null ); // Stocker uniquement un élément
                                                        // } }
                                                        onChange={ ( event, newValue ) =>
                                                        {
                                                               if ( newValue.length > 1 )
                                                               {
                                                                      return; // Bloquer l'ajout de plus d'un élément
                                                               }
                                                               setValue( "city", newValue ); // Mettre à jour React Hook Form
                                                        } }
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
                                                 />

                                                 <RHFTextField name="localisation" label="Lieux" />
                                                 <Stack >
                                                        <RHFAutocomplete
                                                               name="categorie"
                                                               label="Services"
                                                               placeholder="+"
                                                               multiple
                                                               freeSolo
                                                               options={ catgOptions }
                                                               getOptionLabel={ ( option ) => option }
                                                               value={ watch( "categorie" ) } // Utiliser React Hook Form pour stocker la valeur

                                                               // value={ selectedTag ? [ selectedTag ] : [] } // Autoriser uniquement un élément
                                                               // onChange={ ( event, newValue ) =>
                                                               // {
                                                               //        if ( newValue.length > 1 )
                                                               //        {
                                                               //               return; // Bloquer l'ajout de plus d'un élément
                                                               //        }
                                                               //        setSelectedTag( newValue[ 0 ] || null ); // Stocker uniquement un élément
                                                               // } }
                                                               onChange={ ( event, newValue ) =>
                                                               {
                                                                      // if ( newValue.length > 1 )
                                                                      // {
                                                                      //        return; // Bloquer l'ajout de plus d'un élément
                                                                      // }
                                                                      setValue( "categorie", newValue ); // Mettre à jour React Hook Form
                                                               } }
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
                                                        />
                                                 </Stack>

                                                 <Stack >
                                                        <Typography variant="subtitle2">Personne accepté</Typography>
                                                        <RHFMultiCheckbox row name="personAccept" spacing={ 2 } options={ genre } />
                                                 </Stack>

                                                 <Stack >
                                                        <Typography variant="subtitle2">Se deplace</Typography>
                                                        <RHFMultiCheckbox row name="seDeplace" spacing={ 2 } options={ accept } />
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






                                          <Divider sx={ { borderStyle: 'dashed' } } />

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


                     { mdUp && (
                            <Grid md={ 4 }>
                                   <Typography variant="h6" sx={ { mb: 0.5 } }>
                                          Tarif
                                   </Typography>
                                   <Typography variant="body2" sx={ { color: 'text.secondary' } }>
                                          Different prix
                                   </Typography>
                            </Grid>
                     ) }

                     <Grid xs={ 12 } md={ 8 }>
                            <Card>
                                   { !mdUp && <CardHeader title="Tarif" /> }

                                   <Stack direction="row" alignItems="center" flexWrap={ { xs: "wrap", md: "nowrap" } } spacing={ 3 } sx={ { p: 3 } }>
                                          <RHFTextField
                                                 name="price"
                                                 label="Prix minimum"
                                                 placeholder="0.00"
                                                 type="number"
                                                 InputLabelProps={ { shrink: true } }
                                                 InputProps={ {
                                                        endAdornment: (
                                                               <InputAdornment position="start">
                                                                      <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                             fcfa
                                                                      </Box>
                                                               </InputAdornment>
                                                        ),
                                                 } }
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
                                                 control={ <Switch checked={ includeTaxes } onChange={ handleChangeIncludeTaxes } /> }
                                                 label="Price includes taxes"
                                          /> */}

                                          {/* { !includeTaxes && (
                                                 <RHFTextField
                                                        name="taxes"
                                                        label="Tax (%)"
                                                        placeholder="0.00"
                                                        type="number"
                                                        InputLabelProps={ { shrink: true } }
                                                        InputProps={ {
                                                               startAdornment: (
                                                                      <InputAdornment position="start">
                                                                             <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                                    %
                                                                             </Box>
                                                                      </InputAdornment>
                                                               ),
                                                        } }
                                                 />
                                          ) } */}
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

                                          {/* <FormControlLabel
                                                 control={ <Switch checked={ includeTaxes } onChange={ handleChangeIncludeTaxes } /> }
                                                 label="Price includes taxes"
                                          /> */}

                                          {/* { !includeTaxes && (
                                                 <RHFTextField
                                                        name="taxes"
                                                        label="Tax (%)"
                                                        placeholder="0.00"
                                                        type="number"
                                                        InputLabelProps={ { shrink: true } }
                                                        InputProps={ {
                                                               startAdornment: (
                                                                      <InputAdornment position="start">
                                                                             <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                                    %
                                                                             </Box>
                                                                      </InputAdornment>
                                                               ),
                                                        } }
                                                 />
                                          ) } */}
                                   </Stack>
                            </Card>
                     </Grid>
              </>
       );

       const renderActions = (
              <>
                     { mdUp && <Grid md={ 4 } /> }
                     <Grid xs={ 12 } md={ 8 } sx={ { display: 'flex', alignItems: 'center' } }>


                            {/* { user.role === "admin" && <FormControlLabel
                                   control={ <Switch checked={ aLaUne } onChange={ handleChange } /> }
                                   label="A la lune"
                                   sx={ { flexGrow: 1, pl: 3 } }
                            /> } */}

                            <LoadingButton sx={ { marginLeft: "auto" } } type="submit" variant="contained" size="large" loading={ isSubmitting }>
                                   { !currentProduct ? 'Publier' : 'Modifier' }
                            </LoadingButton>
                     </Grid>
              </>
       );

       return (
              <>
                     <DialogAnnonceBuy showDialog={ showDialog } dataGet={ dataToAdd } startPaiement={ showPaiementStatut } />
                     <FormProvider methods={ methods } onSubmit={ onSubmit }>
                            <Grid container spacing={ 3 }>
                                   { renderDetails }

                                   { renderProperties }

                                   { renderPricing }

                                   { renderActions }
                            </Grid>
                     </FormProvider>
              </>
       );
}

ProductNewEditForm.propTypes = {
       currentProduct2: PropTypes.object,
};
