import orderBy from 'lodash/orderBy';
import PropTypes from 'prop-types';
import { useState, useCallback, useEffect, useMemo } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { request, resetAfterRequest } from 'src/store/annonces/getUsersAnnonces/reducer';
import { resetData, setData, addData } from 'src/store/annonces/data/users';
import { useGet } from 'src/1VALDO/hook/annonce/useGetNbrNew';
import { annonceFromStoreRef, filterByArgumentStingRef, globalFilterRef, handleFilterByTownSelectedRef, selectedTownTabRef, setSelectedTownTabRef, setSelectedUpdateData } from 'src/1data/annonces/ref';


import { CardHeader } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { deleteAnnonceInArray, deleteObjectFromTabObjetc, normalizeString, updateObjectFromTabObjetc } from 'src/1functions/annonces';

import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';

import { useDebounce } from 'src/hooks/use-debounce';

import { POST_SORT_OPTIONS } from 'src/_mock';
import { useGetPosts, useSearchPosts } from 'src/api/blog';

import Label from 'src/components/label';
import { Box } from '@mui/system';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PostSort from '../post-sort';
import PostSearch from '../post-search';
import PostListHorizontal from '../post-list-horizontal';
import PostList from '../post-list';
import TourFilters from '../tour-filters';
import TownTabs from './TownTabs';
// ----------------------------------------------------------------------



const defaultFilters = {
       publish: 'all',
};

// ----------------------------------------------------------------------

