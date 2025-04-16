
import * as annoncesFunction from 'src/1functions/annonces'


import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from 'src/auth/hooks';
import { useLocation, useNavigate, useParams } from 'react-router';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';


import PropTypes from 'prop-types';
import { io } from 'socket.io-client';

import { addData, resetData, setData } from 'src/store/annonces/data/dataReducer';
import { getList, resetAfterGetListRequete } from 'src/store/annonces/getUserAnnonces/getReducer';
import { request, resetAfterRequest } from 'src/store/annonces/getUsersAnnonces/reducer';
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
import {
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


import { setValeurRef } from 'src/1data/annonces/ref';
import { HOST_BACKEND_URL } from 'src/config-global';
import { dataObject } from 'src/1data/annonces/defaut';
import ProductTableToolbar from '../product-table-toolbar';
import ProductTableFiltersResult from '../product-table-filters-result';
import {
       RenderCellStock,
       RenderCellPrice,
       RenderCellPublish,
       RenderCellProduct,
       RenderCellCreatedAt,
       RenderCellNbrComment,
       RenderCellProductXs,
       RenderCellSponsored,
       RenderCellALaUne,
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
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function ProductListView({ toShow, clickFromProfile }) {


       const { enqueueSnackbar } = useSnackbar();
       const dispatch = useDispatch()


       const buySponsor = useBoolean();
       const startPaimentSponsor = useBoolean();
       const startPaimentALaUne = useBoolean();
       const aLaUneBuy = useBoolean();

       const confirmOfDel = useBoolean();
       const confirmRows = useBoolean();
       const navigate = useNavigate()

       const router = useRouter();

       const settings = useSettingsContext();

       // const { products, productsLoading } = useGetProducts();

       const [dataIsSet, setDataIsSet] = useState(false);
       const [tableData, setTableData] = useState([]);

       const [filters, setFilters] = useState(defaultFilters);

       const [selectedRowIds, setSelectedRowIds] = useState([]);

       const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

       const [annonceToDel, setAnnonceToDel] = useState({});
       const [annonceClick, setAnnonceClick] = useState({});
       const [annonceToSponsor, setAnnonceToSponsor] = useState({});

       const { user } = useAuthContext();
       const annonceList = useSelector((state) => state.getAnnonces.data);
       const annonceFromStore = useSelector((state) => state.annonces.data);


       const usersAnnonceList = useSelector((state) => state.getUsersAnnonces.data);
       const { isFulled, isPending } = useSelector((state) => state.getUsersAnnonces);
       const { isGeting, isGetingSuccess, isError } = useSelector((state) => state.getAnnonces);










       const theme = useTheme();
       const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // ✅ Détecte `xs` et `sm`









       const location = useLocation();
       const { email } = location.state || {};
       const idGet = useParams().id;
       console.log(idGet, isError);














       useEffect(() => {

              setValeurRef.current = setTableData;

       }, []);










       useEffect(() => () => {

              dispatch(resetData())
              dispatch(resetAfterRequest())
              dispatch(resetAfterGetListRequete());

       }, [dispatch]);










       useEffect(() => {

              if (!isGeting && !isGetingSuccess && !isError) {

                     if (user === null || user === undefined) {


                            return
                     }

                     if (idGet) {
                            dispatch(getList(idGet))
                            console.log(idGet, 'annonce appeler avec id utilisateur passer en arg');
                            return
                     }

                     dispatch(getList(user._id))


              }

       }, [dispatch, annonceList, user, isGetingSuccess, isGeting, toShow, idGet, isError]);









       useEffect(() => {


              dispatch(setData(annonceList))


       }, [annonceList, dispatch]);









       useEffect(() => {
              setTableData(annonceFromStore);
              console.log(annonceFromStore);


       }, [annonceFromStore]);











       useEffect(() => {
              setColumnVisibilityModel({
                     name: !isSmallScreen,  // ❌ Cache "nbrView" sur xs/sm
                     name0: isSmallScreen,  // ❌ Cache "nbrView" sur xs/sm
                     nbrView: !isSmallScreen,  // ❌ Cache "nbrView" sur xs/sm
                     nbrComment: !isSmallScreen,         // ✅ Toujours visible
                     rating: !isSmallScreen,   // ❌ Cache "rating" sur xs/sm
                     publish: !isSmallScreen,            // ✅ Toujours visible
                     actions: !isSmallScreen,            // ✅ Toujours visible
                     sponsored: !isSmallScreen,
                     aLaUne: !isSmallScreen,
              });
       }, [isSmallScreen]);







       const afterDelete = (deletedAnnonce) => { dispatch(setData(annoncesFunction.deleteAnnonceInArray(annonceFromStore, deletedAnnonce))) }











       // useEffect(() => {
       //        const socket = io(HOST_BACKEND_URL);
       //        socket.on('update-annonce', (update) => {

       //               dispatch(setData(annoncesFunction.updateAnnonceInArray(annonceFromStore, update)))
       //               console.log('nouvelle annonce detecter', update);

       //        });


       //        socket.on('banned-annonce', (update) => {

       //               dispatch(setData(annoncesFunction.updateAnnonceInArray(annonceFromStore, update)))

       //               console.log('nouvelle annonce detecter', update);


       //        });

       //        socket.on('delete-annonce', (del) => {

       //               console.log('annonce a supprimer', del);


       //               dispatch(setData(annoncesFunction.deleteAnnonceInArray(annonceFromStore, del)))
       //        });



       //        // Écouter l'événement 'new-annonce' pour mettre à jour les annonces en temps réel
       //        socket.on('new-annonce', (newAnnonce) => {
       //               if (newAnnonce.userEmail === (email !== undefined ? email : user?.email)) dispatch(addData(newAnnonce))
       //               console.log('nouvelle annonce detecter', newAnnonce);

       //        });

       //        return () => { socket.disconnect(); };

       // }, [dispatch, annonceFromStore, user?.email, email]);




       useEffect(() => {

              if (!dataIsSet) {

                     // console.log( products );
                     setDataIsSet(true);

              }

       }, [dataIsSet, dispatch, annonceFromStore]);







       const dataFiltered = applyFilter({
              inputData: tableData,
              filters,
       });

       const canReset = !isEqual(defaultFilters, filters);

       const handleFilters = useCallback((name, value) => {
              setFilters((prevState) => ({
                     ...prevState,
                     [name]: value,
              }));
       }, []);

       const handleResetFilters = useCallback(() => {
              setFilters(defaultFilters);
       }, []);

       const handleDeleteRow = useCallback(
              (id) => {
                     const deleteRow = tableData.filter((row) => row.id !== id);

                     enqueueSnackbar('Delete success!');

                     setTableData(deleteRow);
              },
              [enqueueSnackbar, tableData]
       );

       const handleDeleteRows = useCallback(() => {
              const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.id));

              enqueueSnackbar('Delete success!');

              setTableData(deleteRows);
       }, [enqueueSnackbar, selectedRowIds, tableData]);

       const handleEditRow = useCallback(
              (data) => {
                     navigate(paths.annonces.edit, { state: { data } });

              },
              [navigate]
       );

       const handleViewRow = useCallback(
              (id) => {
                     router.push(paths.dashboard.product.details(id));
              },
              [router]
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
                     valueGetter: (params) => params.row.name, // 🔥 Utilise la même valeur que "name"
                     renderCell: (params) => <RenderCellProductXs params={params}
                            clickFromProfile={clickFromProfile}
                            Sponsoriser={() => { buySponsor.onTrue(); setAnnonceToSponsor(params.row) }} mettreALaUne={() => { aLaUneBuy.onTrue(); setAnnonceClick(params.row) }} onEdit={() => { handleEditRow(params.row) }} onDelete={() => { confirmOfDel.onTrue(); setAnnonceToDel(params.row) }} />,
              },
              {
                     field: 'name',
                     headerName: 'Annonce',
                     flex: 1.9,
                     minWidth: 260,
                     width: 260,
                     hideable: true,
                     renderCell: (params) => <RenderCellProduct params={params} />,
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
                     renderCell: (params) => <RenderCellStock params={params} />,
              },
              {
                     field: 'nbrComment',
                     headerName: 'Commentaire',
                     width: 160,
                     minWidth: 140,

                     flex: 1.1,
                     hide: true, // 🔥 Masque la colonne directement selon la taille

                     renderCell: (params) => <RenderCellNbrComment params={params} />,
              },

              {
                     field: 'aLaUne',
                     headerName: 'A La Une',
                     width: 140,


                     minWidth: 90,

                     flex: 1.1,
                     hide: isSmallScreen, // 🔥 Masque la colonne directement selon la taille

                     editable: true,
                     renderCell: (params) => <RenderCellALaUne params={params} />,
              },


              {
                     field: 'rating',
                     headerName: 'Note',
                     width: 140,


                     minWidth: 90,

                     flex: 1.1,
                     hide: isSmallScreen, // 🔥 Masque la colonne directement selon la taille

                     editable: true,
                     renderCell: (params) => <RenderCellPrice params={params} />,
              },
              {
                     field: 'sponsored',
                     headerName: 'sponsorisé',
                     width: 140,


                     minWidth: 90,

                     flex: 1.1,
                     hide: isSmallScreen, // 🔥 Masque la colonne directement selon la taille

                     editable: true,
                     renderCell: (params) => <RenderCellSponsored params={params} />,
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

                     renderCell: (params) => <RenderCellPublish params={params} />,
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
                     getActions: (params) => {
                            if (clickFromProfile === undefined) {
                                   return [
                                          // <GridActionsCellItem
                                          //        showInMenu
                                          //        icon={ <Iconify icon="solar:pen-bold" /> }
                                          //        label="Mettre à la une"
                                          //        onClick={ () =>
                                          //        {
                                          //               aLaUneBuy.onTrue(); setAnnonceClick( params.row );
                                          //        } }
                                          // />,
                                          // < GridActionsCellItem
                                          //        showInMenu
                                          //        icon={ < Iconify icon="solar:pen-bold" /> }
                                          //        label="Sponsoriser"
                                          //        onClick={ () => { buySponsor.onTrue(); setAnnonceToSponsor( params.row ) }
                                          //        }
                                          // />,
                                          < GridActionsCellItem
                                                 showInMenu
                                                 icon={< Iconify icon="solar:pen-bold" />}
                                                 label="Modifier"
                                                 onClick={() => handleEditRow(params.row)}
                                          />,
                                          < GridActionsCellItem
                                                 showInMenu
                                                 icon={< Iconify icon="solar:trash-bin-trash-bold" />}
                                                 label="Supprimer"
                                                 onClick={() => {
                                                        confirmOfDel.onTrue();
                                                        setAnnonceToDel(params.row)
                                                 }}
                                                 sx={{ color: 'error.main' }}
                                          />
                                   ];
                            }

                            return [
                                   <GridActionsCellItem
                                          showInMenu
                                          icon={<Iconify icon="solar:pen-bold" />}
                                          label="Voir"
                                          onClick={() => clickFromProfile(params.row)}
                                   />
                            ];
                     }
              }
       ];

       const getTogglableColumns = () =>
              columns
                     .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
                     .map((column) => column.field);

       return (
              <>

                     {/* <DialogSponsorBuy showDialog={buySponsor} startPaiementSp={startPaimentSponsor} />
                     <DialogPaimentInProcessSponsorBuy dataGet={annonceToSponsor} showDialog={startPaimentSponsor} />

                     <DialogALaUneBuy showDialog={aLaUneBuy} startPaiement={startPaimentALaUne} />
                     <DialogPaimentInProcessALaUne dataGet={annonceClick} showDialog={startPaimentALaUne} /> */}
                     <Box
                            // maxWidth={ settings.themeStretch ? false : 'lg' }
                            // maxWidth='xl'
                            sx={{
                                   flexGrow: 1,
                                   display: 'flex',
                                   flexDirection: 'column',
                            }}
                     >
                            {user?.role === "user" && clickFromProfile === undefined && (<CustomBreadcrumbs
                                   heading="Liste Des Annonces"
                                   links={[
                                          {
                                                 name: '',
                                                 href: paths.dashboard.product.root,
                                          }
                                   ]}
                                   action={
                                          <>  <Button sx={{ display: { xs: 'none', md: 'flex' } }}
                                                 // component={ RouterLink }
                                                 // href={ paths.dashboard.product.new }
                                                 onClick={() => navigate('/home/annonces/new')}

                                                 variant="contained"
                                                 startIcon={<Iconify icon="mingcute:add-line" />}
                                          >
                                                 Nouvel annonce
                                          </Button>

                                                 <IconButton sx={{ display: { md: 'none' } }} color="inherit" onClick={() => navigate('/home/annonces/new')}>
                                                        <Iconify icon="mingcute:add-line" />
                                                 </IconButton>

                                          </>
                                   }
                                   sx={{
                                          mb: {
                                                 xs: 3,
                                                 md: 5,
                                          },
                                   }}
                            />)}

                            <Card
                                   sx={{
                                          // height: { xs: 800, md: 2 },
                                          // flexGrow: { md: 1 },
                                          // display: { md: 'flex' },
                                          // flexDirection: { md: 'column' },



                                          height: "max-content",
                                          minHeight: '600px',
                                          flexGrow: { md: 1 },
                                          display: 'flex',
                                          flexDirection: 'column',
                                   }}
                            >
                                   <DataGrid

                                          getRowId={(row) => row._id} // ou un autre champ unique comme row._id, row.code, etc.
                                          autoHeight={false}

                                          sx={{
                                                 '& .MuiDataGrid-virtualScroller': {
                                                        overflow: 'hidden', // Cache complètement le scroll
                                                 },
                                                 // OU pour garder la fonctionnalité de scroll mais cacher visuellement la barre :
                                                 '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                                                        display: 'none', // Cache seulement la barre de scroll
                                                 },

                                                 flexGrow: 1,
                                          }}





                                          disableColumnMenu
                                          // checkboxSelection
                                          disableRowSelectionOnClick
                                          rows={dataFiltered}
                                          columns={columns}
                                          loading={isGeting}
                                          getRowHeight={() => 'auto'}
                                          pageSizeOptions={[5, 10, 25]}
                                          initialState={{
                                                 pagination: {
                                                        paginationModel: { pageSize: 10 },
                                                 },
                                          }}
                                          onRowSelectionModelChange={(newSelectionModel) => {
                                                 setSelectedRowIds(newSelectionModel);
                                          }}
                                          columnVisibilityModel={columnVisibilityModel}
                                          onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                                          slots={{
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
                                                                             spacing={1}
                                                                             flexGrow={1}
                                                                             direction="row"
                                                                             alignItems="center"
                                                                             justifyContent="flex-end"
                                                                      >
                                                                             {!!selectedRowIds.length && (
                                                                                    <Button
                                                                                           size="small"
                                                                                           color="error"
                                                                                           startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                                                                                           onClick={confirmRows.onTrue}
                                                                                    >
                                                                                           Delete ({selectedRowIds.length})
                                                                                    </Button>
                                                                             )}

                                                                             {/* <GridToolbarColumnsButton />
                                                                             <GridToolbarFilterButton />
                                                                             <GridToolbarExport /> */}
                                                                      </Stack>
                                                               </GridToolbarContainer>

                                                               {canReset && (
                                                                      <ProductTableFiltersResult
                                                                             filters={filters}
                                                                             onFilters={handleFilters}
                                                                             onResetFilters={handleResetFilters}
                                                                             results={dataFiltered.length}
                                                                             sx={{ p: 2.5, pt: 0 }}
                                                                      />
                                                               )}
                                                        </>
                                                 ),
                                                 noRowsOverlay: () => <EmptyContent title="No Data" />,
                                                 noResultsOverlay: () => <EmptyContent title="No results found" />,
                                          }}
                                   // slotProps={ {
                                   //        columnsPanel: {
                                   //               getTogglableColumns,
                                   //        },
                                   // } }
                                   />
                            </Card>
                     </Box>



                     <DialogDeleteAnnonces showDialog={confirmRows} data={selectedRowIds} />
                     <DialogDeleteAnnonce showDialog={confirmOfDel} data={annonceToDel} handleAfterDelete={() => { afterDelete(annonceToDel) }} />
              </>
       );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters }) {
       const { stock, publish } = filters;

       if (stock.length) {
              inputData = inputData.filter((product) => stock.includes(product.inventoryType));
       }

       if (publish.length) {
              inputData = inputData.filter((product) => publish.includes(product.publish));
       }

       return inputData;
}


ProductListView.propTypes = {
       toShow: PropTypes.string,
       clickFromProfile: PropTypes.func
};
