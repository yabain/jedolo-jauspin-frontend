
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';


import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Iconify from 'src/components/iconify';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useLocation, useNavigate } from 'react-router';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import Label from 'src/components/label';

import { bgBlur } from 'src/theme/css';
import { useAuthContext } from 'src/auth/hooks';

import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';
import { RoleBasedGuard } from 'src/auth/guardByvaldo';

import Searchbar from '../../common/searchbar';
import { NAV, HEADER } from '../../config-layout';
import SettingsButton from '../../common/settings-button';
import AccountPopover from '../../common/account-popover';
import ContactsPopover from '../../common/contacts-popover';
import LanguagePopover from '../../common/language-popover';
import NotificationsPopover from '../../common/notifications-popover';

// ----------------------------------------------------------------------

export default function Header( { onOpenNav } )
{

       const { user } = useAuthContext();

       // const user = useSelector( ( state ) => state.users.selectedUser );

       // console.log( 'role du user from header', user );

       const theme = useTheme();
       const location = useLocation();
       const naviguate = useNavigate()


       const settings = useSettingsContext();

       const isNavHorizontal = settings.themeLayout === 'horizontal';

       const isNavMini = settings.themeLayout === 'mini';

       const lgUp = useResponsive( 'up', 'xl' );

       const offset = useOffSetTop( HEADER.H_DESKTOP );

       const offsetTop = offset && !isNavHorizontal;

       const renderContent = (
              <>



                     <Stack direction="row" alignItems="center">

                            <Logo />


                     </Stack>




                     <Stack
                            flexGrow="1"
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-end"
                            spacing={ { xs: 0.5, sm: 1 } }
                     >
                            {/* <LanguagePopover />

        <NotificationsPopover />

        <ContactsPopover />

        <SettingsButton /> */}




                            <Stack
                                   flexGrow={ 1 }
                                   direction="row"
                                   alignItems="center"
                                   justifyContent="flex-end"
                                   spacing={ { xs: 2, sm: 1 } }
                            >

                                   <RoleBasedGuard hasContent roles={ [ 'admin', 'user' ] }  >
                                          <Button

                                                 onClick={ () => { naviguate( '/home' ) } }
                                                 sx={ {

                                                        mt: 2,

                                                        display: { md: 'block', sm: 'none', xs: 'none' }
                                                        // ml: 3,

                                                 } }
                                                 variant={ location.pathname === '/home' ? "contained" : "outlined" } color="primary"
                                          // startIcon={ <Iconify icon="eva:search-fill" /> }
                                          >
                                                 Acceuil
                                          </Button>
                                   </RoleBasedGuard>



                                   <RoleBasedGuard hasContent roles={ [ 'user' ] }  >
                                          <Button

                                                 onClick={ () => { naviguate( '/home/annonces/list' ) } }
                                                 sx={ {

                                                        mt: 2,
                                                        display: { md: 'block', sm: 'none', xs: 'none' }
                                                        // ml: 3,

                                                 } }
                                                 variant={ location.pathname === '/home/annonces/list' ? "contained" : "outlined" } color="primary"
                                          // startIcon={ <Iconify icon="eva:search-fill" /> }
                                          >
                                                 Mes Annonces
                                          </Button>
                                   </RoleBasedGuard>



                                   <RoleBasedGuard hasContent roles={ [ 'user' ] }  >
                                          <Button

                                                 onClick={ () => { naviguate( '/home/annonces/signal' ) } }
                                                 sx={ {

                                                        mt: 2,
                                                        display: { md: 'block', sm: 'none', xs: 'none' }
                                                        // ml: 3,

                                                 } }
                                                 variant={ location.pathname === '/home/annonces/signal' ? "contained" : "outlined" } color="primary"
                                          // startIcon={ <Iconify icon="eva:search-fill" /> }
                                          >
                                                 Annonces  Signaler
                                          </Button>
                                   </RoleBasedGuard>




                                   <RoleBasedGuard hasContent roles={ [] }  >
                                          <Button

                                                 onClick={ () => { naviguate( '/auth/jwt/register' ) } }
                                                 sx={ {

                                                        mt: 2,
                                                        // display: { md: 'block', sm: 'none', xs: 'none' }
                                                        // ml: 3,

                                                 } }
                                                 variant={ location.pathname === '/auth/jwt/register' ? "contained" : "outlined" } color="primary"
                                          // startIcon={ <Iconify icon="eva:search-fill" /> }
                                          >
                                                 Inscription
                                          </Button>
                                   </RoleBasedGuard>




                                   <RoleBasedGuard hasContent roles={ [] }  >
                                          <Button

                                                 onClick={ () => { naviguate( '/auth/jwt/login' ) } }
                                                 sx={ {

                                                        mt: 2,
                                                        // display: { md: 'block', sm: 'none', xs: 'none' }
                                                        // ml: 3,

                                                 } }
                                                 variant={ location.pathname === '/auth/jwt/login' ? "contained" : "outlined" } color="primary"
                                          // startIcon={ <Iconify icon="eva:search-fill" /> }
                                          >
                                                 Connexion
                                          </Button>
                                   </RoleBasedGuard>


                                   <RoleBasedGuard hasContent roles={ [ 'admin' ] } >
                                          <Button

                                                 onClick={ () => { naviguate( '/home/user/list' ) } }
                                                 sx={ {

                                                        mt: 2,
                                                        display: { md: 'block', sm: 'none', xs: 'none' }
                                                        // ml: 3,

                                                 } }
                                                 variant={ location.pathname === '/home/user/list' ? "contained" : "outlined" } color="primary"
                                          // startIcon={ <Iconify icon="eva:search-fill" /> }
                                          >
                                                 Utilisateurs
                                          </Button>



                                          <Button

                                                 onClick={ () => { naviguate( '/home/annonces/categorie' ) } }
                                                 sx={ {

                                                        mt: 2,
                                                        display: { md: 'block', sm: 'none', xs: 'none' }
                                                        // ml: 3,

                                                 } }
                                                 variant={ location.pathname === '/home/annonces/categorie' ? "contained" : "outlined" } color="primary"
                                          // startIcon={ <Iconify icon="eva:search-fill" /> }
                                          >
                                                 Sponsors
                                          </Button>
                                   </RoleBasedGuard>

                                   { user?.role !== undefined ? (
                                          <RoleBasedGuard hasContent roles={ [ 'user' ] }>
                                                 <Button
                                                        onClick={ () =>
                                                               naviguate( '/home/annonces/new' )
                                                        }
                                                        sx={ { mt: 2, display: { md: 'block', sm: 'none', xs: 'none', display: { md: 'block', sm: 'none', xs: 'none' } } } }
                                                        variant={ location.pathname === '/home/annonces/new' ? 'contained' : 'outlined' }
                                                        color="primary"
                                                 >
                                                        Publier
                                                 </Button>
                                          </RoleBasedGuard>
                                   ) : (
                                          <Button
                                                 onClick={ () =>
                                                        naviguate( '/auth/jwt/login' )
                                                 }
                                                 sx={ { mt: 2, display: { md: 'block', sm: 'none', xs: 'none' } } }
                                                 variant={ location.pathname === '/home/annonces/new' ? 'contained' : 'outlined' }
                                                 color="primary"
                                          >
                                                 Publier
                                          </Button>
                                   ) }


                                   <RoleBasedGuard hasContent roles={ [ 'admin', 'user' ] }  >
                                          <Button

                                                 onClick={ () => { naviguate( '/home/transactions/list' ) } }
                                                 sx={ {

                                                        mt: 2,
                                                        display: { md: 'block', sm: 'none', xs: 'none' }
                                                        // ml: 3,

                                                 } }
                                                 variant={ location.pathname === '/home/transactions/list' ? "contained" : "outlined" } color="primary"
                                          // startIcon={ <Iconify icon="eva:search-fill" /> }
                                          >
                                                 Transactions
                                          </Button>
                                   </RoleBasedGuard>

                                   <RoleBasedGuard hasContent roles={ [ 'admin' ] }  >
                                          <Button

                                                 onClick={ () => { naviguate( '/home/annonces/list' ) } }
                                                 sx={ {

                                                        mt: 2,
                                                        display: { md: 'block', sm: 'none', xs: 'none' }
                                                        // ml: 3,

                                                 } }
                                                 variant={ location.pathname === '/home/annonces/list' ? "contained" : "outlined" } color="primary"
                                          // startIcon={ <Iconify icon="eva:search-fill" /> }
                                          >
                                                 Annonces
                                          </Button>
                                   </RoleBasedGuard>

                            </Stack>
                            <RoleBasedGuard hasContent roles={ [ 'admin', 'user' ] } >
                                   <AccountPopover />
                            </RoleBasedGuard>
                     </Stack>




              </>
       );

       return (

              <AppBar
                     sx={ {
                            height: HEADER.H_MOBILE,
                            zIndex: theme.zIndex.appBar + 1,
                            ...bgBlur( {
                                   color: theme.palette.background.default,
                            } ),
                            transition: theme.transitions.create( [ 'height' ], {
                                   duration: theme.transitions.duration.shorter,
                            } ),
                            ...( lgUp && {
                                   width: `calc(100% - 0px)`,
                                   height: HEADER.H_DESKTOP,
                                   ...( offsetTop && {
                                          height: HEADER.H_DESKTOP_OFFSET,
                                   } ),
                                   ...( isNavHorizontal && {
                                          width: 1,
                                          bgcolor: 'background.default',
                                          height: HEADER.H_DESKTOP_OFFSET,
                                          borderBottom: `dashed 1px ${ theme.palette.divider }`,
                                   } ),
                                   ...( isNavMini && {
                                          width: `calc(100% - 0px)`,
                                   } ),
                            } ),
                            alignItems: 'center',

                     } }
              >

                     <Box width={ 1 } maxWidth={ settings.themeStretch ? false : 'xl' } >
                            <Toolbar
                                   sx={ {
                                          height: 1,
                                          px: { lg: 5 },
                                   } }
                            >
                                   { renderContent }
                            </Toolbar>

                     </Box>

              </AppBar>
       );
}

Header.propTypes = {
       onOpenNav: PropTypes.func,
};
