import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/auth/hooks';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import Iconify from 'src/components/iconify';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import { Skeleton } from '@mui/material';


import { fNumber } from 'src/utils/format-number';

import { request } from 'src/store/annonces/updateAnnonce/reducer';
import { ProductListView } from '../product/view';

// ----------------------------------------------------------------------

export default function ProfileHome({ isFulled, dataGet }) {
       const fileRef = useRef(null);


       console.log('data get', dataGet);



       const { user } = useAuthContext()


       const handleAttach = () => {
              if (fileRef.current) {
                     fileRef.current.click();
              }
       };



       const _socials = [
              {
                     value: 'facebook',
                     name: 'FaceBook',
                     icon: 'eva:facebook-fill',
                     color: '#1877F2',
                     path: '',
              },
              {
                     value: 'instagram',
                     name: 'Instagram',
                     icon: 'ant-design:instagram-filled',
                     color: '#E02D69',
                     path: '',
              },
              {
                     value: 'twitter',
                     name: 'Twitter',
                     icon: 'eva:twitter-fill',
                     color: '#00AAEC',
                     path: ' ',
              },
       ];

       const location = useLocation();
       const { data } = location.state || {};

       console.log(data, 'dataaaaaaaaaaaaaaaaa');

       // const dataGet = {

       //        age: data !== undefined ? data.owner.age || 0 : user.age,
       //        prix: data !== undefined ? data.owner.price || 0 : user.price || 0,
       //        email: data !== undefined ? data.owner.email || '' : user?.email,
       //        city: data !== undefined ? data.owner.city || '' : user.city,
       //        localisation: data !== undefined ? data.owner.location || '' : user.location,
       //        about: data !== undefined ? data.owner.about : user.about,
       //        country: data !== undefined ? data.owner.country : user.coutry,
       // }




       const navigate = useNavigate();
       const dispatch = useDispatch()
       const AnnonceClicked = (item) => {
              navigate('/home/annonces/view', { state: { annonce: item } })

              const nbrView = item.nbrView !== undefined ? item.nbrView + 1 : 1
              dispatch(request({ ...item, nbrView }))
       }


       const renderFollows = (
              <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
                     <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                     >
                            {dataGet.age !== 0 && (<Stack width={1}>
                                   {dataGet.age}
                                   <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
                                          Age
                                   </Box>
                            </Stack>)}

                            {/* {dataGet.prix !== 0 && (<Stack width={1}>
                                   {fNumber(dataGet.prix)}
                                   <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
                                          Prix minimum
                                   </Box>
                            </Stack>)} */}
                     </Stack>
              </Card>
       );

       const renderAbout = (
              <Card>
                     <CardHeader title="A propos" />

                     <Stack spacing={2} sx={{ p: 3 }}>
                            <Box sx={{ typography: 'body2' }}>{dataGet.about}</Box>


                            <Stack direction="row" sx={{ typography: 'body2' }}>
                                   <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
                                   {dataGet.email}
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                   <Iconify icon="mingcute:location-fill" width={24} />

                                   <Box sx={{ typography: 'body2' }}>

                                          Pays {dataGet.country}

                                   </Box>
                            </Stack>


                            <Stack direction="row" spacing={2}>
                                   <Iconify icon="mingcute:location-fill" width={24} />

                                   <Box sx={{ typography: 'body2' }}>
                                          Ville  {dataGet.city}

                                   </Box>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                   <Iconify icon="mingcute:location-fill" width={24} />

                                   <Box sx={{ typography: 'body2' }}>

                                          Lieux  {dataGet.localisation}
                                   </Box>
                            </Stack>
                     </Stack>
              </Card>
       );

       const renderPostInput = (
              <Card sx={{ p: 3 }}>
                     <InputBase
                            multiline
                            fullWidth
                            rows={4}
                            placeholder="Share what you are thinking here..."
                            sx={{
                                   p: 2,
                                   mb: 3,
                                   borderRadius: 1,
                                   border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
                            }}
                     />

                     <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                                   <Fab size="small" color="inherit" variant="softExtended" onClick={handleAttach}>
                                          <Iconify icon="solar:gallery-wide-bold" width={24} sx={{ color: 'success.main' }} />
                                          Image/Video
                                   </Fab>

                                   <Fab size="small" color="inherit" variant="softExtended">
                                          <Iconify icon="solar:videocamera-record-bold" width={24} sx={{ color: 'error.main' }} />
                                          Streaming
                                   </Fab>
                            </Stack>

                            <Button variant="contained">Post</Button>
                     </Stack>

                     <input ref={fileRef} type="file" style={{ display: 'none' }} />
              </Card>
       );

       const renderSocials = (
              <Card>
                     <CardHeader title="Social" />

                     <Stack spacing={2} sx={{ p: 3 }}>
                            {_socials.map((link) => (
                                   <Stack
                                          key={link.name}
                                          spacing={2}
                                          direction="row"
                                          sx={{ wordBreak: 'break-all', typography: 'body2' }}
                                   >
                                          <Iconify
                                                 icon={link.icon}
                                                 width={24}
                                                 sx={{
                                                        flexShrink: 0,
                                                        color: link.color,
                                                 }}
                                          />
                                          <Link color="inherit">
                                                 {link.value === 'facebook' && link.path}
                                                 {link.value === 'instagram' && link.path}
                                                 {link.value === 'twitter' && link.path}
                                          </Link>
                                   </Stack>
                            ))}
                     </Stack>
              </Card>
       );

       return (
              <Grid container spacing={3}>

                     {isFulled && <> <Grid xs={12} md={4}>
                            <Stack spacing={3}>
                                   {renderFollows}

                                   {renderAbout}

                                   {/* { renderSocials } */}
                            </Stack>
                     </Grid>

                            <Grid xs={12} md={8}>
                                   <Stack spacing={3}>

                                          <ProductListView clickFromProfile={AnnonceClicked} />
                                   </Stack>
                            </Grid>
                     </>}


                     {!isFulled && <Grid md={12}> <Skeleton height='600px' />  </Grid>}

              </Grid>
       );
}

ProfileHome.propTypes = {
       isFulled: PropTypes.bool,
       dataGet: PropTypes.object
};
