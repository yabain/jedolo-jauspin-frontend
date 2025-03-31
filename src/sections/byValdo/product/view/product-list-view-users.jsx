
import * as annoncesFunction from 'src/1functions/annonces'
import { setValeurRef } from 'src/1data/annonces/ref';


import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from 'src/auth/hooks';
import { useNavigate } from 'react-router';


import PropTypes from 'prop-types';
import { io } from 'socket.io-client';

import { resetData, setAdminData, setData } from 'src/store/annonces/data/dataReducer';
import { getList, resetAfterGetListRequete } from 'src/store/annonces/getUserAnnonces/getReducer';
import { request, resetAfterRequest } from 'src/store/annonces/getUsersAnnonces/reducer';
import { resetAfterRequest as resetAfterDelete, request as deleteAnnonces } from 'src/store/annonces/deleteAnnonce/reducer';
import { request as updateAnnonce } from 'src/store/annonces/updateAnnonce/reducer';
import { resetAfterRequest as resetAfterBan, request as banAnnonce } from 'src/store/annonces/banAnnonce/reducer';
import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';


import DialogSponsorBuy from 'src/1VALDO/components/sponsor/dialog-sponsor-buy';
import DialogPaimentInProcess from 'src/1VALDO/components/sponsor/dialog-paiment-inProcess';
import DialogALaUneBuy from 'src/1VALDO/components/annonces/dialog-aLaUne-buy';
import DialogPaimentInProcessALaUne from 'src/1VALDO/components/sponsor/dialog-paiment-inProcess-aLaUne';
import DialogPaimentInProcessSponsorBuy from 'src/1VALDO/components/sponsor/dialog-paiment-inProcess-sponsorBuy';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import
{
       DataGrid,
       GridToolbarExport,
       GridActionsCellItem,
       GridToolbarContainer,
       GridToolbarQuickFilter,
       GridToolbarFilterButton,
       GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useGetProducts } from 'src/api/product';
import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useMediaQuery, useTheme } from '@mui/material';



import { LoadingButton } from '@mui/lab';
import { dataObject } from 'src/1data/annonces/defaut';
import { HOST_BACKEND_URL } from 'src/config-global';
import ProductTableToolbar from '../product-table-toolbar';
import ProductTableFiltersResult from '../product-table-filters-result';
import
{
       RenderCellStock,
       RenderCellPrice,
       RenderCellPublish,
       RenderCellProduct,
       RenderCellCreatedAt,
       RenderCellNbrComment,
       RenderCellProductXs,
       RenderCellALaUne,
       RenderCellSponsored,
} from '../product-table-row';
import DialogDeleteAnnonces from './modal-delete-Annonces';
import DialogDeleteAnnonce from './modal-delete-Annonce';
// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
       { value: 'published', label: 'Published' },
       { value: 'draft', label: 'Draft' },
];

const defaultFilters = {
       publish: [],
       stock: [],
};

const HIDE_COLUMNS = {
       name0: false,
       category: false,
       nbrView: true,
       nbrComment: true,
       rating: true,
       publish: true,
       sponsored: true,
       aLaUne: true,
};

const HIDE_COLUMNS_TOGGLABLE = [ 'category', 'actions' ];

// ----------------------------------------------------------------------

