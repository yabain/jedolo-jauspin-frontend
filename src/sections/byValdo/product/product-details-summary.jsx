
import { sumBy } from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFSelect } from 'src/components/hook-form';

import { useBoolean } from 'src/hooks/use-boolean';
import IncrementerButton from './common/incrementer-button';

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
              subDescription,
              ratings,
              reviews,
       } = product;

       const total = sumBy( ratings, ( star ) => star.starCount );
       const existProduct = !!items?.length && items.map( ( item ) => item.id ).includes( id );

       const isMaxQuantity =
              !!items?.length &&
              items.filter( ( item ) => item.id === id ).map( ( item ) => item.quantity )[ 0 ] >= available;

       const defaultValues = {
              id,
              name,
              coverUrl,
              available,
              price,
              colors: colors[ 0 ],
              size: sizes[ 4 ],
              quantity: available < 1 ? 0 : 1,
       };

       const methods = useForm( {
              defaultValues,
       } );

       const { reset, watch, control, setValue, handleSubmit } = methods;

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
                     if ( !existProduct )
                     {
                            onAddCart?.( {
                                   ...data,
                                   colors: [ values.colors ],
                                   subTotal: data.price * data.quantity,
                            } );
                     }
                     onGotoStep?.( 0 );
                     router.push( paths.product.checkout );
              } catch ( error )
              {
                     console.error( error );
              }
       } );

       const handleAddCart = useCallback( () =>
       {
              try
              {
                     onAddCart?.( {
                            ...values,
                            colors: [ values.colors ],
                            subTotal: values.price * values.quantity,
                     } );
              } catch ( error )
              {
                     console.error( error );
              }
       }, [ onAddCart, values ] );

       const renderPrice = (
              <Box sx={ { typography: 'h5' } }>
                     { priceSale && (
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
                     ) }

                     { fCurrency( price ) }
              </Box>
       );

       const renderShare = (
              <Stack direction="row" spacing={ 3 } justifyContent="center">
                     <Link
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
                     </Link>
              </Stack>
       );

       const renderColorOptions = (
              <Stack direction="row">
                     <Typography variant="subtitle2" sx={ { flexGrow: 1 } }>
                            Color
                     </Typography>

                     <Controller
                            name="colors"
                            control={ control }
                            render={ ( { field } ) => (
                                   <ColorPicker
                                          colors={ colors }
                                          selected={ field.value }
                                          onSelectColor={ ( color ) => field.onChange( color ) }
                                          limit={ 4 }
                                   />
                            ) }
                     />
              </Stack>
       );

       const renderSizeOptions = (
              <Stack direction="row">
                     <Typography variant="subtitle2" sx={ { flexGrow: 1 } }>
                            Size
                     </Typography>

                     <RHFSelect
                            name="size"
                            size="small"
                            helperText={
                                   <Link underline="always" color="textPrimary">
                                          Size Chart
                                   </Link>
                            }
                            sx={ {
                                   maxWidth: 88,
                                   [ `& .${ formHelperTextClasses.root }` ]: {
                                          mx: 0,
                                          mt: 1,
                                          textAlign: 'right',
                                   },
                            } }
                     >
                            { sizes.map( ( size ) => (
                                   <MenuItem key={ size } value={ size }>
                                          { size }
                                   </MenuItem>
                            ) ) }
                     </RHFSelect>
              </Stack>
       );

       const renderQuantity = (
              <Stack direction="row">
                     <Typography variant="subtitle2" sx={ { flexGrow: 1 } }>
                            Quantity
                     </Typography>

                     <Stack spacing={ 1 }>
                            <IncrementerButton
                                   name="quantity"
                                   quantity={ values.quantity }
                                   disabledDecrease={ values.quantity <= 1 }
                                   disabledIncrease={ values.quantity >= available }
                                   onIncrease={ () => setValue( 'quantity', values.quantity + 1 ) }
                                   onDecrease={ () => setValue( 'quantity', values.quantity - 1 ) }
                            />

                            <Typography variant="caption" component="div" sx={ { textAlign: 'right' } }>
                                   Available: { available }
                            </Typography>
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
                     { ratings
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
                            ) ) }
              </Stack>
       );

       const renderReviewButton = (
              <Stack alignItems="center" justifyContent="center">
                     <Button
                            size="large"
                            variant="soft"
                            color="inherit"
                            onClick={ review.onTrue }
                            startIcon={ <Iconify icon="solar:pen-bold" /> }
                     >
                            Write your review
                     </Button>
              </Stack>
       );

       const renderActions = (
              <Stack direction="row" spacing={ 2 }>
                     <Button

                            size="medium"

                            color="success"
                            variant="contained"
                            startIcon={ <Iconify icon="solar:cart-plus-bold" width={ 24 } /> }
                            onClick={ handleAddCart }
                            sx={ { whiteSpace: 'nowrap', width: '120px' } }
                     >
                            Contacter
                     </Button>

                     <Button
                            sx={ { whiteSpace: 'nowrap', width: '120px' } } size="medium" type="submit" variant="contained"  >
                            Commmenter
                     </Button>

                     <Button
                            size="medium"
                            sx={ { whiteSpace: 'nowrap', width: '120px' } }
                            variant="contained"
                            color="error"
                            onClick={ review.onTrue }
                            startIcon={ <Iconify icon="solar:pen-bold" /> }
                     >
                            Signaler
                     </Button>

              </Stack>
       );

       const renderSubDescription = (
              <Typography variant="body2" sx={ { color: 'text.secondary' } }>
                     { subDescription }
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
                     <Rating size="small" value={ totalRatings } precision={ 0.1 } readOnly sx={ { mr: 1 } } />
                     { `(${ fShortenNumber( totalReviews ) } reviews)` }
              </Stack>
       );

       const renderLabels = ( newLabel.enabled || saleLabel.enabled ) && (
              <Stack direction="row" alignItems="center" spacing={ 1 }>
                     { newLabel.enabled && <Label color="info">{ newLabel.content }</Label> }
                     { saleLabel.enabled && <Label color="error">{ saleLabel.content }</Label> }
              </Stack>
       );
       const profileColors = {
              'out of stock': 'error',
              'low stock': 'warning',
              default: 'success',
       };

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


       return (
              <FormProvider methods={ methods } onSubmit={ onSubmit }>
                     <Stack spacing={ 3 } sx={ { pt: 0 } } { ...other }>
                            <Stack spacing={ 2 } alignItems="flex-start">
                                   { renderLabels }

                                   { renderprofile }

                                   <Typography variant="h6">{ name }</Typography>


                                   { renderPrice }

                                   { renderSubDescription }
                            </Stack>

                            {/* <Divider sx={ { borderStyle: 'dashed' } } /> */ }

                            { renderActions }
                            <Box
                                   display="flex"

                                   sx={ {
                                          py: { xs: 5, md: 0 },
                                   } }
                            >
                                   { renderSummary }

                                   { renderProgress }

                            </Box>

                            {/* <Divider sx={ { borderStyle: 'dashed' } } /> */ }


                            {/* { renderShare } */ }
                     </Stack>
              </FormProvider>
       );
}

ProductDetailsSummary.propTypes = {
       items: PropTypes.array,
       disabledActions: PropTypes.bool,
       onAddCart: PropTypes.func,
       onGotoStep: PropTypes.func,
       product: PropTypes.object,
};
