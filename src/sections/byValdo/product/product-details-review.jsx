import sumBy from 'lodash/sumBy';
import PropTypes from 'prop-types';

import { request, resetAfterRequest } from 'src/store/comments/get/reducer';
import { useAuthContext } from 'src/auth/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { useLocation } from 'react-router';
import { handleAddNewReviewToLocalReviewdRef, reviewRef } from 'src/1data/annonces/ref';
import { useBoolean } from 'src/hooks/use-boolean';

import { useAddComment } from 'src/1VALDO/hook/comment/use-add-comment';
import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

import ProductReviewList from './product-review-list';
import ProductReviewNewForm from './product-review-new-form';

// ----------------------------------------------------------------------

export default function ProductDetailsReview({ annonce, totalRatings, totalReviews, getChildValue }) {
       const review = useBoolean();
       const location = useLocation();
       const { user } = useAuthContext()
       const [reviews, setReviews] = useState([])
       // console.log(annonce);

       const [ratingGet, setRatingGet] = useState(annonce.rating)
       const dispatch = useDispatch()
       const { data, isPending, isFulled } = useSelector(state => state.getUsersAnnoncesComments)
       const productGet = useMemo(() => location.state?.annonce || null, [location]);
       const [ratings, setRating] = useState([
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
       ])
       const calculateRatingCounts = (commentsArray) => {
              const counts = [0, 0, 0, 0, 0]; // index 0 → 1 étoile, index 4 → 5 étoiles

              commentsArray.forEach((item) => {
                     if (item.rating >= 1 && item.rating <= 5) {
                            counts[item.rating - 1] += 1;
                     }
              });

              return [
                     { name: "1 etoile", starCount: counts[0] },
                     { name: "2 etoile", starCount: counts[1] },
                     { name: "3 etoile", starCount: counts[2] },
                     { name: "4 etoile", starCount: counts[3] },
                     { name: "5 etoile", starCount: counts[4] },
              ];
       };

       const updateRatingsWithNewComment = (newComment) => {
              if (newComment.rating >= 1 && newComment.rating <= 5) {
                     setRating((prevRatings) =>
                            prevRatings.map((ratingObj, index) => {
                                   if (index === newComment.rating - 1) {
                                          return {
                                                 ...ratingObj,
                                                 starCount: ratingObj.starCount + 1,
                                          };
                                   }
                                   return ratingObj;
                            })
                     );
              }
       };



       useEffect(
              () => {
                     getChildValue(data.comments?.length)
                     console.log(data.comments);

              }, [data, getChildValue]
       )

       const calculerMoyenneEtoiles = (data2) => {
              let totalVotes = 0;
              let totalPoints = 0;

              // console.log( 'comment get', data2 );

              data2.forEach((item, index) => {
                     const etoile = index + 1; // 1 à 5 étoiles
                     totalVotes += item.starCount;
                     totalPoints += etoile * item.starCount;
              });
              if (totalVotes === 0) {
                     console.log('Aucun vote, la moyenne est 0');
                     return 0; // Retourne 0 si aucun vote n'a été enregistré
              }


              const moyenne = totalPoints / totalVotes;
              console.log('pts mm', moyenne.toFixed(2));
              return moyenne.toFixed(2); // arrondi à 2 décimales
       }



       // console.log( totalReviews );
       // console.log( productGet );
       // console.log( user );





       useEffect(() => () => dispatch(resetAfterRequest()), [dispatch]);





       useEffect(() => {

              if (!isPending && !isFulled) {

                     dispatch(request({ type: 'user', annonceId: productGet._id }))

              }

       }, [dispatch, isFulled, isPending, productGet._id, data.length]);






       useEffect(() => {

              if (!isPending && isFulled) {

                     console.log('datra obssssssssssssssssssssstenu apres la requette ', data)

                     setReviews(data.comments)
                     setRating(calculateRatingCounts(data.comments))

              }

       }, [isFulled, isPending, data]);









       const addNewReviewToLocalReview = useCallback((newItem) => {

              setReviews((prevItems) => [...prevItems, newItem]);
              updateRatingsWithNewComment(newItem)

       }, [])


       useEffect(() => {
              handleAddNewReviewToLocalReviewdRef.current = addNewReviewToLocalReview

       }, [addNewReviewToLocalReview])


       const handlesucces = (dataGet) => { console.log(dataGet.data.finalRating); setRatingGet(dataGet.data.finalRating) }

       useAddComment(handlesucces)

       const renderSummary = (
              <Stack spacing={1} alignItems="center" justifyContent="center">
                     <Typography variant="subtitle2">Note</Typography>

                     <Typography variant="h2">{ratingGet || 0}/5</Typography>

                     <Rating readOnly value={ratingGet} precision={0.1} />

                     {/* <Typography variant="caption" sx={ { color: 'text.secondary' } }>
                            ({ fShortenNumber( totalReviews ) } reviews)
                     </Typography> */}
              </Stack>
       );

       const renderProgress = (
              <Stack
                     spacing={1.5}
                     sx={{
                            py: 5,
                            px: { xs: 3, md: 5 },
                            borderLeft: (theme) => ({
                                   md: `dashed 1px ${theme.palette.divider}`,
                            }),
                            borderRight: (theme) => ({
                                   md: `dashed 1px ${theme.palette.divider}`,
                            }),
                     }}
              >

                     {ratings
                            .slice(0)
                            .reverse()
                            .map((rating) => {

                                   let totalToUse = rating.starCount
                                   if (rating.starCount < 90) {
                                          // Calculer la valeur à ajouter en fonction de rating.starCount
                                          const valueToAdd = 90 - rating.starCount;
                                          totalToUse = rating.starCount + valueToAdd;
                                          // console.log( totalToUse );

                                   }
                                   return (
                                          <Stack key={rating.name} direction="row" alignItems="center">
                                                 <Typography variant="subtitle2" component="span" sx={{ width: 50 }}>
                                                        {rating.name}
                                                 </Typography>

                                                 <LinearProgress
                                                        color="inherit"
                                                        variant="determinate"
                                                        value={(totalToUse / 500) * 10}
                                                        // value={ 12 }
                                                        sx={{
                                                               mx: 2,
                                                               flexGrow: 1,
                                                        }}
                                                 />

                                                 <Typography
                                                        variant="body2"
                                                        component="span"
                                                        sx={{
                                                               minWidth: 48,
                                                               color: 'text.secondary',
                                                        }}
                                                 >
                                                        {fShortenNumber(rating.starCount) || 0}
                                                 </Typography>
                                          </Stack>
                                   )
                            })}
              </Stack>
       );

       const renderReviewButton = (
              <Stack alignItems="center" justifyContent="center">
                     <Button
                            size="large"
                            variant="soft"
                            color="inherit"
                            onClick={review.onTrue}
                            startIcon={<Iconify icon="solar:pen-bold" />}
                     >
                            Ecrire un avis
                     </Button>
              </Stack>
       );
       // console.log( reviews );

       return (
              <>
                     <Box ref={reviewRef}
                            display="grid"
                            gridTemplateColumns={{
                                   xs: 'repeat(1, 1fr)',
                                   md: 'repeat(3, 1fr)',
                            }}
                            sx={{
                                   py: { xs: 5, md: 0 },
                            }}
                     >
                            {renderSummary}

                            {renderProgress}

                            {renderReviewButton}
                     </Box>

                     <Divider sx={{ borderStyle: 'dashed' }} />

                     <ProductReviewList reviews={reviews} />

                     <ProductReviewNewForm rating={ratings} annonce={annonce} addData={addNewReviewToLocalReview} open={review.value} onClose={review.onFalse} />
              </>
       );
}

ProductDetailsReview.propTypes = {
       getChildValue: PropTypes.func,
       totalRatings: PropTypes.number,
       totalReviews: PropTypes.number,
       annonce: PropTypes.object
};
