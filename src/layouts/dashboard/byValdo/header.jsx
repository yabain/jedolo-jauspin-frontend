import PropTypes from 'prop-types';


import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Iconify from 'src/components/iconify';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useLocation, useNavigate } from 'react-router';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';

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
       const theme = useTheme();
       const location = useLocation();
       const naviguate = useNavigate()


       const settings = useSettingsContext();

       const isNavHorizontal = settings.themeLayout === 'horizontal';

       const isNavMini = settings.themeLayout === 'mini';

       const lgUp = useResponsive( 'up', 'lg' );

       const offset = useOffSetTop( HEADER.H_DESKTOP );

       const offsetTop = offset && !isNavHorizontal;

       const renderContent = (
              <>
                     { lgUp && isNavHorizontal && <Logo sx={ { mr: 2.5 } } /> }

                     { !lgUp && (
                            <IconButton onClick={ onOpenNav }>
                                   <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
                            </IconButton>
                     ) }

                     <Searchbar />

                     <Stack
                            flexGrow={ 1 }
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
                                   <Button

                                          onClick={ () => { naviguate( '/home' ) } }
                                          sx={ {

                                                 mt: 2,

                                                 // ml: 3,

                                          } }
                                          variant={ location.pathname === '/home' ? "contained" : "outlined" } color="primary"
                                   // startIcon={ <Iconify icon="eva:search-fill" /> }
                                   >
                                          Acceuil
                                   </Button>



                                   <Button

                                          onClick={ () => { naviguate( '/home/annonces/list' ) } }
                                          sx={ {

                                                 mt: 2,

                                                 // ml: 3,

                                          } }
                                          variant={ location.pathname === '/home/annonces/list' ? "contained" : "outlined" } color="primary"
                                   // startIcon={ <Iconify icon="eva:search-fill" /> }
                                   >
                                          Mes Annonces
                                   </Button>



                                   <Button

                                          onClick={ () => { naviguate( '/home/user/list' ) } }
                                          sx={ {

                                                 mt: 2,

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

                                                 // ml: 3,

                                          } }
                                          variant={ location.pathname === '/home/annonce/categorie' ? "contained" : "outlined" } color="primary"
                                   // startIcon={ <Iconify icon="eva:search-fill" /> }
                                   >
                                          Catégories
                                   </Button>

                                   <Button

                                          onClick={ () => { naviguate( '/home/annonces/new' ) } }
                                          sx={ {

                                                 mt: 2,

                                                 // ml: 3,

                                          } }
                                          variant={ location.pathname === '/home/annonces/new' ? "contained" : "outlined" } color="primary"
                                   // startIcon={ <Iconify icon="eva:search-fill" /> }
                                   >
                                          Publier
                                   </Button>
                            </Stack>
                            <AccountPopover />
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
                                   width: `calc(100% - ${ NAV.W_VERTICAL + 1 }px)`,
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
                                          width: `calc(100% - ${ NAV.W_MINI + 1 }px)`,
                                   } ),
                            } ),
                     } }
              >
                     <Toolbar
                            sx={ {
                                   height: 1,
                                   px: { lg: 5 },
                            } }
                     >
                            { renderContent }
                     </Toolbar>
              </AppBar>
       );
}

Header.propTypes = {
       onOpenNav: PropTypes.func,
};
