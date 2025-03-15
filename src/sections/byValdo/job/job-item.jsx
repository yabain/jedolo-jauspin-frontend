import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function JobItem( { job, onView, onEdit, onDelete } )
{
       const popover = usePopover();

       const { id, anonnceName, sponsorAnnonce, aLaUne, company, date, signalerEmail, comment } =
              job;

       return (
              <>
                     <Card>
                            <IconButton onClick={ popover.onOpen } sx={ { position: 'absolute', top: 8, right: 8 } }>
                                   <Iconify icon="eva:more-vertical-fill" />
                            </IconButton>

                            <Stack sx={ { p: 3, pb: 2 } }>
                                   <Avatar
                                          alt={ company?.name }
                                          src={ company?.logo }
                                          variant="rounded"
                                          sx={ { width: 48, height: 48, mb: 2 } }
                                   />

                                   <ListItemText
                                          sx={ { mb: 1 } }
                                          primary={
                                                 <Link component={ RouterLink } href={ paths.dashboard.job.details( id ) } color="inherit">
                                                        { anonnceName }
                                                 </Link>
                                          }
                                          secondary={ `signale le : ${ fDate( date ) }` }
                                          primaryTypographyProps={ {
                                                 typography: 'subtitle1',
                                          } }
                                          secondaryTypographyProps={ {
                                                 mt: 1,
                                                 component: 'span',
                                                 typography: 'caption',
                                                 color: 'text.disabled',
                                          } }
                                   />

                                   <Stack

                                          direction="column"
                                          justifyContent="center"
                                          sx={ { color: sponsorAnnonce ? 'primary.main' : 'error.main', typography: 'caption' } }
                                   >

                                          <Box display="flex" alignItems="center">
                                                 <Box mr={ 1 }><Label color={ aLaUne ? "info" : "error" } >A la Une : { aLaUne ? 'OUI' : 'NON' }</Label></Box>
                                                 <Box display="flex" alignItems="center">
                                                        <Iconify width={ 16 } icon="solar:users-group-rounded-bold" />

                                                        { sponsorAnnonce && `Sponsoriser` }
                                                        { !sponsorAnnonce && `Non sponsoriser` }
                                                 </Box>



                                          </Box>

                                          <Box mt={ 2 }  ><Typography variant='caption' color="text.disabled" >Raison du signalement</Typography></Box>

                                          <Typography
                                                 variant="body2"
                                                 sx={ {
                                                        color: 'black',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                 } }
                                          >
                                                 { comment }
                                          </Typography>


                                   </Stack>
                            </Stack>

                            <Divider sx={ { borderStyle: 'dashed' } } />

                            <Box rowGap={ 1.5 } display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={ { p: 3 } }>
                                   { [

                                          {
                                                 label: signalerEmail,
                                                 icon: <Iconify width={ 16 } icon="solar:user-rounded-bold" sx={ { flexShrink: 0 } } />,
                                          },
                                   ].map( ( item, index ) => (
                                          <Stack
                                                 key={ index }
                                                 spacing={ 0.5 }
                                                 flexShrink={ 0 }
                                                 direction="column"
                                                 sx={ { color: 'text.disabled', minWidth: 0 } }
                                          >
                                                 signaler par :
                                                 <Box display="flex" alignItems="center" color="info.main">
                                                        { item.icon }
                                                        <Typography variant="caption" >
                                                               { item.label }
                                                        </Typography>
                                                 </Box>
                                          </Stack>
                                   ) ) }
                            </Box>
                     </Card>

                     <CustomPopover
                            open={ popover.open }
                            onClose={ popover.onClose }
                            arrow="right-top"
                            sx={ { width: 140 } }
                     >
                            <MenuItem
                                   onClick={ () =>
                                   {
                                          popover.onClose();
                                          onView();
                                   } }
                            >
                                   <Iconify icon="solar:eye-bold" />
                                   View
                            </MenuItem>

                            <MenuItem
                                   onClick={ () =>
                                   {
                                          popover.onClose();
                                          onEdit();
                                   } }
                            >
                                   <Iconify icon="solar:pen-bold" />
                                   Edit
                            </MenuItem>

                            <MenuItem
                                   onClick={ () =>
                                   {
                                          popover.onClose();
                                          onDelete();
                                   } }
                                   sx={ { color: 'error.main' } }
                            >
                                   <Iconify icon="solar:trash-bin-trash-bold" />
                                   Delete
                            </MenuItem>
                     </CustomPopover>
              </>
       );
}

JobItem.propTypes = {
       job: PropTypes.object,
       onDelete: PropTypes.func,
       onEdit: PropTypes.func,
       onView: PropTypes.func,
};
