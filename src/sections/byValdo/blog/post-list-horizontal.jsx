import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { tabsRef } from 'src/1data/annonces/ref';
import { HEADER } from 'src/layouts/config-layout';
import { PostItemSkeleton } from './post-skeleton';
import PostItemHorizontal from './post-item-horizontal';

export default function PostListHorizontal( { posts, loading } )
{
       const [ page, setPage ] = useState( 1 );
       const [ hasPageChanged, setHasPageChanged ] = useState( false ); // Ajouter un état pour suivre les changements de page
       const postsPerPage = 24;

       // Calcul du nombre total de pages
       const totalPages = Math.ceil( posts.length / postsPerPage );

       // Déterminer les posts à afficher pour la page actuelle
       const indexOfLastPost = page * postsPerPage;
       const indexOfFirstPost = indexOfLastPost - postsPerPage;
       const currentPosts = posts.slice( indexOfFirstPost, indexOfLastPost );

       const handleChangePage = ( event, value ) =>
       {
              setPage( value );
              setHasPageChanged( true ); // Indique qu'une page a été changée
       };

       // Réinitialiser le défilement à chaque changement de page si l'utilisateur a cliqué
       useEffect( () =>
       {
              if ( hasPageChanged )
              {
                     // tabsRef.current.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                     window.scrollTo( {
                            top: tabsRef.current.offsetTop - HEADER.H_DESKTOP,
                            behavior: "smooth"
                     } );
                     setHasPageChanged( false ); // Réinitialise l'état après avoir effectué le défilement
              }
       }, [ page, hasPageChanged ] ); // Déclenchement uniquement après un changement de page par l'utilisateur

       return (
              <>
                     <Box
                            gap={ 4 }
                            display="grid"
                            gridTemplateColumns={ {
                                   xs: 'repeat(1, 1fr)',
                                   sm: 'repeat(2, 1fr)',
                                   md: 'repeat(2, 1fr)',
                                   lg: 'repeat(3, 1fr)',
                                   xl: 'repeat(4, 1fr)',
                            } }
                     >
                            { loading
                                   ? [ ...Array( postsPerPage ) ].map( ( _, index ) => (
                                          <PostItemSkeleton key={ index } variant="horizontal" />
                                   ) )
                                   : currentPosts.map( ( post ) => (
                                          <PostItemHorizontal key={ post.id } post={ post } />
                                   ) ) }
                     </Box>

                     { totalPages > 1 && (
                            <Pagination
                                   count={ totalPages }
                                   page={ page }
                                   onChange={ handleChangePage }
                                   sx={ {
                                          mt: 8,
                                          [ `& .${ paginationClasses.ul }` ]: {
                                                 justifyContent: 'center',
                                          },
                                   } }
                            />
                     ) }
              </>
       );
}

PostListHorizontal.propTypes = {
       loading: PropTypes.bool,
       posts: PropTypes.array.isRequired,
};
