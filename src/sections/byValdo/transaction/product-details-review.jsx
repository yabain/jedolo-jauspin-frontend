import sumBy from 'lodash/sumBy';
import PropTypes from 'prop-types';

import { request, resetAfterRequest } from 'src/store/comments/get/reducer';
import { useAuthContext } from 'src/auth/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { useLocation } from 'react-router';
import { reviewRef } from 'src/1data/annonces/ref';
import { useBoolean } from 'src/hooks/use-boolean';

import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

import ProductReviewList from './product-review-list';
import ProductReviewNewForm from './product-review-new-form';

// ----------------------------------------------------------------------

export default function ProductDetailsReview( { totalRatings, totalReviews, ratings } )
{
       const review = useBoolean();
       const location = useLocation();
       const { user } = useAuthContext()
       const [ reviews, setReviews ] = useState( [] )
       const dispatch = useDispatch()
       const { data, isPending, isFulled } = useSelector( state => state.getUsersAnnoncesComments )
       const productGet = useMemo( () => location.state?.annonce || null, [ location ] );







       // console.log( totalReviews );
       // console.log( productGet );
       // console.log( user );





       useEffect( () => () => dispatch( resetAfterRequest() ), [ dispatch ] );





       useEffect( () =>
       {

              if ( !isPending && !isFulled )
              {

                     dispatch( request( { type: 'user', annonceId: productGet.id } ) )

              }

       }, [ dispatch, isFulled, isPending, productGet.id, data.length ] );






       useEffect( () =>
       {

              if ( !isPending && isFulled )
              {

                     setReviews( data.comments )
                     // console.log( data )

              }

       }, [ isFulled, isPending, data ] );









       const addNewReviewToLocalReview = ( newItem ) =>
       {

              setReviews( ( prevItems ) => [ ...prevItems, newItem ] );

       };



       const total = sumBy( ratings, ( star ) => star.starCount );

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
                     sx={ {
                            py: 5,
                            px: { xs: 3, md: 5 },
                            borderLeft: ( theme ) => ( {
                                   md: `dashed 1px ${ theme.palette.divider }`,
                            } ),
                            borderRight: ( theme ) => ( {
                                   md: `dashed 1px ${ theme.palette.divider }`,
                            } ),
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
       // console.log( reviews );

       return (
              <>
                     <Box ref={ reviewRef }
                            display="grid"
                            gridTemplateColumns={ {
                                   xs: 'repeat(1, 1fr)',
                                   md: 'repeat(3, 1fr)',
                            } }
                            sx={ {
                                   py: { xs: 5, md: 0 },
                            } }
                     >
                            { renderSummary }

                            { renderProgress }

                            { renderReviewButton }
                     </Box>

                     <Divider sx={ { borderStyle: 'dashed' } } />

                     <ProductReviewList reviews={ reviews } />

                     <ProductReviewNewForm addData={ addNewReviewToLocalReview } open={ review.value } onClose={ review.onFalse } />
              </>
       );
}

ProductDetailsReview.propTypes = {
       ratings: PropTypes.array,

       totalRatings: PropTypes.number,
       totalReviews: PropTypes.number,
};
