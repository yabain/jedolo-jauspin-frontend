import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CountrySelect from 'src/components/country-select';
import SidebarFilter from '../overview/app/sidebar-filter';

// ----------------------------------------------------------------------

export default function TourFilters( {
       open,
       onOpen,
       onClose,
       onPriceFilters,
       onArgumentFilters,
       onOrderPriceFilters

} )
{
       // const handleFilterServices = useCallback(
       //        ( newValue ) =>
       //        {
       //               const checked = filters.services.includes( newValue )
       //                      ? filters.services.filter( ( value ) => value !== newValue )
       //                      : [ ...filters.services, newValue ];
       //               onFilters( 'services', checked );
       //        },
       //        [ filters.services, onFilters ]
       // );

       // const handleFilterStartDate = useCallback(
       //        ( newValue ) =>
       //        {
       //               onFilters( 'startDate', newValue );
       //        },
       //        [ onFilters ]
       // );

       // const handleFilterEndDate = useCallback(
       //        ( newValue ) =>
       //        {
       //               onFilters( 'endDate', newValue );
       //        },
       //        [ onFilters ]
       // );

       // const handleFilterDestination = useCallback(
       //        ( newValue ) =>
       //        {
       //               onFilters( 'destination', newValue );
       //        },
       //        [ onFilters ]
       // );

       // const handleFilterTourGuide = useCallback(
       //        ( newValue ) =>
       //        {
       //               onFilters( 'tourGuides', newValue );
       //        },
       //        [ onFilters ]
       // );

       const renderHead = (
              <Stack
                     direction="row"
                     alignItems="center"
                     justifyContent="space-between"
                     sx={ { py: 2, pr: 1, pl: 2.5 } }
              >
                     <Typography variant="h6" sx={ { flexGrow: 1 } }>
                            Filters
                     </Typography>



                     <IconButton onClick={ onClose }>
                            <Iconify icon="mingcute:close-line" />
                     </IconButton>
              </Stack>
       );



       return (
              <>
                     <Button
                            sx={ { display: { xs: 'blcok', sm: 'none', md: 'none' } } }
                            fullWidth
                            disableRipple
                            variant='contained'
                            color="success"
                            endIcon={
                                   <Iconify icon="ic:round-filter-list" />

                            }
                            onClick={ onOpen }
                     >
                            Filtrer
                     </Button>

                     <Drawer
                            anchor="right"
                            open={ open }
                            onClose={ onClose }
                            slotProps={ {
                                   backdrop: { invisible: true },
                            } }
                            PaperProps={ {
                                   sx: { width: 280 },
                            } }
                     >
                            { renderHead }

                            <Divider />

                            <Scrollbar sx={ { px: 2.5, py: 3 } }>
                                   <Stack spacing={ 3 }>


                                          <SidebarFilter

                                                 onPriceFilters={ onPriceFilters }
                                                 onArgumentFilters={ onArgumentFilters }
                                                 onOrderPriceFilters={ onOrderPriceFilters } />

                                   </Stack>
                            </Scrollbar>
                     </Drawer>
              </>
       );
}

TourFilters.propTypes = {
       open: PropTypes.bool,
       onOpen: PropTypes.func,
       onClose: PropTypes.func,
       //   canReset: PropTypes.bool,
       //   dateError: PropTypes.bool,
       //   filters: PropTypes.object,
       //   onFilters: PropTypes.func,
       onPriceFilters: PropTypes.func,
       onArgumentFilters: PropTypes.func,
       onOrderPriceFilters: PropTypes.func,
       //   serviceOptions: PropTypes.array,
       //   tourGuideOptions: PropTypes.array,
       //   destinationOptions: PropTypes.array,
};
