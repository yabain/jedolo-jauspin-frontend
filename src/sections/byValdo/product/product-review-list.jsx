
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { reviewRef } from 'src/1data/annonces/ref';
import { HEADER } from 'src/layouts/config-layout';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import ProductReviewItem from './product-review-item';

// ----------------------------------------------------------------------

export default function ProductReviewList({ reviews }) {
       const [page, setPage] = useState(1);
       const [hasPageChanged, setHasPageChanged] = useState(false);
       const reviewsPerPage = 3; // Vous pouvez ajuster ce nombre selon vos besoins

       // Calcul du nombre total de pages
       const totalPages = Math.ceil(reviews.length / reviewsPerPage);

       // Déterminer les avis à afficher pour la page actuelle
       const indexOfLastReview = page * reviewsPerPage;
       const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
       const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

       const handleChangePage = (event, value) => {
              setPage(value);
              setHasPageChanged(true); // Indique qu'une page a été changée
       };

       // Réinitialiser le défilement à chaque changement de page si l'utilisateur a cliqué
       useEffect(() => {
              if (hasPageChanged) {
                     reviewRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center', // Vous pouvez ajuster cela à 'center' ou 'end' selon vos besoins
                     });



                     setHasPageChanged(false); // Réinitialise l'état après avoir effectué le défilement
              }
       }, [page, hasPageChanged]);

       return (
              <>

                     {currentReviews.map((review) => (
                            <ProductReviewItem key={review._id} review={review} />
                     ))}

                     {totalPages > 1 && (
                            <Pagination
                                   count={totalPages}
                                   page={page}
                                   onChange={handleChangePage}
                                   sx={{
                                          mx: 'auto',
                                          [`& .${paginationClasses.ul}`]: {
                                                 my: 5,
                                                 mx: 'auto',
                                                 justifyContent: 'center',
                                          },
                                   }}
                            />
                     )}
              </>
       );
}

ProductReviewList.propTypes = {

       reviews: PropTypes.array,

};