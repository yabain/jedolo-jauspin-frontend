import PropTypes from 'prop-types';


import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import { fDateTime } from 'src/utils/format-time';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';
import { width } from '@mui/system';
import moment from 'moment';
import 'moment/locale/fr';
import { fShortenNumber } from 'src/utils/format-number';
import { tabsRef } from 'src/1data/annonces/ref';
import { useNavigate } from 'react-router';

export default function BookingItem( { item } )
{

       const { avatarUrl, name, createdAt, guests, coverUrl, price, sponsored } = item;

       // console.log( sponsored );

       const navigate = useNavigate();



       dayjs.extend( relativeTime );
       dayjs.locale( 'fr' );

       return (
              <Paper
                     onClick={ () => navigate( 'annonces/view', { state: { annonce: item } } ) }
                     sx={ {
                            cursor: "pointer",
                            // mr: 3,
                            borderRadius: 2,
                            position: 'relative',
                            // bgcolor: 'background.neutral',
                            bgcolor: "rgb(255 192 203 / 18%)",
                     } }
              >
                     <Box sx={ { p: 1, position: 'relative' } }>
                            <Image alt={ coverUrl } src={ coverUrl } ratio="1/1" sx={ { borderRadius: 1.5 } } />
                            { sponsored && sponsored !== '' && <Label
                                   variant="filled"
                                   color={ sponsored === "top" ? "primary" : "info" }
                                   sx={ {
                                          left: 16,
                                          zIndex: 9,
                                          bottom: 16,
                                          position: 'absolute',
                                   } }
                            >
                                   { sponsored }
                            </Label> }
                     </Box>

                     <Stack
                            spacing={ 2 }
                            sx={ {
                                   px: 2,
                                   pb: 1,
                                   pt: 2.5,
                            } }
                     >
                            <Stack direction="row" alignItems="center" spacing={ 2 }>
                                   <Avatar alt={ name } src={ avatarUrl } />
                                   <ListItemText
                                          primary={ name }
                                          secondary={ fDateTime( createdAt ) }
                                          secondaryTypographyProps={ {
                                                 mt: 0.5,
                                                 component: 'span',
                                                 typography: 'caption',
                                                 color: 'text.disabled',
                                          } }
                                   />
                            </Stack>

                            <Stack
                                   rowGap={ 1.5 }
                                   columnGap={ 3 }
                                   flexWrap="wrap"
                                   direction="row"
                                   alignItems="center"
                                   justifyContent="space-between"
                                   sx={ { color: 'text.secondary', typography: 'caption' } }
                            >
                                   <Stack direction="row" alignItems="center" justifyContent="space-between" width={ 1 }>
                                          <Box alignItems="center" display="flex">
                                                 <Iconify width={ 16 } icon="solar:calendar-date-bold" sx={ { mr: 0.5, flexShrink: 0 } } />
                                                 { dayjs( createdAt ).fromNow() }
                                          </Box>


                                          <Typography variant='button' >
                                                 bafoussam
                                          </Typography>
                                   </Stack>

                                   <Stack

                                          flexGrow={ 1 }
                                          direction="row"
                                          flexWrap="nowrap"
                                          justifyContent="space-between"
                                          sx={ {
                                                 typography: 'caption',
                                                 color: 'text.disabled',
                                          } }
                                   >
                                          <Stack direction="row" alignItems="center" >
                                                 <Iconify icon="eva:message-circle-fill" width={ 16 } />
                                                 { fShortenNumber( item.totalComments ) }
                                          </Stack>

                                          <Stack direction="row" alignItems="center" sx={ { mr: 1, ml: 1 } }>
                                                 <Iconify icon="solar:eye-bold" width={ 16 } />
                                                 { fShortenNumber( item.totalViews ) }
                                          </Stack>

                                          <Stack direction="row" alignItems="center" >
                                                 <Iconify icon="mdi:star-rate" width={ 16 } />
                                                 {/* <Iconify icon="solar:share-bold" width={ 16 } sx={ { mr: 0.5 } } /> */ }
                                                 { fShortenNumber( item.totalShares ) }
                                          </Stack>
                                   </Stack>


                            </Stack>
                     </Stack>

                     <Label
                            variant="filled"
                            sx={ {
                                   left: 16,
                                   zIndex: 9,
                                   top: 16,
                                   position: 'absolute',
                            } }
                     >
                            { price } FCFA
                     </Label>




              </Paper>
       );
}


BookingItem.propTypes = {
       item: PropTypes.shape( {
              avatarUrl: PropTypes.string,
              name: PropTypes.string,
              createdAt: PropTypes.oneOfType( [
                     PropTypes.string,
                     PropTypes.number,
                     PropTypes.instanceOf( Date ),
              ] ),
              guests: PropTypes.number,
              coverUrl: PropTypes.string,
              price: PropTypes.number,
              sponsored: PropTypes.string,
              totalComments: PropTypes.number,
              totalViews: PropTypes.number,
              totalShares: PropTypes.number,
       } ).isRequired,
};