import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

export default function ProductDetailsToolbar( {
       publish,
       backLink,
       editLink,
       liveLink,
       publishOptions,
       onChangePublish,
       data,
       sx,
       ...other
} )
{
       const popover = usePopover();
       const navigate = useNavigate()

       console.log( data, 'toooooooooooooooo' );

       return (
              <>
                     <Stack
                            spacing={ 1.5 }
                            direction="row"
                            sx={ {
                                   mb: { xs: 3, md: 5 },
                                   ...sx,
                            } }
                            { ...other }
                     >
                            <Button
                                   // component={ RouterLink }
                                   onClick={ () => { navigate( - 1 ) } }
                                   startIcon={ <Iconify icon="eva:arrow-ios-back-fill" width={ 16 } /> }
                            >
                                   Retour
                            </Button>

                            <Box sx={ { flexGrow: 1 } } />

                            {/* { publish === 'published' && (
                                   <Tooltip title="Go Live">
                                          <IconButton component={ RouterLink } href={ liveLink }>
                                                 <Iconify icon="eva:external-link-fill" />
                                          </IconButton>
                                   </Tooltip>
                            ) }

                            <Tooltip title="Edit">
                                   <IconButton component={ RouterLink } href={ editLink }>
                                          <Iconify icon="solar:pen-bold" />
                                   </IconButton>
                            </Tooltip> */}

                            <LoadingButton
                                   color="inherit"
                                   variant="contained"
                                   loading={ !publish }
                                   loadingIndicator="Loading…"
                                   onClick={
                                          () =>
                                          {
                                                 navigate(
                                                        '/home/user/profile',
                                                        {
                                                               state: { email: data.userEmail, data }  // En supposant que `user?.email` est disponible
                                                        } )
                                          }

                                   }
                                   sx={ { textTransform: 'capitalize' } }
                            >
                                   Profil de l&apos;annonceur

                            </LoadingButton>
                     </Stack >

                     <CustomPopover
                            open={ popover.open }
                            onClose={ popover.onClose }
                            arrow="top-right"
                            sx={ { width: 140 } }
                     >
                            { publishOptions.map( ( option ) => (
                                   <MenuItem
                                          key={ option.value }
                                          selected={ option.value === publish }
                                          onClick={ () =>
                                          {
                                                 popover.onClose();
                                                 onChangePublish( option.value );
                                          } }
                                   >
                                          { option.value === 'published' && <Iconify icon="eva:cloud-upload-fill" /> }
                                          { option.value === 'draft' && <Iconify icon="solar:file-text-bold" /> }
                                          { option.label }
                                   </MenuItem>
                            ) ) }
                     </CustomPopover>
              </>
       );
}

ProductDetailsToolbar.propTypes = {
       backLink: PropTypes.string,
       editLink: PropTypes.string,
       liveLink: PropTypes.string,
       onChangePublish: PropTypes.func,
       publish: PropTypes.string,
       publishOptions: PropTypes.array,
       data: PropTypes.object,
       sx: PropTypes.object,
};
