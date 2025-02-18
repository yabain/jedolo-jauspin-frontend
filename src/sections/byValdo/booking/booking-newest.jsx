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

// ----------------------------------------------------------------------

export default function BookingNewest( { title, subheader, list, sx, ...other } )
{

       const theme = useTheme();

       const carousel = useCarousel( {
              slidesToShow: 4,
              autoplay: true,  // Active le défilement automatique
              autoplaySpeed: 2500,  // Temps d'affichage de chaque slide (en ms)
              responsive: [
                     {
                            breakpoint: theme.breakpoints.values.lg,
                            settings: {
                                   slidesToShow: 3,
                            },
                     },
                     {
                            breakpoint: theme.breakpoints.values.md,
                            settings: {
                                   slidesToShow: 2,
                            },
                     },
                     {
                            breakpoint: theme.breakpoints.values.sm,
                            settings: {
                                   slidesToShow: 1,
                            },
                     },
              ],
       } );

       return (
              <Box ref={ tabsRef } sx={ { py: 2, ...sx } } { ...other }>
                     <CardHeader
                            title={ title }
                            subheader={ subheader }
                            action={ <CarouselArrows onNext={ carousel.onNext } onPrev={ carousel.onPrev } /> }
                            sx={ {
                                   p: 0,
                                   mb: 3,
                            } }
                     />

                     <Carousel sx={ { width: "100px" } } ref={ carousel.carouselRef } { ...carousel.carouselSettings }>
                            { list.map( ( item ) => (
                                   <BookingItem key={ item.id } item={ item } />
                            ) ) }
                     </Carousel>

              </Box>
       );
}

BookingNewest.propTypes = {
       list: PropTypes.array,
       subheader: PropTypes.string,
       sx: PropTypes.object,
       title: PropTypes.string,
};

// ----------------------------------------------------------------------

function BookingItem( { item } )
{

       const { avatarUrl, name, createdAt, guests, coverUrl, price, isHot } = item;


       dayjs.extend( relativeTime );
       dayjs.locale( 'fr' );

       return (
              <Paper
                     sx={ {
                            mr: 3,
                            borderRadius: 2,
                            position: 'relative',
                            bgcolor: 'background.neutral',
                     } }
              >
                     <Box sx={ { p: 1, position: 'relative' } }>
                            <Image alt={ coverUrl } src={ coverUrl } ratio="1/1" sx={ { borderRadius: 1.5 } } />
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
                            { isHot && '🔥' } ${ price }
                     </Label>


              </Paper>
       );
}

BookingItem.propTypes = {
       item: PropTypes.object,
};