export default function ProductListViewUsers( { toShow } )
{


       const router = useRouter();
       const dispatch = useDispatch()
       const navigate = useNavigate()
       const settings = useSettingsContext();
       const { enqueueSnackbar } = useSnackbar();
       const { products, productsLoading } = useGetProducts();






       const buySponsor = useBoolean();
       const startPaimentSponsor = useBoolean();
       const startPaimentALaUne = useBoolean();
       const aLaUneBuy = useBoolean();
       const [ annonceClick, setAnnonceClick ] = useState( {} );
       const [ annonceToSponsor, setAnnonceToSponsor ] = useState( {} );





       const confirmRows = useBoolean();
       const confirmOfBan = useBoolean();
       const confirmOfDel = useBoolean();





       const [ tableData, setTableData ] = useState( [] );
       const [ dataIsSet, setDataIsSet ] = useState( false );
       const [ annonceToBan, setAnnonceToBan ] = useState( {} );
       const [ annonceToDel, setAnnonceToDel ] = useState( {} );
       const [ filters, setFilters ] = useState( defaultFilters );
       const [ selectedRowIds, setSelectedRowIds ] = useState( [] );
       const [ columnVisibilityModel, setColumnVisibilityModel ] = useState( HIDE_COLUMNS );





       const theme = useTheme();
       const isSmallScreen = useMediaQuery( theme.breakpoints.down( 'sm' ) ); // ✅ Détecte `xs` et `sm`






       const { user } = useAuthContext();

       const { isFulled, isPending } = useSelector( ( state ) => state.getUsersAnnonces );

       const annonceList = useSelector( ( state ) => state.getAnnonces.data );
       const annonceFromStore = useSelector( ( state ) => state.annonces.adminData );
       const usersAnnonceList = useSelector( ( state ) => state.getUsersAnnonces.data );

       const isFulledDelete = useSelector( ( state ) => state.deleteUserAnnonce.isFulled );
       const isPendingDelete = useSelector( ( state ) => state.deleteUserAnnonce.isPending );

       const isFulledBan = useSelector( ( state ) => state.bannedUserAnnonce.isFulled );
       const isPendingBan = useSelector( ( state ) => state.bannedUserAnnonce.isPending );









       function updateAnnonceInArray( annonces, updatedAnnonce )
       {

              console.log( 'updateAnnonceInArray', updatedAnnonce.id );
              const index = annonces.findIndex( annonce => String( annonce.id ) === String( updatedAnnonce.id ) );

              console.log( `Index trouvé : ${ index }` );

              if ( index === -1 ) { console.error( 'Annonce non trouvée dans le tableau' ); return annonces; }
              const newAnnonces = [ ...annonces.slice( 0, index ), updatedAnnonce, ...annonces.slice( index + 1 ), ];

              console.log( 'nouvelle Annonces dans le store', newAnnonces );
              return newAnnonces;
       }









       function deleteAnnonceInArray( annonces, updatedAnnonce )
       {

              console.log( 'updateAnnonceInArray', updatedAnnonce.id );
              const index = annonces.findIndex( annonce => String( annonce.id ) === String( updatedAnnonce.id ) );

              console.log( `Index trouvé : ${ index }` );

              if ( index === -1 ) { console.error( 'Annonce non trouvée dans le tableau' ); return annonces; }
              const newAnnonces = [ ...annonces.slice( 0, index ), ...annonces.slice( index + 1 ), ];

              console.log( 'nouvelle Annonces dans le store', newAnnonces );
              return newAnnonces;
       }










       useEffect( () => () =>
       {

              dispatch( resetData() )
              dispatch( resetAfterRequest() )
              dispatch( resetAfterGetListRequete() );

       }, [ dispatch ] );










       useEffect( () =>
       {

              if ( !isPending && !isFulled )
              {



                     dispatch( request( { type: 'admin' } ) )

                     console.log( 'init des useeerlist set ', usersAnnonceList );


                     dispatch( setAdminData( usersAnnonceList ) )


                     dispatch( getList( user.email ) )


              }

       }, [ dispatch, annonceList, user, isFulled, isPending, toShow, usersAnnonceList ] );









       useEffect( () =>
       {


              console.log( 'update au changement de valeur' );

              dispatch( setAdminData( usersAnnonceList ) )




       }, [ usersAnnonceList, dispatch ] );









       useEffect( () =>
       {
              setTableData( annonceFromStore );

       }, [ annonceFromStore ] );
















       useEffect( () =>
       {
              setColumnVisibilityModel( {
                     name: !isSmallScreen,
                     name0: isSmallScreen,
                     nbrView: !isSmallScreen,
                     nbrComment: !isSmallScreen,
                     rating: !isSmallScreen,
                     publish: !isSmallScreen,
                     sponsored: !isSmallScreen,
                     aLaUne: !isSmallScreen,
                     actions: !isSmallScreen,
              } );
       }, [ isSmallScreen ] );





       useEffect( () =>
       {

              if ( !dataIsSet )
              {

                     // console.log( products );
                     setDataIsSet( true );

              }

       }, [ dataIsSet, dispatch, annonceFromStore ] );










       useEffect( () =>
       {
              const socket = io( HOST_BACKEND_URL );
              socket.on( 'update-annonce', ( update ) =>
              {

                     dispatch( setAdminData( updateAnnonceInArray( annonceFromStore, update ) ) )
                     console.log( 'nouvelle annonce detecter', update );

              } );


              socket.on( 'banned-annonce', ( update ) =>
              {

                     dispatch( setAdminData( updateAnnonceInArray( annonceFromStore, update ) ) )

                     console.log( 'nouvelle annonce detecter', update );


              } );

              return () => { socket.disconnect(); };

       }, [ dispatch, annonceFromStore ] );











       useEffect( () =>
       {
              const socket = io( HOST_BACKEND_URL );



              socket.on( 'delete-annonce', ( del ) =>
              {

                     console.log( 'annonce a supprimer', del );


                     dispatch( setAdminData( deleteAnnonceInArray( annonceFromStore, del ) ) )
              } );

              return () => { socket.disconnect(); };

       }, [ dispatch, annonceFromStore, ] );











       useEffect( () =>
       {



              if ( !isPendingBan && isFulledBan )
              {


                     dispatch( resetAfterBan() )


                     enqueueSnackbar( 'Annonce Banni avec succes!' );
                     confirmOfBan.onFalse();

              }

       }, [ confirmOfBan, enqueueSnackbar, dispatch, isFulledBan, isPendingBan ] );










       const banAnnouncement = useCallback(
              () =>
              {

                     const banAnnonceObject = { ...annonceToBan, publish: 'banned' }
                     dispatch( banAnnonce( banAnnonceObject ) )

              },
              [ dispatch, annonceToBan ]
       );









       const banAnnouncements = useCallback(
              () =>
              {



                     annonceToBan.publish = 'banned'
                     console.log( annonceToBan );

                     enqueueSnackbar( 'Annonce banni avec succes!' );

                     // setTableData( deleteRow );
              },
              [ enqueueSnackbar, annonceToBan ]
       );







       const dataFiltered = applyFilter( {
              inputData: tableData,
              filters,
       } );

       const canReset = !isEqual( defaultFilters, filters );

       const handleFilters = useCallback( ( name, value ) =>
       {
              setFilters( ( prevState ) => ( {
                     ...prevState,
                     [ name ]: value,
              } ) );
       }, [] );

       const handleResetFilters = useCallback( () =>
       {
              setFilters( defaultFilters );
       }, [] );










       const handleDeleteRow = useCallback(
              ( id, annonceToDelete ) =>
              {


                     // const deleteRow = tableData.filter( ( row ) => row.id !== id );

                     console.log( 'annonce a suppppppppppp', annonceToDelete );

                     // enqueueSnackbar( 'fonction appeler!' );


                     dispatch( deleteAnnonces( { id: annonceToDelete.id } ) )

                     // setTableData( deleteRow );
              },
              [ dispatch ]
       );











       const handleDeleteRows = useCallback( () =>
       {
              const deleteRows = tableData.filter( ( row ) => !selectedRowIds.includes( row.id ) );

              enqueueSnackbar( 'Delete success!' );

              setTableData( deleteRows );
       }, [ enqueueSnackbar, selectedRowIds, tableData ] );

       const handleEditRow = useCallback(
              ( data ) =>
              {
                     navigate( paths.annonces.edit, { state: { data } } );

              },
              [ navigate ]
       );

       const handleViewRow = useCallback(
              ( id ) =>
              {
                     router.push( paths.dashboard.product.details( id ) );
              },
              [ router ]
       );

       const columns = [
              // {
              //        field: 'category',
              //        headerName: 'Category',
              //        filterable: false,
              // },
              {
                     field: 'name0',
                     headerName: 'Annonce',
                     flex: 1.5,
                     minWidth: 260,
                     width: 260,
                     hideable: true,
                     valueGetter: ( params ) => params.row.name, // 🔥 Utilise la même valeur que "name"
                     renderCell: ( params ) => <RenderCellProductXs params={ params }
                            Sponsoriser={ () => { buySponsor.onTrue(); setAnnonceToSponsor( params.row ) } } mettreALaUne={ () => { aLaUneBuy.onTrue(); setAnnonceClick( params.row ) } } onEdit={ () => { handleEditRow( params.row ) } } onDelete={ () => { confirmOfDel.onTrue(); setAnnonceToDel( params.row ) } } />,
              },
              {
                     field: 'name',
                     headerName: 'Annonce',
                     flex: 1.9,
                     minWidth: 280,
                     width: 260,
                     hideable: true,
                     renderCell: ( params ) => <RenderCellProduct params={ params } />,
              },
              {
                     field: 'nbrView',
                     headerName: 'Vues',
                     width: 160,

                     minWidth: 90,

                     flex: 1.1,
                     hide: true, // 🔥 Masque la colonne directement selon la taille

                     type: 'singleSelect',
                     valueOptions: PRODUCT_STOCK_OPTIONS,
                     renderCell: ( params ) => <RenderCellStock params={ params } />,
              },
              {
                     field: 'nbrComment',
                     headerName: 'Commentaire',
                     width: 160,
                     minWidth: 140,

                     flex: 1.1,
                     hide: true, // 🔥 Masque la colonne directement selon la taille

                     renderCell: ( params ) => <RenderCellNbrComment params={ params } />,
              },

              {
                     field: 'aLaUne',
                     headerName: 'A La Une',
                     width: 140,


                     minWidth: 90,

                     flex: 1.1,
                     hide: isSmallScreen, // 🔥 Masque la colonne directement selon la taille

                     editable: true,
                     renderCell: ( params ) => <RenderCellALaUne params={ params } />,
              },


              {
                     field: 'rating',
                     headerName: 'Note',
                     width: 140,


                     minWidth: 90,

                     flex: 1.1,
                     hide: isSmallScreen, // 🔥 Masque la colonne directement selon la taille

                     editable: true,
                     renderCell: ( params ) => <RenderCellPrice params={ params } />,
              },
              {
                     field: 'sponsored',
                     headerName: 'sponsorisé',
                     width: 140,


                     minWidth: 90,

                     flex: 1.1,
                     hide: isSmallScreen, // 🔥 Masque la colonne directement selon la taille

                     editable: true,
                     renderCell: ( params ) => <RenderCellSponsored params={ params } />,
              },
              {
                     field: 'publish',
                     headerName: 'status',
                     width: 110,


                     minWidth: 90,

                     flex: 1.1,
                     type: 'singleSelect',
                     editable: true,
                     valueOptions: PUBLISH_OPTIONS,
                     hide: true, // 🔥 Masque la colonne directement selon la taille

                     renderCell: ( params ) => <RenderCellPublish params={ params } />,
              },
              {
                     type: 'actions',
                     field: 'actions',
                     headerName: ' ',
                     align: 'right',
                     headerAlign: 'right',
                     width: 80,
                     sortable: false,
                     filterable: false,
                     disableColumnMenu: true,
                     getActions: ( params ) => [
                            // <GridActionsCellItem
                            //        showInMenu
                            //        icon={ <Iconify icon="solar:eye-bold" /> }
                            //        label="View"
                            //        onClick={ () => handleViewRow( params.row.id ) }
                            // />,
                            <GridActionsCellItem
                                   showInMenu
                                   icon={ <Iconify icon="solar:pen-bold" /> }
                                   label="Modifier"
                                   onClick={ () => handleEditRow( params.row ) }
                            />,
                            // <GridActionsCellItem
                            //        showInMenu
                            //        icon={ <Iconify icon="solar:pen-bold" /> }
                            //        label="Mettre à la une"
                            //        onClick={ () => { aLaUneBuy.onTrue(); setAnnonceClick( params.row ) } }
                            // />,
                            // <GridActionsCellItem
                            //        showInMenu
                            //        icon={ <Iconify icon="solar:pen-bold" /> }
                            //        label="Sponsoriser"
                            //        onClick={ () => { buySponsor.onTrue(); setAnnonceToSponsor( params.row ) } }
                            // />,
                            // <GridActionsCellItem
                            //        showInMenu
                            //        icon={ <Iconify icon="solar:pen-bold" /> }
                            //        label="Banir"
                            //        onClick={ () => { confirmOfBan.onTrue(); setAnnonceToBan( params.row ) } }
                            // />,
                            <GridActionsCellItem
                                   showInMenu
                                   icon={ <Iconify icon="solar:trash-bin-trash-bold" /> }
                                   label="Delete"
                                   onClick={ () =>
                                   {
                                          // dispatch( deleteAnnonces( params.row ) )
                                          confirmOfDel.onTrue(); setAnnonceToDel( params.row )

                                          // handleDeleteRow( params.row.id, params.row );
                                   } }
                                   sx={ { color: 'error.main' } }
                            />,
                     ],
              },
       ];

       const getTogglableColumns = () =>
              columns
                     .filter( ( column ) => !HIDE_COLUMNS_TOGGLABLE.includes( column.field ) )
                     .map( ( column ) => column.field );

       return (
              <>
                     <DialogSponsorBuy showDialog={ buySponsor } startPaiement={ startPaimentSponsor } />
                     <DialogPaimentInProcessSponsorBuy dataGet={ annonceToSponsor } showDialog={ startPaimentSponsor } />

                     <DialogALaUneBuy showDialog={ aLaUneBuy } startPaiement={ startPaimentALaUne } />
                     <DialogPaimentInProcessALaUne dataGet={ annonceClick } showDialog={ startPaimentALaUne } />


                     <Box
                            // maxWidth={ settings.themeStretch ? false : 'lg' }
                            // maxWidth='xl'
                            sx={ {
                                   flexGrow: 1,
                                   display: 'flex',
                                   flexDirection: 'column',
                            } }
                     >
                            { user?.role === "user" && ( <CustomBreadcrumbs
                                   heading="Liste Des Annonces"
                                   links={ [
                                          {
                                                 name: '',
                                                 href: paths.dashboard.product.root,
                                          }
                                   ] }
                                   action={
                                          <Button
                                                 // component={ RouterLink }
                                                 // href={ paths.dashboard.product.new }
                                                 onClick={ () => navigate( '/home/annonces/new' ) }

                                                 variant="contained"
                                                 startIcon={ <Iconify icon="mingcute:add-line" /> }
                                          >
                                                 Nouvel annonce
                                          </Button>
                                   }
                                   sx={ {
                                          mb: {
                                                 xs: 3,
                                                 md: 5,
                                          },
                                   } }
                            /> ) }

                            <Card
                                   sx={ {

                                          maxHeight: "max-content",
                                          minHeight: '600px',
                                          flexGrow: { md: 1 },
                                          display: 'flex',
                                          flexDirection: 'column',
                                   } }
                            >
                                   <DataGrid
                                          autoHeight={ false }

                                          sx={ {
                                                 '& .MuiDataGrid-virtualScroller': {
                                                        overflow: 'hidden', // Cache complètement le scroll
                                                 },
                                                 // OU pour garder la fonctionnalité de scroll mais cacher visuellement la barre :
                                                 '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                                                        display: 'none', // Cache seulement la barre de scroll
                                                 },

                                                 flexGrow: 1,
                                          } }
                                          // checkboxSelection
                                          disableRowSelectionOnClick
                                          rows={ dataFiltered }
                                          columns={ columns }
                                          loading={ productsLoading }

                                          disableColumnMenu
                                          getRowHeight={ () => 'auto' }
                                          pageSizeOptions={ [ 5, 10, 25 ] }
                                          initialState={ {
                                                 pagination: {
                                                        paginationModel: { pageSize: 10 },
                                                 },
                                          } }
                                          onRowSelectionModelChange={ ( newSelectionModel ) =>
                                          {
                                                 setSelectedRowIds( newSelectionModel );
                                          } }
                                          columnVisibilityModel={ columnVisibilityModel }
                                          onColumnVisibilityModelChange={ ( newModel ) => setColumnVisibilityModel( newModel ) }
                                          slots={ {
                                                 toolbar: () => (
                                                        <>
                                                               <GridToolbarContainer>
                                                                      {/* <ProductTableToolbar
                                                                             filters={ filters }
                                                                             onFilters={ handleFilters }
                                                                             stockOptions={ PRODUCT_STOCK_OPTIONS }
                                                                             publishOptions={ PUBLISH_OPTIONS }
                                                                      /> */}

                                                                      <GridToolbarQuickFilter />

                                                                      <Stack
                                                                             spacing={ 1 }
                                                                             flexGrow={ 1 }
                                                                             direction="row"
                                                                             alignItems="center"
                                                                             justifyContent="flex-end"
                                                                      >
                                                                             { !!selectedRowIds.length && (
                                                                                    <Button
                                                                                           size="small"
                                                                                           color="error"
                                                                                           startIcon={ <Iconify icon="solar:trash-bin-trash-bold" /> }
                                                                                           onClick={ confirmRows.onTrue }
                                                                                    >
                                                                                           Delete ({ selectedRowIds.length })
                                                                                    </Button>
                                                                             ) }

                                                                             {/* <GridToolbarColumnsButton />
                                                                             <GridToolbarFilterButton />
                                                                             <GridToolbarExport /> */}
                                                                      </Stack>
                                                               </GridToolbarContainer>

                                                               { canReset && (
                                                                      <ProductTableFiltersResult
                                                                             filters={ filters }
                                                                             onFilters={ handleFilters }
                                                                             onResetFilters={ handleResetFilters }
                                                                             results={ dataFiltered.length }
                                                                             sx={ { p: 2.5, pt: 0 } }
                                                                      />
                                                               ) }
                                                        </>
                                                 ),
                                                 noRowsOverlay: () => <EmptyContent title="No Data" />,
                                                 noResultsOverlay: () => <EmptyContent title="No results found" />,
                                          } }
                                          slotProps={ {
                                                 columnsPanel: {
                                                        getTogglableColumns,
                                                 },
                                          } }
                                   />
                            </Card>
                     </Box >




                     <ConfirmDialog
                            open={ confirmOfBan.value }
                            onClose={ confirmOfBan.onFalse }
                            title="Banissement de l'annonce"
                            content={
                                   <>
                                          voulez vous vraiment bannir cette annonce ?
                                   </>
                            }
                            action={
                                   <Button
                                          variant="contained"
                                          color="error"
                                          onClick={ () =>
                                          {
                                                 banAnnouncement();
                                          } }
                                   >
                                          Banir
                                   </Button>


                            }
                     />




                     <DialogDeleteAnnonces showDialog={ confirmRows } data={ selectedRowIds } />
                     <DialogDeleteAnnonce showDialog={ confirmOfDel } data={ annonceToDel } />

              </>
       );
}

// ----------------------------------------------------------------------

function applyFilter( { inputData, filters } )
{
       const { stock, publish } = filters;

       if ( stock.length )
       {
              inputData = inputData.filter( ( product ) => stock.includes( product.inventoryType ) );
       }

       if ( publish.length )
       {
              inputData = inputData.filter( ( product ) => publish.includes( product.publish ) );
       }

       return inputData;
}


ProductListViewUsers.propTypes = { toShow: PropTypes.string };
