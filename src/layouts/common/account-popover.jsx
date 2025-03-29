import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { useAuthContext } from 'src/auth/hooks';
import { varHover } from 'src/components/animate';
import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { setUsers } from 'src/store/users/setUsersReducer';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

const OPTIONS = [

       {
              label: 'Profile',
              linkTo: paths.dashboard.user.profile,
       },
       {
              label: 'Settings',
              linkTo: paths.dashboard.user.account,
       },
];

// ----------------------------------------------------------------------

// Fonction utilitaire pour gérer les styles conditionnels
const getConditionalStyles = ( currentPath, optionLink ) =>
{
       const isActive = currentPath === optionLink;

       return {
              fontWeight: isActive ? 600 : 'normal', // Exemple de style conditionnel
              color: isActive ? 'primary.main' : 'text.primary', // Autre style conditionnel
              backgroundColor: isActive ? alpha( '#f0f0f0', 0.1 ) : 'transparent', // Exemple de fond conditionnel
       };
};

// ----------------------------------------------------------------------

export default function AccountPopover()
{
       const router = useRouter();
       const location = useLocation();
       const currentPath = location.pathname;

       // const { user } = useMockedUser();
       const { user } = useAuthContext()
       const dispatch = useDispatch();
       const { logout } = useAuthContext();
       const { enqueueSnackbar } = useSnackbar();
       const popover = usePopover();

       const handleLogout = async () =>
       {
              try
              {
                     await logout();
                     popover.onClose();
                     router.replace( '/home' );
                     dispatch( setUsers( {} ) );
              } catch ( error )
              {
                     console.error( error );
                     enqueueSnackbar( 'Unable to logout!', { variant: 'error' } );
              }
       };

       const handleClickItem = ( path ) =>
       {
              popover.onClose();
              router.push( path );
       };

       return (
              <>
                     <IconButton
                            component={ m.button }
                            whileTap="tap"
                            whileHover="hover"
                            variants={ varHover( 1.05 ) }
                            onClick={ popover.onOpen }
                            sx={ {
                                   width: 40,
                                   height: 40,
                                   background: ( theme ) => alpha( theme.palette.grey[ 500 ], 0.08 ),
                                   ...( popover.open && {
                                          background: ( theme ) =>
                                                 `linear-gradient(135deg, ${ theme.palette.primary.light } 0%, ${ theme.palette.primary.main } 100%)`,
                                   } ),
                            } }
                     >
                            <Avatar
                                   src={ user?.photoURL !== "" && user.photoURL }
                                   alt={ user?.displayName }
                                   sx={ {
                                          width: 36,
                                          height: 36,
                                          border: ( theme ) => `solid 2px ${ theme.palette.background.default }`,
                                   } }
                            >
                                   { user?.displayName?.charAt( 1 ).toUpperCase() }
                            </Avatar>
                     </IconButton>

                     <CustomPopover open={ popover.open } onClose={ popover.onClose } sx={ { width: 200, p: 0 } }>
                            <Box sx={ { p: 2, pb: 1.5 } }>
                                   <Typography variant="subtitle2" noWrap>
                                          { user?.displayName }
                                   </Typography>

                                   <Typography variant="body2" sx={ { color: 'text.secondary' } } noWrap>
                                          { user?.email }
                                   </Typography>
                            </Box>



                            <Divider sx={ { borderStyle: 'dashed' } } />

                            {/* ➕ Mobile-only actions */ }
                            <Box sx={ { display: { xs: 'block', md: 'none' }, px: 1 } }>
                                   <Stack spacing={ 0.5 }>
                                          { [
                                                 { label: 'Accueil', linkTo: '/home' },
                                                 { label: 'Annonces', linkTo: '/home/annonces/list' },
                                                 { label: 'Mes Annonces', linkTo: '/home/annonces/list' },
                                                 { label: 'Annonces Signaler', linkTo: '/home/annonces/signal' },
                                                 { label: 'Publier', linkTo: '/home/annonces/new' },
                                                 { label: 'Utilisateurs', linkTo: '/home/user/list' },
                                                 { label: 'Sponsors', linkTo: '/home/annonces/categorie' },
                                                 { label: 'Transactions', linkTo: '/home/transactions/list' },
                                          ].map( ( option ) =>
                                          {

                                                 if ( option.label === 'Mes Annonces' && user?.role !== 'user' )
                                                 {
                                                        return null; // Ne pas afficher cette option
                                                 }
                                                 if ( option.label === 'Annonces Signaler' && user?.role !== 'user' )
                                                 {
                                                        return null; // Ne pas afficher cette option
                                                 }

                                                 // Masquer "Annonces" si l'utilisateur est un 'user'
                                                 if ( option.label === 'Annonces' && user?.role === 'user' )
                                                 {
                                                        return null; // Ne pas afficher cette option
                                                 } if ( option.label === 'Sponsors' && user?.role === 'user' )
                                                 {
                                                        return null; // Ne pas afficher cette option
                                                 } if ( option.label === 'Utilisateurs' && user?.role === 'user' )
                                                 {
                                                        return null; // Ne pas afficher cette option
                                                 }


                                                 return (
                                                        <MenuItem key={ option.label } onClick={ () => handleClickItem( option.linkTo ) }>
                                                               <Typography
                                                                      variant="body2"
                                                                      sx={ getConditionalStyles( currentPath, option.linkTo ) } // Appliquer les styles conditionnels
                                                               >
                                                                      { option.label }
                                                               </Typography>
                                                        </MenuItem>
                                                 )
                                          } ) }
                                   </Stack>
                            </Box>

                            <Divider sx={ { borderStyle: 'dashed' } } />

                            <Stack sx={ { p: 1 } }>
                                   { OPTIONS.map( ( option ) =>
                                   (
                                          <MenuItem key={ option.label } >
                                                 {/* <MenuItem key={ option.label } onClick={ () => handleClickItem( option.linkTo ) }> */ }
                                                 <Typography
                                                        variant="body2"
                                                        sx={ getConditionalStyles( currentPath, option.linkTo ) } // Appliquer les styles conditionnels
                                                 >
                                                        { option.label }
                                                 </Typography>
                                          </MenuItem>
                                   ) ) }
                            </Stack>

                            <Divider sx={ { borderStyle: 'dashed' } } />

                            <MenuItem
                                   onClick={ handleLogout }
                                   sx={ { m: 1, fontWeight: 'fontWeightBold', color: 'error.main' } }
                            >
                                   Logout
                            </MenuItem>
                     </CustomPopover >
              </>
       );
}