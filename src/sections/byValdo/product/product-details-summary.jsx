import * as Yup from 'yup';
import { isArray, sumBy } from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { handleAddNewReviewToLocalReviewdRef } from 'src/1data/annonces/ref';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fDate } from 'src/utils/format-time';
import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import { yupResolver } from '@hookform/resolvers/yup';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

import { useBoolean } from 'src/hooks/use-boolean';
import { LoadingButton } from '@mui/lab';

import { calculateRatingCounts, calculerMoyenneEtoiles, findMatchingWord } from 'src/1functions/annonces';
import { useGet } from 'src/1VALDO/hook/comment/useGet';
import DialogSignalAnnonce from './view/dialog-signal-Annonce';
import ProductReviewNewForm from './product-review-new-form';
// ----------------------------------------------------------------------

export default function ProductDetailsSummary( {
       items,
       product,
       onAddCart,
       onGotoStep,
       disabledActions,
       ...other
} )
{
       const router = useRouter();
       const review = useBoolean();
       const signal = useBoolean();
       const [ ratings, setRating ] = useState( [
              {
                     "name": "1 etoile",
                     "starCount": 0,

              },
              {
                     "name": "2 etoile",
                     "starCount": 0,

              },
              {
                     "name": "3 etoile",
                     "starCount": 0,

              },
              {
                     "name": "4 etoile",
                     "starCount": 0,

              },
              {
                     "name": "5 etoile",
                     "starCount": 0,

              }
       ] )

       const {
              id,
              name,
              sizes,
              price,
              coverUrl,
              colors,
              newLabel,
              available,
              priceSale,
              saleLabel,
              totalRatings,
              totalReviews,
              profile,
              createdAt,
              city,
              contact,
              nbrView,
              inventoryType,
              location,
       } = product;
       // console.log( 'product', product );


       const existProduct = !!items?.length && items.map( ( item ) => item.id ).includes( id );
       const profileColors = {
              'out of stock': 'error',
              'low stock': 'warning',
              default: 'success',
       };

       const isMaxQuantity =
              !!items?.length &&
              items.filter( ( item ) => item.id === id ).map( ( item ) => item.quantity )[ 0 ] >= available;

       // const defaultValues = {
       //        id,
       //        name,
       //        coverUrl,
       //        available,
       //        price,
       //        colors: colors[ 0 ],
       //        size: sizes[ 4 ],
       //        quantity: available < 1 ? 0 : 1,
       // };

       // const methods = useForm( {
       //        defaultValues,
       // } );

       // const { reset, watch, control, setValue, handleSubmit } = methods;


       const ReviewSchema = Yup.object().shape( {
              // rating: Yup.number().min( 1, 'Rating must be greater than or equal to 1' ),
              comment: Yup.string().required( 'Comment is required' ),
       } );


       const defaultValues = {
              rating: 0,
              comment: '',
       };

       const methods = useForm( {
              resolver: yupResolver( ReviewSchema ),
              defaultValues,
       } );

       const {
              reset, watch,
              control,
              handleSubmit,
              formState: { isSubmitting },
       } = methods;


       const values = watch();

       useEffect( () =>
       {
              if ( product )
              {
                     reset( defaultValues );
              }
              // eslint-disable-next-line react-hooks/exhaustive-deps
       }, [ product ] );

       const onSubmit = handleSubmit( async ( data ) =>
       {
              try
              {
                     console.log( 'data', data );


              } catch ( error )
              {
                     console.error( error );
              }
       } );

       const handleAddCart = useCallback( () =>
       {
              const phoneNumber = `237${ contact }`;
              // const phoneNumber = `237696080087`;
              const message = encodeURIComponent( 'Bonjour, j\'ai vu votre annonce sur Ndolo, je suis intéressé par vos services. Pouvez-vous me donner plus de détails ?' );
              const whatsappUrl = `https://wa.me/${ phoneNumber }?text=${ message }`;

              window.open( whatsappUrl, '_blank' );

       }, [ contact ] );







       const setratingGet = ( data ) =>
       {

              setRating( calculateRatingCounts( data.comments, setRating ) )


       }














       let seDeplaceText = '';
       if ( product.seDeplace !== '' )
       {
              const result = findMatchingWord( product.seDeplace, [ 'oui', 'non' ] );
              if ( result === 'oui' )
              {
                     seDeplaceText = ' Se déplace uniquement.';
              } else if ( result === 'non' )
              {
                     seDeplaceText = ' Reçoit uniquement.';
              } else if ( result === 'tout le monde' )
              {
                     seDeplaceText = ' Reçoit et se déplace.';
              }
       }








       useGet( setratingGet, product )

       const renderPrice = (
              <Box sx={ { typography: 'h5' } }>
                     {/* { priceSale && (
                            <Box
                                   component="span"
                                   sx={ {
                                          color: 'text.disabled',
                                          textDecoration: 'line-through',
                                          mr: 0.5,
                                   } }
                            >
                                   { fCurrency( priceSale ) }

                            </Box>
                     ) } */}

                     {/* { fCurrency( price ) } */ }
                     Âge: 24 ans
              </Box>
       );

       const renderShare = (
              <Stack direction="row" spacing={ 3 } justifyContent="center">
                     {/* <Link
                            variant="subtitle2"
                            sx={ {
                                   color: 'text.secondary',
                                   display: 'inline-flex',
                                   alignItems: 'center',
                            } }
                     >
                            <Iconify icon="mingcute:add-line" width={ 16 } sx={ { mr: 1 } } />
                            Compare
                     </Link>

                     <Link
                            variant="subtitle2"
                            sx={ {
                                   color: 'text.secondary',
                                   display: 'inline-flex',
                                   alignItems: 'center',
                            } }
                     >
                            <Iconify icon="solar:heart-bold" width={ 16 } sx={ { mr: 1 } } />
                            Favorite
                     </Link>

                     <Link
                            variant="subtitle2"
                            sx={ {
                                   color: 'text.secondary',
                                   display: 'inline-flex',
                                   alignItems: 'center',
                            } }
                     >
                            <Iconify icon="solar:share-bold" width={ 16 } sx={ { mr: 1 } } />
                            Share
                     </Link> */}

                     <Typography variant="subtitle1" sx={ { flexGrow: 1 } }>
                            ✅  N&apos;oubliez pas de mentionner <strong>NDOLO</strong> lors de votre appel !
                     </Typography>
              </Stack>
       );

       const renderColorOptions = (
              <Stack direction="row">
                     <Typography variant="subtitle1" sx={ { flexGrow: 1 } }>
                            Publier
                     </Typography>

                     <Box
                            component="span"

                     >
                            <Typography variant="body2" sx={ { color: 'text.secondary', flexGrow: 1 } }>
                                   { fDate( createdAt ) }
                            </Typography>
                     </Box>
              </Stack>
       );

       const renderSizeOptions = (
              <Stack direction="row" sx={ { margin: "0 0" } }>
                     <Typography variant="subtitle1" sx={ { flexGrow: 1 } }>
                            Ville
                     </Typography>

                     <Box
                            component="span"

                     >
                            <Typography variant="body2" sx={ { color: 'text.secondary', flexGrow: 1 } }>
                                   { city[ 0 ] }
                            </Typography>
                     </Box>
              </Stack>
       );

       const renderQuantity = (
              <Stack direction="row">
                     <Typography variant="subtitle1" sx={ { flexGrow: 1 } }>
                            Localisation
                     </Typography>

                     <Stack spacing={ 1 }>
                            <Box
                                   component="span"

                            >
                                   <Typography variant="body2" sx={ { color: 'text.secondary', flexGrow: 1 } }>
                                          { location !== undefined ? location : "pas definir lors de la creation" }
                                   </Typography>
                            </Box>

                     </Stack>
              </Stack>
       );


       const renderSummary = (
              <Stack spacing={ 1 } alignItems="center" justifyContent="center">
                     <Typography variant="subtitle2">Average rating</Typography>

                     <Typography variant="h2">{ totalRatings }/5</Typography>

                     <Rating readOnly value={ totalRatings } precision={ 0.1 } />

                     <Typography variant="caption" sx={ { color: 'text.secondary' } }>
                            ({ fShortenNumber( totalReviews ) } reviews)
                     </Typography>
              </Stack>
       );

       const renderProgress = (
              <Stack
                     spacing={ 1.5 }
                     width={ 1 }
                     sx={ {
                            py: 3,
                            px: { xs: 3, md: 5 },
                            // borderLeft: ( theme ) => ( {
                            //        md: `dashed 1px ${ theme.palette.divider }`,
                            // } ),
                            // borderRight: ( theme ) => ( {
                            //        md: `dashed 1px ${ theme.palette.divider }`,
                            // } ),
                     } }
              >
                     {/* { ratings
                            .slice( 0 )
                            .reverse()
                            .map( ( rating ) => (
                                   <Stack key={ rating.name } direction="row" alignItems="center">
                                          <Typography variant="subtitle2" component="span" sx={ { width: 42 } }>
                                                 { rating.name }
                                          </Typography>

                                          <LinearProgress
                                                 color="inherit"
                                                 variant="determinate"
                                                 value={ ( rating.starCount / total ) * 100 }
                                                 sx={ {
                                                        mx: 2,
                                                        flexGrow: 1,
                                                 } }
                                          />

                                          <Typography
                                                 variant="body2"
                                                 component="span"
                                                 sx={ {
                                                        minWidth: 48,
                                                        color: 'text.secondary',
                                                 } }
                                          >
                                                 { fShortenNumber( rating.reviewCount ) }
                                          </Typography>
                                   </Stack>
                            ) ) } */}
              </Stack>
       );



       const renderActions = (
              <Stack direction="row" justifyContent="space-between" spacing={ 2 }>
                     <Button

                            size="medium"

                            color="success"
                            variant="contained"
                            startIcon={ <Iconify icon="ic:baseline-whatsapp" width={ 24 } /> }
                            onClick={ handleAddCart }
                            sx={ { whiteSpace: 'nowrap', width: '120px' } }
                     >
                            Contacter
                     </Button>

                     <Button
                            onClick={ () => { review.onTrue() } }
                            sx={ { whiteSpace: 'nowrap', width: '120px' } } size="medium" type="submit" variant="contained"  >
                            Commenter
                     </Button>

                     <Button
                            size="medium"
                            sx={ { whiteSpace: 'nowrap', width: '120px' } }
                            variant="contained"
                            color="error"
                            onClick={ signal.onTrue }
                            startIcon={ <Iconify icon="solar:pen-bold" /> }
                     >
                            Signaler
                     </Button>

              </Stack>
       );

       const renderSubDescription = (
              <Typography variant="body2" sx={ { color: 'text.secondary' } }>
                     {/* { subDescription } */ }
                     Je suis Une Femme  Clients accepte { findMatchingWord( product.personAccept || [ 'femme' ], [ "Homme", 'femme' ] ) }  { ( isArray( product.personAccept ) && product.personAccept.length < 2 && 'uniquement' ) }.{ seDeplaceText }
              </Typography>
       );

       const renderRating = (
              <Stack
                     direction="row"
                     alignItems="center"
                     sx={ {
                            color: 'text.disabled',
                            typography: 'body2',
                     } }
              >
                     <Rating size="small" value={ Number( product.rating ) || 0 } precision={ 0.1 } readOnly sx={ { mr: 1 } } />
                     {/* { `(${ fShortenNumber( totalReviews ) } reviews)` } */ }
              </Stack>
       );

       const renderLabels = (
              <Stack direction="row" alignItems="center" spacing={ 1 }>
                     <Label color="info">{ nbrView || 0 } vues</Label>
                     <Label color={ product.certified ? "info" : 'error' } >{ product.certified ? "Compte Certifier" : 'Compte non Certifier' } </Label>
                     <Label color={ product.sponsored ? "info" : 'error' } >{ product.sponsored ? "Sponsoriser" : 'Non Sponsoriser' } </Label>
              </Stack>
       );

       const renderprofile = (
              <Box
                     component="span"
                     sx={ {
                            typography: 'overline',
                            color: `${ profileColors[ profile ] || profileColors.default }.main`,
                     } }
              >
                     <Label variant="soft" color={ profileColors[ profile ] || profileColors.default }>
                            { profile }
                     </Label>
              </Box>
       );
       const renderLabelBox = ( text, text2 ) => (
              <Box width={ 1 } display="flex" justifyContent="space-between">
                     { text }
                     <Label variant="soft" color={ profileColors[ profile ] || profileColors.default }>
                            { text2 }
                     </Label>
              </Box>
       );

       const allData = <Stack spacing={ 3 } sx={ { pt: 0 } } { ...other }>
              <Stack spacing={ 2 } alignItems="flex-start">
                     { renderLabels }

                     { renderprofile }

                     <Typography variant="h6">{ name }</Typography>

                     { renderLabelBox( "Age", profile ) }
                     { renderLabelBox( "Ville", profile ) }
                     { renderLabelBox( "Lieux", profile ) }
                     { renderLabelBox( "publier le", profile ) }
                     { renderLabelBox( "Sodomie", 'Non' ) }
                     { renderLabelBox( "Deplacement", profile ) }
                     { renderLabelBox( "Client Accepté", profile ) }
                     { renderLabelBox( "Client Accepté", profile ) }
                     { renderLabelBox( "Preservatif Obligatoire", 'oui' ) }


                     {/* { renderPrice }

                                   { renderSubDescription } */}
              </Stack>

              {/* <Divider sx={ { borderStyle: 'dashed' } } /> */ }

              {/* { renderActions } */ }
              <Box
                     display="flex"

                     sx={ {
                            py: { xs: 5, md: 0 },
                     } }
              >
                     {/* { renderSummary } */ }

                     {/* { renderProgress } */ }

              </Box>

              {/* <Divider sx={ { borderStyle: 'dashed' } } /> */ }


              {/* { renderShare } */ }
       </Stack>


       const renderInventoryType = (
              <Box
                     component="span"
                     sx={ {
                            typography: 'overline',
                            color:
                                   ( inventoryType === 'out of stock' && 'error.main' ) ||
                                   ( inventoryType === 'low stock' && 'warning.main' ) ||
                                   'success.main',
                     } }
              >
                     kkk
              </Box>
       );


       return (
              <>
                     {/* <FormProvider methods={ methods } onSubmit={ onSubmit }> */ }
                     <Stack spacing={ 3 } sx={ { pt: 3 } } { ...other }>
                            <Stack spacing={ 2 } alignItems="flex-start">
                                   { renderLabels }

                                   {/* { renderInventoryType } */ }

                                   <Typography variant="h3">{ name }</Typography>

                                   { renderRating }

                                   { renderPrice }

                                   { renderSubDescription }
                            </Stack>

                            <Divider sx={ { borderStyle: 'dashed' } } />

                            { renderColorOptions }

                            { renderSizeOptions }

                            { renderQuantity }

                            <Divider sx={ { borderStyle: 'dashed' } } />

                            { renderActions }

                            { renderShare }

                            <ProductReviewNewForm rating={ ratings } annonce={ product } open={ review.value } onClose={ review.onFalse } />

                     </Stack>

                     {/* </FormProvider> */ }

                     <DialogSignalAnnonce showDialog={ signal } />
                     {/* <Dialog open={ signal.value } onClose={ signal.onFalse }   >
                            <FormProvider methods={ methods } onSubmit={ onSubmit }>
                                   <DialogTitle> Add Review </DialogTitle>

                                   <DialogContent>
                                          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={ 1.5 }>
                                                 <Typography variant="body2">Your review about this product:</Typography>


                                          </Stack>


                                          <RHFTextField name="comment" label="Commantaire *" multiline rows={ 3 } sx={ { mt: 3 } } />

                                     
                                   </DialogContent>

                                   <DialogActions>
                                          <Button color="inherit" variant="outlined" onClick={ signal.onFalse }>
                                                 Cancel
                                          </Button>

                                          <LoadingButton type="submit" variant="contained" loading={ false }>
                                                 Poster
                                          </LoadingButton>
                                   </DialogActions>
                            </FormProvider>
                     </Dialog> */}
              </>
       );


}

ProductDetailsSummary.propTypes = {
       items: PropTypes.array,
       disabledActions: PropTypes.bool,
       onAddCart: PropTypes.func,
       onGotoStep: PropTypes.func,
       product: PropTypes.object,
};