export default function PostListView( { setAfterFilter } )
{



       const SOCKET_SERVER_URL = "http://localhost:5000"; // L'URL de ton serveur backend

       const openFilters = useBoolean();
       const dispatch = useDispatch()
       const [ nbrNewAnnonces, setNbrNewAnnonce ] = useState( 0 )

       const settings = useSettingsContext();

       const [ sortBy, setSortBy ] = useState( 'latest' );

       const [ filters, setFilters ] = useState( defaultFilters );
       const [ selectedTab, setSelectedTab ] = useState( 'VIP' );
       const [ selectedTownTab, setSelectedTownTab ] = useState( 'Yaounde' );

       const [ searchQuery, setSearchQuery ] = useState( '' );

       const debouncedQuery = useDebounce( searchQuery );

       const { postsLoading } = useGetPosts();


       const annonceFromStore = useSelector( ( state ) => state.usersAnnonces.data )
       const usersAnnonces = useSelector( state => state.getUsersAnnonces.data )
       const { isPending, isFulled } = useSelector( state => state.getUsersAnnonces )




       const [ filteredPosts, setFilteredPosts ] = useState( [] );




       const addPost = ( newPost ) =>
       {
              const newPostWithId = { ...newPost, id: Date.now() }; // Génère un id basé sur le timestamp actuel
              const updatedPosts = [ ...filteredPosts, newPostWithId ];

              console.log( 'fonctio appeler', updatedPosts );

              setFilteredPosts( updatedPosts );

       };






       const afterReqNbrNewAnnonceSuccess = ( data ) => { setNbrNewAnnonce( data.count ); }
       useGet( afterReqNbrNewAnnonceSuccess )














       useEffect( () =>
       {

              annonceFromStoreRef.current = annonceFromStore;

       }, [ annonceFromStore ] );







       const { searchResults, searchLoading } = useSearchPosts( debouncedQuery );

       const dataFiltered = applyFilter( {
              inputData: filteredPosts,
              filters,
              sortBy,
       } );

       const handleSortBy = useCallback( ( newValue ) =>
       {
              setSortBy( newValue );
       }, [] );



       const handleSearch = useCallback( ( inputValue ) =>
       {
              setSearchQuery( inputValue );
       }, [] );



       const filterByArguments = useCallback(
              ( dataToFilter, type, value ) =>
              {

                     // console.log( dataToFilter[ 0 ].city, type, value );
                     // console.log( type, 'value', value );

                     if ( value[ 0 ] === normalizeString( 'all' ) || value[ 0 ] === normalizeString( 'Tout' ) )
                     {
                            // Si "all" est spécifié ou si le tableau est vide, afficher tous les posts

                            setFilteredPosts( annonceFromStore );
                            return annonceFromStore

                     }
                     const dataFilter = []
                     if ( value[ 0 ] !== normalizeString( 'all' ) && value[ 0 ] !== normalizeString( 'Tout' ) )
                     {
                            // Filtrer les posts si la propriété correspond à l'une des valeurs du tableau
                            // const result = filteredPosts.filter( ( item ) => Array.isArray( value ) && value.includes( item[ type ] ) );

                            dataToFilter.forEach( element =>
                            {

                                   value.forEach(
                                          ( optionValue ) =>
                                          {

                                                 const normalizeOption = normalizeString( optionValue );
                                                 // console.log( 'dans le tbaleau:', element.city, 'recu:', normalizeOption );
                                                 // console.log( element[ type ].includes( normalizeOption ) );

                                                 if ( element[ type ] !== undefined && element[ type ].map( item => normalizeString( item ) ).includes( normalizeOption ) )
                                                 {
                                                        // console.log( 'touver', element );


                                                        dataFilter.push( element )
                                                 }
                                          }
                                   )
                            } );
                            // setFilteredPosts( result );
                            // console.log( 'Valeur filtrée', dataFilter );
                            return dataFilter;

                     }

                     // console.log( 'Valeur des posts', type, value );
                     return dataFilter;
              },
              [ annonceFromStore ] // Dépend uniquement de `posts`
       );








       useEffect( () =>
       {

              filterByArgumentStingRef.current = filterByArguments;

       }, [ annonceFromStore, filterByArguments ] );









       const handleFilters = useCallback( ( name, value ) =>
       {
              // setFilters( ( prevState ) => ( {
              //        ...prevState,
              //        [ name ]: value,
              // } ) );

              filterByArguments( value );

       }, [ filterByArguments ] );

       const handleFilterProfil = useCallback(
              ( event, newValue ) =>
              {

                     // console.log( newValue );
                     // console.log( selectedTownTab );
                     const dataFilteredByTown = filterByArguments( annonceFromStore, 'city', [ selectedTownTab ] )
                     setFilteredPosts( filterByArguments( dataFilteredByTown, 'profile', [ newValue ] ) )
                     setSelectedTab( newValue )

                     // handleFilters( 'categorie', newValue );
              },

              [ filterByArguments, selectedTownTab, annonceFromStore ]
       );


       const handleFilterByTownSelected = useCallback(
              ( event, newValue ) =>
              {
                     console.log( 'fonction appelée', newValue );

                     const dataFilteredByProfil = filterByArguments( annonceFromStore, 'profile', [ selectedTownTab ] );
                     console.log( 'fonction appelée', annonceFromStore );
                     setFilteredPosts( filterByArguments( annonceFromStore, 'city', [ newValue ] ) );

                     return newValue; // ✅ retour de la valeur sélectionnée
              },
              [ filterByArguments, annonceFromStore, selectedTownTab ]
       );
       // console.log( annonceFromStore.city );

       useEffect( () =>
       {
              handleFilterByTownSelectedRef.current = handleFilterByTownSelected;
       }, [ handleFilterByTownSelected ] );


       useEffect( () =>
       {
              selectedTownTabRef.current = selectedTownTab;
              setSelectedTownTabRef.current = setSelectedTownTab; // Stocke le setter

       }, [ selectedTownTab, setSelectedTownTab ] );







       const setfilt = useCallback(
              ( newValue ) =>
              {

                     console.log( newValue );
                     setFilters( {
                            publish: newValue,
                     } )
              },

              []
       );













       const filterByPriceRange = useCallback(

              ( minPrice, maxPrice ) =>
              {
                     setFilteredPosts( () =>
                            filteredPosts.filter( ( post ) =>
                            {
                                   const { price } = post;

                                   // Filtrer par prix minimum ou maximum
                                   if ( minPrice && !maxPrice ) return price >= minPrice;
                                   if ( maxPrice && !minPrice ) return price <= maxPrice;

                                   // Filtrer par plage de prix si les deux sont spécifiés
                                   if ( minPrice && maxPrice ) return price >= minPrice && price <= maxPrice;

                                   // Aucun filtre
                                   return true;
                            } )
                     );
              }, [ filteredPosts ]
       );













       const filterByPriceRange2 = useCallback( ( dataToFilter, minPrice, maxPrice ) => dataToFilter.filter( ( post ) =>
       {

              const { price } = post;
              if ( minPrice && !maxPrice ) return price >= minPrice;
              if ( maxPrice && !minPrice ) return price <= maxPrice;
              if ( minPrice && maxPrice ) return price >= minPrice && price <= maxPrice;
              return true;

       } ), []

       );














       const sortPostsByOrder = useCallback(
              ( order ) =>
              {
                     setFilteredPosts( ( prevPosts ) =>
                     {
                            const validOrders = [ "croissant", "decroissant" ];

                            // Si l'ordre est null ou non valide, retourne les posts non triés
                            if ( !order || !validOrders.includes( order ) )
                            {
                                   console.error( "Ordre non valide. Utiliser 'croissant' ou 'decroissant'" );
                                   return [ ...prevPosts ]; // Retourne une copie non triée
                            }

                            // Trie les posts selon l'ordre spécifié
                            return [ ...prevPosts ].sort( ( a, b ) =>
                                   order === "croissant" ? a.price - b.price : b.price - a.price
                            );
                     } );
              }, []
       );














       const sortPostsByOrder2 = useCallback( ( tabToOrder, order ) =>
       {

              console.log( 'ordre recu', tabToOrder );

              if ( !order || ![ "croissant", "decroissant" ].includes( order ) )
              { console.error( "Ordre non valide.utiliser croissant, decroissant" ); return tabToOrder; }
              return [ ...tabToOrder ].sort( ( a, b ) => order === "croissant" ? a.price - b.price : b.price - a.price );


       }, [] );









       const globalFilter = useCallback( ( data ) =>
       {

              const { categoriesTab, citiesTab, minPrice, maxPrice, order } = data;





              let filteredCatg = [];
              let filteredCity = [];
              let mergedFilters = []
              let finallyFilteredPrice = [];





              if ( categoriesTab?.length > 0 && citiesTab?.length < 1 ) { mergedFilters = filterByArguments( annonceFromStore, 'categorie', categoriesTab ); }
              if ( categoriesTab?.length < 1 && citiesTab?.length > 0 ) { mergedFilters = filterByArguments( annonceFromStore, 'city', citiesTab ); }
              if ( !categoriesTab?.length && !citiesTab?.length ) { mergedFilters = annonceFromStore; }






              if ( categoriesTab?.length > 0 && citiesTab?.length > 0 )
              {
                     filteredCatg = filterByArguments( annonceFromStore, 'categorie', categoriesTab );
                     filteredCity = filterByArguments( filteredCatg, 'city', citiesTab );
                     mergedFilters = filteredCity
              }





              finallyFilteredPrice = filterByPriceRange2( mergedFilters, minPrice, maxPrice )
              const sortedPosts = sortPostsByOrder2( finallyFilteredPrice, order )
              setAfterFilter( sortedPosts )
              setFilteredPosts( sortedPosts )






       }, [ sortPostsByOrder2, filterByArguments, filterByPriceRange2, annonceFromStore, setAfterFilter ] );


       useEffect( () => { globalFilterRef.current = globalFilter }, [ filteredPosts, globalFilter ] )






       useEffect( () => () =>
       {

              dispatch( resetData() )
              dispatch( resetAfterRequest() )

       }, [ dispatch ] );










       useEffect( () =>
       {

              if ( !isPending && !isFulled )
              {

                     dispatch( request( { type: 'user' } ) )

                     dispatch( setData( usersAnnonces ) )
                     // console.log( 'fonction ccccccccccccccccccccccccccccccccccccccc ' );



              }

       }, [ dispatch, isFulled, isPending, usersAnnonces ] );









       useEffect( () =>
       {



              dispatch( setData( usersAnnonces ) )
              // console.log( usersAnnonces );




       }, [ dispatch, usersAnnonces ] );









       useEffect( () =>
       {
              setFilteredPosts( annonceFromStore );

       }, [ annonceFromStore ] );
















       // Établir la connexion WebSocket
       useEffect( () =>
       {
              const socket = io( SOCKET_SERVER_URL );

              // Écouter l'événement 'new-annonce' pour mettre à jour les annonces en temps réel
              socket.on( 'new-annonce', ( newAnnonce ) =>
              {
                     dispatch( addData( newAnnonce ) )
                     console.log( 'nouvelle annonce detecter', newAnnonce );

              } );

              // Nettoyer la connexion au déchargement du composant
              return () =>
              {
                     socket.disconnect();
              };
       }, [ dispatch ] );










       useEffect( () =>
       {
              const socket = io( "http://localhost:5000" );
              socket.on( 'banned-annonce', ( bannedAnnonce ) =>
              {

                     dispatch( setData( deleteObjectFromTabObjetc( annonceFromStore, bannedAnnonce ) ) )
                     console.log( 'nouvelle annonce bannie detecter', bannedAnnonce );

              } );


              socket.on( 'update-annonce', ( updateAnnonce ) =>
              {

                     dispatch( setData( updateObjectFromTabObjetc( annonceFromStore, updateAnnonce ) ) )
                     console.log( 'nouvelle annonce bannie detecter', updateAnnonce );

              } );






              socket.on( 'delete-annonce', ( del ) =>
              {

                     console.log( 'nouvelle annonce supprimer detecter', del );

                     dispatch( setData( deleteAnnonceInArray( annonceFromStore, del ) ) )
              } );

              return () => { socket.disconnect(); };

       }, [ dispatch, annonceFromStore ] );










       //  const renderFilters = (
       //        <TourFilters
       //               open={ openFilters.value }
       //               onOpen={ openFilters.onTrue }
       //               onClose={ openFilters.onFalse }
       //               onPriceFilters={ filterByPriceRange }
       //               onArgumentFilters={ filterByArguments }
       //               onOrderPriceFilters={ sortPostsByOrder }

       //        />

       // );





       return (
              <Container sx={ { pl: { sm: "0", xs: "0", md: "0" }, pr: { sm: "0", xs: "0", md: "0" } } } maxWidth={ settings.themeStretch ? false : 'xl' }>
                     {/* <CustomBreadcrumbs
                            heading="List"
                            links={ [
                                   {
                                          name: 'Dashboard',
                                          href: paths.dashboard.root,
                                   },
                                   {
                                          name: 'Blog',
                                          href: paths.dashboard.post.root,
                                   },
                                   {
                                          name: 'List',
                                   },
                            ] }
                            action={
                                   <Button
                                          component={ RouterLink }
                                          href={ paths.dashboard.post.new }
                                          variant="contained"
                                          startIcon={ <Iconify icon="mingcute:add-line" /> }
                                   >
                                          New Post
                                   </Button>
                            }
                            sx={ {
                                   mb: { xs: 3, md: 5 },
                            } }
                     /> */}

                     {/* <Stack
                            spacing={ 3 }
                            justifyContent="space-between"
                            alignItems={ { xs: 'flex-end', sm: 'center' } }
                            direction={ { xs: 'column', sm: 'row' } }
                            sx={ {
                                   mb: { xs: 3, md: 5 },
                            } }
                     >
                            <PostSearch
                                   query={ debouncedQuery }
                                   results={ searchResults }
                                   onSearch={ handleSearch }
                                   loading={ searchLoading }
                                   hrefItem={ ( title ) => paths.dashboard.post.details( title ) }
                            />

                            <PostSort sort={ sortBy } onSort={ handleSortBy } sortOptions={ POST_SORT_OPTIONS } />
                     </Stack> */}



                     <Stack

                            spacing={ 1 }
                            justifyContent="space-between"
                            alignItems={ { xs: 'flex-start', sm: 'flex-start' } }
                            direction="row"
                            sx={ {
                                   mb: { xs: 3, md: 5 },
                            } }
                     >
                            <CardHeader
                                   title='Dernière annonces'
                                   subheader={ `${ nbrNewAnnonces } nouvelle annonces` }
                                   // action={ <CarouselArrows onNext={ carousel.onNext  onPrev={ carousel.onPrev } /> }
                                   sx={ {
                                          p: 0,
                                          mb: 3,
                                          width: "max-content",
                                          whiteSpace: "nowrap"
                                   } }
                            />
                            <Box flexDirection="column" alignItems="center" display="flex"
                                   sx={ { width: { xs: 1, md: "max-content" } } }>

                                   {/* <Tabs

                                          value={ selectedTab }
                                          onChange={ handleFilterProfil }
                                          sx={ {
                                                 mb: { xs: 3, md: 5 },
                                          } }
                                   >
                                          { [ 'VIP', 'Tout', 'Mieux noté', 'Standard' ].map( ( tab ) => (
                                                 <Tab
                                                        key={ tab }
                                                        iconPosition="end"
                                                        value={ tab }
                                                        label={ tab }
                                                        icon={
                                                               <Label
                                                                      variant={ ( ( tab === 'Tout' || tab === filters.publish ) && 'filled' ) || 'soft' }
                                                                      color={ ( tab === 'VIP' && 'info' ) || 'default' }
                                                               >
                                                                      { tab === 'Tout' && annonceFromStore.length }

                                                                      { tab === 'Mieux noté' && annonceFromStore.filter( ( post ) => post.categorie === 'VIP' ).length }
                                                                      { tab === 'VIP' && annonceFromStore.filter( ( post ) => post.categorie === 'VIP' ).length }

                                                                      { tab === 'Standard' && annonceFromStore.filter( ( post ) => post.categorie === 'Standard' ).length }
                                                               </Label>
                                                        }
                                                        sx={ { textTransform: 'capitalize' } }
                                                 />
                                          ) ) }
                                   </Tabs> */}



                                   {/* <Tabs

                                          value={ selectedTownTab }
                                          onChange={ handleFilterByTownSelected }
                                          sx={ {
                                                 mb: { xs: 3, md: 5 },
                                                 width: { xs: 1, md: "max-content" },
                                                 justifyContent: "center"
                                          } }
                                   >
                                          { [ 'Yaounde', 'Bafoussam', 'Douala', 'Bertoua' ].map( ( tab ) => (
                                                 <Tab
                                                        key={ tab }
                                                        iconPosition="end"
                                                        value={ tab }
                                                        label={ tab }
                                                        icon={
                                                               <Label
                                                                      variant={ ( ( tab === 'Yaounde' || tab === filters.publish ) && 'filled' ) || 'soft' }
                                                                      color={ ( tab === 'Yaounde' && 'info' ) || 'default' }
                                                               >
                                                                      
                                                                      { tab === 'Yaounde' && 100 }

                                                                      { tab === 'Bafoussam' && 55 }

                                                                      
                                                                      { tab === 'Douala' && 37 }
                                                                      { tab === 'Bertoua' && 20 }
                                                               </Label>
                                                        }
                                                        sx={ { textTransform: 'capitalize' } }
                                                 />
                                          ) ) }
                                   </Tabs> */}
                                   {/* <TownTabs
                                          selectedTownTab={ selectedTownTab }
                                          handleFilterByTownSelected={ handleFilterByTownSelected }
                                   /> */}
                            </Box>


                     </Stack>


                     {/* <Button variant='soft' onClick={ () => filterByPriceRange( Number( '2000' ), Number( '3000' ) ) }>
                            prix entre 2000 et 3000
                     </Button>
                     <Button sx={ { ml: 1 } } variant='soft' onClick={ () => filterByArguments( 'categorie', [ 'categorie1' ] ) }>
                            categorie1
                     </Button>

                     <Button sx={ { ml: 1 } } variant='soft' onClick={ () => filterByArguments( 'categorie', [ 'categorie2' ] ) }>
                            categorie2
                     </Button>

                     <Button sx={ { ml: 1 } } variant='soft' onClick={ () => filterByArguments( 'categorie', [ 'categorie3', 'categorie1' ] ) }>
                            categorie1 et 3
                     </Button> */}
                     {/* <PostList posts={ dataFiltered } loading={ postsLoading } /> */ }
                     <PostListHorizontal posts={ filteredPosts } loading={ postsLoading } />
              </Container >
       );
}

// ----------------------------------------------------------------------

const applyFilter = ( { inputData, filters, sortBy } ) =>
{
       const { publish } = filters;

       if ( sortBy === 'latest' )
       {
              inputData = orderBy( inputData, [ 'createdAt' ], [ 'desc' ] );
       }

       if ( sortBy === 'oldest' )
       {
              inputData = orderBy( inputData, [ 'createdAt' ], [ 'asc' ] );
       }

       if ( sortBy === 'popular' )
       {
              inputData = orderBy( inputData, [ 'totalViews' ], [ 'desc' ] );
       }

       if ( publish !== 'all' )
       {
              inputData = inputData.filter( ( post ) => post.publish === publish );
       }

       return inputData;
};




PostListView.propTypes = {
       setAfterFilter: PropTypes.func,
};


