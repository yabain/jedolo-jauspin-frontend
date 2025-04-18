import { Button, Tab, Tabs } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';
import { useGetSignalAnnonces } from 'src/1VALDO/hook/annonce/signalsGet';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
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




export default function AnnoncesSignal() {

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





       const updateSignalAnnonces = (dataGet) => { setSignalAnnonces(dataGet || []); console.log(dataGet); }





       useGetSignalAnnonces(updateSignalAnnonces)

















       // useEffect( () =>
       // {
       //        const socket = io( SOCKET_SERVER_URL );
       //        socket.on( 'new-annonce', ( newAnnonce ) =>
       //        {

       //               if ( newAnnonce.userEmail === user?.email ) dispatch( addAdminData( newAnnonce ) )
       //               console.log( 'nouvelle annonce detecter', newAnnonce );

       //        } ); return () => { socket.disconnect(); };

       // }, [ dispatch, user?.email ] );

       return (
              <>
                     <Helmet>
                            <title> Ndolo: Annonces signaler</title>
                     </Helmet>

                     <Container maxWidth='xl' sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                     }}>





                            <  JobListView dataGet={signalAnnonces} />


                     </Container>



              </>
       );
}
