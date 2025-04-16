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
import { useAuthContext } from 'src/auth/hooks';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { request, resetAfterRequest } from 'src/store/annonces/banAnnonce/reducer';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function JobItem({ job, onView, onEdit, onDelete }) {
       const popover = usePopover();
       const { user } = useAuthContext()
       const confirmOfBan = useBoolean();

       const { id, annonce, createdAt, owner, comment } = job;
       console.log(job);
       const dispatch = useDispatch()


       const { enqueueSnackbar } = useSnackbar();

       const banAnnouncement = () => {
              dispatch(request({ ...annonce }))
              console.log(annonce);

       }


       const isFulledBan = useSelector((state) => state.bannedUserAnnonce.isFulled);
       const isPendingBan = useSelector((state) => state.bannedUserAnnonce.isPending);

       useEffect(() => {



              if (!isPendingBan && isFulledBan) {
                     confirmOfBan.onFalse();


                     dispatch(resetAfterRequest())


                     enqueueSnackbar('Annonce Banni avec succes!');
                     confirmOfBan.onFalse();

              }

       }, [confirmOfBan, enqueueSnackbar, dispatch, isFulledBan, isPendingBan]);

       return (
              <>
                     <Card>
                            {user?.role === 'admin' && (<IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>

                                   <Iconify icon="eva:more-vertical-fill" />
                            </IconButton>)}

                            <Stack sx={{ p: 3, pb: 2 }}>
                                   <Avatar
                                          alt={annonce?.coverUrl}
                                          src={annonce?.coverUrl}
                                          variant="rounded"
                                          sx={{ width: 132, height: 132, mb: 2 }}
                                   />

                                   <ListItemText
                                          sx={{ mb: 1 }}
                                          primary={
                                                 <Link component={RouterLink} href={paths.dashboard.job.details(id)} color="inherit">
                                                        {annonce?.name}
                                                 </Link>
                                          }
                                          secondary={`signale le : ${fDate(createdAt)}`}
                                          primaryTypographyProps={{
                                                 typography: 'subtitle1',
                                          }}
                                          secondaryTypographyProps={{
                                                 mt: 1,
                                                 component: 'span',
                                                 typography: 'caption',
                                                 color: 'text.disabled',
                                          }}
                                   />

                                   <Stack

                                          direction="column"
                                          justifyContent="center"
                                          sx={{ color: annonce?.sponsored ? 'primary.main' : 'error.main', typography: 'caption' }}
                                   >

                                          <Box display="flex" alignItems="center">
                                                 <Box mr={1}><Label color={annonce?.aLaUne ? "info" : "error"} >A la Une : {annonce?.aLaUne ? 'OUI' : 'NON'}</Label></Box>
                                                 <Box display="flex" alignItems="center">
                                                        <Iconify width={16} icon="solar:users-group-rounded-bold" />

                                                        {annonce?.sponsored && `Sponsoriser`}
                                                        {!annonce?.sponsored && `Non sponsoriser`}
                                                 </Box>



                                          </Box>

                                          <Box mt={2}  ><Typography variant='caption' color="text.disabled" >Raison du signalement</Typography></Box>

                                          <Typography
                                                 variant="body2"
                                                 sx={{
                                                        color: 'black',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                 }}
                                          >
                                                 {comment}
                                          </Typography>


                                   </Stack>
                            </Stack>

                            <Divider sx={{ borderStyle: 'dashed' }} />

                            <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
                                   {[

                                          {
                                                 label: owner.email,
                                                 icon: <Iconify width={16} icon="solar:user-rounded-bold" sx={{ flexShrink: 0 }} />,
                                          },
                                   ].map((item, index) => (
                                          <Stack
                                                 key={index}
                                                 spacing={0.5}
                                                 flexShrink={0}
                                                 direction="column"
                                                 sx={{ color: 'text.disabled', minWidth: 0 }}
                                          >
                                                 signaler par :
                                                 <Box display="flex" alignItems="center" color="info.main">
                                                        {item.icon}
                                                        <Typography variant="caption" >
                                                               {item.label}
                                                        </Typography>
                                                 </Box>
                                          </Stack>
                                   ))}
                            </Box>
                     </Card>

                     <CustomPopover
                            open={popover.open}
                            onClose={popover.onClose}
                            arrow="right-top"
                            sx={{ width: 140 }}
                     >
                            <MenuItem
                                   onClick={() => {
                                          // popover.onClose();
                                          // onView();

                                          confirmOfBan.onTrue()
                                          console.log('banissement applr');


                                   }}
                            >
                                   <Iconify icon="solar:eye-bold" />
                                   Banir
                            </MenuItem>

                            {/* <MenuItem
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
                            </MenuItem> */}
                     </CustomPopover>








                     <ConfirmDialog
                            open={confirmOfBan.value}
                            onClose={confirmOfBan.onFalse}
                            title="Banissement de l'annonce"
                            content={
                                   <>
                                          voulez vous vraiment bannir cette annonce ?<br />
                                          cela entreinera la suspension du compte
                                   </>
                            }
                            action={
                                   <LoadingButton
                                          variant="contained"
                                          color="error"
                                          onClick={() => {
                                                 banAnnouncement();
                                          }}
                                          loading={isPendingBan}
                                   >
                                          Banir
                                   </LoadingButton>



                            }
                     />
              </>
       );
}

JobItem.propTypes = {
       job: PropTypes.object,
       onDelete: PropTypes.func,
       onEdit: PropTypes.func,
       onView: PropTypes.func,
};
