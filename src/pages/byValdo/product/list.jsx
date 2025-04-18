import { Button, Tab, Tabs } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';
import { useGetSignalAnnonces } from 'src/1VALDO/hook/annonce/signalsGets';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { HOST_BACKEND_URL } from 'src/config-global';
import { JobListView } from 'src/sections/byValdo/job/view';
import { ProductListView } from 'src/sections/byValdo/product/view';

import ProductListViewUser from 'src/sections/byValdo/product/view/product-list-view-user';
import ProductListViewUsers from 'src/sections/byValdo/product/view/product-list-view-users';
import { addAdminData } from 'src/store/annonces/data/dataReducer';

// ----------------------------------------------------------------------

const TABS = [
       {
              value: 'one',
              icon: <Iconify icon="solar:phone-bold" width={24} />,
              label: 'Mes Annonces',
       },
       {
              value: 'two',
              icon: <Iconify icon="solar:heart-bold" width={24} />,
              label: 'Annonces Utilisateurs',
       },
       {
              value: 'three',
              icon: <Iconify icon="eva:headphones-fill" width={24} />,
              label: 'Annonce Signalées',
              disabled: true,
       },
       {
              value: 'four',
              icon: <Iconify icon="eva:headphones-fill" width={24} />,
              label: 'Item Four',
       },
       {
              value: 'five',
              icon: <Iconify icon="eva:headphones-fill" width={24} />,
              label: 'Item Five',
              disabled: true,
       },
       {
              value: 'six',
              icon: <Iconify icon="eva:headphones-fill" width={24} />,
              label: 'Item Six',
       },
       {
              value: 'seven',
              icon: <Iconify icon="eva:headphones-fill" width={24} />,
              label: 'Item Seven',
       },
];




export default function ProductListPage() {

       const SOCKET_SERVER_URL = HOST_BACKEND_URL; // L'URL de ton serveur backend
       const naviguate = useNavigate()

       const dispatch = useDispatch()
       const [currentTab, setCurrentTab] = useState('one');
       const [signalAnnonces, setSignalAnnonces] = useState([])


       const settings = useSettingsContext();
       const [scrollableTab, setScrollableTab] = useState('one');


       const { user } = useAuthContext();

       const handleChangeTab = useCallback((event, newValue) => {
              setCurrentTab(newValue);
       }, []);





       const updateSignalAnnonces = (dataGet) => { setSignalAnnonces(dataGet); console.log('donne sugnaler recu ', dataGet); }






       useGetSignalAnnonces(updateSignalAnnonces, currentTab === 'three')

















       // useEffect( () =>
       // {
       //        const socket = io( SOCKET_SERVER_URL );
       //        socket.on( 'new-annonce', ( newAnnonce ) =>
       //        {

       //               if ( newAnnonce.userEmail === user?.email ) dispatch( addAdminData( newAnnonce ) )
       //               console.log( 'nouvelle annonce detecter', newAnnonce );

       //        } ); return () => { socket.disconnect(); };

       // }, [ dispatch, user?.email, SOCKET_SERVER_URL ] );

       return (
              <>
                     <Helmet>
                            <title> Ndolo: Liste des Annonces</title>
                     </Helmet>

                     {user !== null && user?.role === "admin" && (<Container maxWidth='xl' sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                     }}>

                            <Box display="flex" justifyContent="space-between" alignItems="center">

                                   <Tabs value={currentTab} onChange={handleChangeTab}>
                                          {TABS.slice(0, 3).map((tab) => (
                                                 <Tab key={tab.value} value={tab.value} label={tab.label} />
                                          ))}
                                   </Tabs>

                                   <Button

                                          sx={{ display: { xs: 'none' } }}
                                          // component={ RouterLink }
                                          // href={ paths.dashboard.product.new }
                                          onClick={() => naviguate('/home/annonces/new')}

                                          variant="contained"
                                          startIcon={<Iconify icon="mingcute:add-line" />}
                                   >
                                          Nouvel Annonce
                                   </Button>
                            </Box>

                            {currentTab === "one" && (

                                   <  ProductListViewUser />

                            )}


                            {currentTab === "two" && (

                                   <  ProductListViewUsers />
                            )}

                            {currentTab === "three" && (

                                   <  JobListView dataGet={signalAnnonces} />
                            )}

                     </Container>
                     )}

                     {user !== null && (user?.role === "user" || user === undefined || user === null) &&

                            <Container maxWidth='xl' sx={{
                                   flexGrow: 1,
                                   display: 'flex',
                                   flexDirection: 'column',
                            }}><ProductListView /></Container>}
              </>
       );
}
