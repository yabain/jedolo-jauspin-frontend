
import * as annoncesFunction from 'src/1functions/annonces'


import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from 'src/auth/hooks';
import { useNavigate } from 'react-router';


import PropTypes from 'prop-types';
import { io } from 'socket.io-client';

import { addData, resetData, setData } from 'src/store/annonces/data/dataReducer';
import { getList, resetAfterGetListRequete } from 'src/store/annonces/getUserAnnonces/getReducer';
import { request, resetAfterRequest } from 'src/store/annonces/getUsersAnnonces/reducer';
import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

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
       category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function ProductListView({ toShow }) {


       const { enqueueSnackbar } = useSnackbar();
       const dispatch = useDispatch()



       const confirmOfDel = useBoolean();
       const confirmRows = useBoolean();
       const navigate = useNavigate()

       const router = useRouter();

       const settings = useSettingsContext();

       const { products, productsLoading } = useGetProducts();

       const [dataIsSet, setDataIsSet] = useState(false);
       const [tableData, setTableData] = useState([]);

       const [filters, setFilters] = useState(defaultFilters);

       const [selectedRowIds, setSelectedRowIds] = useState([]);

       const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

       const [annonceToDel, setAnnonceToDel] = useState({});

       const { user } = useAuthContext();
       const annonceList = useSelector((state) => state.getAnnonces.data);
       const annonceFromStore = useSelector((state) => state.annonces.data);


       const usersAnnonceList = useSelector((state) => state.getUsersAnnonces.data);
       const { isFulled, isPending } = useSelector((state) => state.getUsersAnnonces);
       const { isGeting, isGetingSuccess } = useSelector((state) => state.getAnnonces);

       useEffect(() => {

              setValeurRef.current = setTableData;

       }, []);










       useEffect(() => () => {

              dispatch(resetData())
              dispatch(resetAfterRequest())
              dispatch(resetAfterGetListRequete());

       }, [dispatch]);










       useEffect(() => {

              if (!isGeting && !isGetingSuccess) {

                     if (user === null || user === undefined) {


                            return
                     }


                     dispatch(getList(user?.email))


              }

       }, [dispatch, annonceList, user, isGetingSuccess, isGeting, toShow]);









       useEffect(() => {


              dispatch(setData(annonceList))


       }, [annonceList, dispatch]);









       useEffect(() => {
              setTableData(annonceFromStore);

       }, [annonceFromStore]);











       // useEffect( () =>
       // {
       //        const socket = io( HOST_BACKEND_URL );
       //        socket.on( 'update-annonce', ( update ) =>
       //        {

       //               dispatch( setData( annoncesFunction.updateAnnonceInArray( annonceFromStore, update ) ) )
       //               console.log( 'nouvelle annonce detecter', update );

       //        } );


       //        socket.on( 'banned-annonce', ( update ) =>
       //        {

       //               dispatch( setData( annoncesFunction.updateAnnonceInArray( annonceFromStore, update ) ) )

       //               console.log( 'nouvelle annonce detecter', update );


       //        } );

       //        socket.on( 'delete-annonce', ( del ) =>
       //        {

       //               console.log( 'annonce a supprimer', del );


       //               dispatch( setData( annoncesFunction.deleteAnnonceInArray( annonceFromStore, del ) ) )
       //        } );



       //        // Écouter l'événement 'new-annonce' pour mettre à jour les annonces en temps réel
       //        socket.on( 'new-annonce', ( newAnnonce ) =>
       //        {
       //               if ( newAnnonce.userEmail === user?.email ) dispatch( addData( newAnnonce ) )
       //               console.log( 'nouvelle annonce detecter', newAnnonce );

       //        } );

       //        return () => { socket.disconnect(); };

       // }, [ dispatch, annonceFromStore, user?.email ] );




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
              {
                     field: 'category',
                     headerName: 'Category',
                     filterable: false,
              },
              {
                     field: 'name',
                     headerName: 'Product',
                     flex: 1,
                     minWidth: 360,
                     hideable: false,
                     renderCell: (params) => <RenderCellProduct params={params} />,
              },
              {
                     field: 'createdAt',
                     headerName: 'Create at',
                     width: 160,
                     renderCell: (params) => <RenderCellCreatedAt params={params} />,
              },
              {
                     field: 'inventoryType',
                     headerName: 'Stock',
                     width: 160,
                     type: 'singleSelect',
                     valueOptions: PRODUCT_STOCK_OPTIONS,
                     renderCell: (params) => <RenderCellStock params={params} />,
              },
              {
                     field: 'price',
                     headerName: 'Price',
                     width: 140,
                     editable: true,
                     renderCell: (params) => <RenderCellPrice params={params} />,
              },
              {
                     field: 'publish',
                     headerName: 'Publish',
                     width: 110,
                     type: 'singleSelect',
                     editable: true,
                     valueOptions: PUBLISH_OPTIONS,
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
                     getActions: (params) => [
                            <GridActionsCellItem
                                   showInMenu
                                   icon={<Iconify icon="solar:eye-bold" />}
                                   label="View"
                                   onClick={() => handleViewRow(params.row.id)}
                            />,
                            <GridActionsCellItem
                                   showInMenu
                                   icon={<Iconify icon="solar:pen-bold" />}
                                   label="Edit"
                                   onClick={() => handleEditRow(params.row)}
                            />,
                            <GridActionsCellItem
                                   showInMenu
                                   icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                                   label="Delete"
                                   onClick={() => {
                                          confirmOfDel.onTrue(); setAnnonceToDel(params.row)
                                   }}
                                   sx={{ color: 'error.main' }}
                            />,
                     ],
              },
       ];

       const getTogglableColumns = () =>
              columns
                     .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
                     .map((column) => column.field);

       return (
              <>
                     <Box
                            // maxWidth={ settings.themeStretch ? false : 'lg' }
                            // maxWidth='xl'
                            sx={{
                                   flexGrow: 1,
                                   display: 'flex',
                                   flexDirection: 'column',
                            }}
                     >
                            {user?.role === "user" && (<CustomBreadcrumbs
                                   heading="Liste Des Annonces"
                                   links={[
                                          {
                                                 name: '',
                                                 href: paths.dashboard.product.root,
                                          }
                                   ]}
                                   action={
                                          <Button
                                                 // component={ RouterLink }
                                                 // href={ paths.dashboard.product.new }
                                                 onClick={() => navigate('/home/annonces/new')}

                                                 variant="contained"
                                                 startIcon={<Iconify icon="mingcute:add-line" />}
                                          >
                                                 New Product
                                          </Button>
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
                                          height: { xs: 800, md: 2 },
                                          flexGrow: { md: 1 },
                                          display: { md: 'flex' },
                                          flexDirection: { md: 'column' },
                                   }}
                            >
                                   <DataGrid
                                          checkboxSelection
                                          disableRowSelectionOnClick
                                          rows={dataFiltered}
                                          columns={columns}
                                          loading={dataFiltered.length === 0}
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
                                                                      <ProductTableToolbar
                                                                             filters={filters}
                                                                             onFilters={handleFilters}
                                                                             stockOptions={PRODUCT_STOCK_OPTIONS}
                                                                             publishOptions={PUBLISH_OPTIONS}
                                                                      />

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

                                                                             <GridToolbarColumnsButton />
                                                                             <GridToolbarFilterButton />
                                                                             <GridToolbarExport />
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
                                          slotProps={{
                                                 columnsPanel: {
                                                        getTogglableColumns,
                                                 },
                                          }}
                                   />
                            </Card>
                     </Box>



                     <DialogDeleteAnnonces showDialog={confirmRows} data={selectedRowIds} />
                     <DialogDeleteAnnonce showDialog={confirmOfDel} data={annonceToDel} />
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


ProductListView.propTypes = { toShow: PropTypes.string };
