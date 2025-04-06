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
import { request } from 'src/store/annonces/updateAnnonce/reducer';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export default function BookingNewest({ title, subheader, list, sx, ...other }) {
       // console.table( list.map( item => ( { sponsored: item.sponsored } ) ) );

       const theme = useTheme();

       const carousel = useCarousel({
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
       });

       return (
              <Box ref={tabsRef} sx={{
                     py: 2, ...sx,
                     padding: "11px 0",
                     borderRadius: "20px",
              }} {...other}>
                     <CardHeader
                            title={title}
                            subheader={subheader}
                            action={<CarouselArrows onNext={carousel.onNext} onPrev={carousel.onPrev} />}
                            sx={{
                                   p: 0,
                                   mb: 3,
                            }}
                     />
                     {/* 
                     <Carousel sx={ { width: "100px" } } ref={ carousel.carouselRef } { ...carousel.carouselSettings }>
                            { ( () =>
                            {
                                   console.table( list.map( item => ( { sponsored: item.sponsored } ) ) ); // Log pour débogage
                                   return list.map( ( item ) => (
                                          <BookingItem key={ item.id } item={ item } />
                                   ) );
                            } )() }
                     </Carousel> */}

                     <Carousel sx={{ width: "100px" }} ref={carousel.carouselRef} {...carousel.carouselSettings}>
                            {(() => {
                                   // console.table( list.map( item => ( { sponsored: item.sponsored } ) ) ); // Log pour débogage

                                   // Créer un tableau avec 4 éléments au minimum
                                   const itemsToRender = [...list];
                                   while (itemsToRender.length < 4) {
                                          itemsToRender.push({ id: `empty-${itemsToRender.length}`, isEmpty: true });
                                   }

                                   return itemsToRender.map((item) => (
                                          item.isEmpty
                                                 ? <div key={item.id} style={{ width: "100%", visibility: "hidden" }} />
                                                 : <BookingItem key={item.id} item={item} />
                                   ));
                            })()}
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

function BookingItem({ item }) {

       const { avatarUrl, name, createdAt, guests, coverUrl, price, sponsored } = item;

       // console.log( sponsored );

       const navigate = useNavigate();
       dayjs.extend(relativeTime);
       const dispatch = useDispatch()
       dayjs.locale('fr');

       const AnnonceClicked = () => {
              navigate('annonces/view', { state: { annonce: item } })

              const nbrView = item.nbrView !== undefined ? item.nbrView + 1 : 1
              dispatch(request({ ...item, nbrView }))
       }

       return (
              <Paper
                     onClick={() => AnnonceClicked()}
                     sx={{
                            cursor: "pointer",
                            mr: 3,
                            borderRadius: 2,
                            position: 'relative',
                            // bgcolor: 'background.neutral',
                            bgcolor: "rgb(255 192 203 / 18%)",
                     }}
              >
                     <Box sx={{ p: 1, position: 'relative' }}>
                            <Image alt={coverUrl} src={coverUrl} ratio="1/1" sx={{ borderRadius: 1.5 }} />
                            {sponsored && sponsored !== '' && <Label
                                   variant="filled"
                                   color={sponsored === "top" ? "primary" : "info"}
                                   sx={{
                                          left: 16,
                                          zIndex: 9,
                                          bottom: 16,
                                          position: 'absolute',
                                   }}
                            >
                                   {sponsored}
                            </Label>}
                     </Box>

                     <Stack
                            spacing={2}
                            sx={{
                                   px: 2,
                                   pb: 1,
                                   pt: 2.5,
                            }}
                     >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                   <Avatar alt={name} src={avatarUrl} />
                                   <ListItemText
                                          primary={name}
                                          primaryTypographyProps={{
                                                 noWrap: true,
                                                 variant: "subtitle2"  // ← équivalent au style par défaut

                                          }}
                                          secondary={fDateTime(createdAt)}
                                          secondaryTypographyProps={{
                                                 mt: 0.5,
                                                 component: 'span',
                                                 typography: 'caption',
                                                 color: 'text.disabled',
                                          }}
                                   />
                            </Stack>

                            <Stack
                                   rowGap={1.5}
                                   columnGap={3}
                                   flexWrap="wrap"
                                   direction="row"
                                   alignItems="center"
                                   justifyContent="space-between"
                                   sx={{ color: 'text.secondary', typography: 'caption' }}
                            >
                                   <Stack direction="row" alignItems="center" justifyContent="space-between" width={1}>
                                          <Box alignItems="center" display="flex">
                                                 <Iconify width={16} icon="solar:calendar-date-bold" sx={{ mr: 0.5, flexShrink: 0 }} />
                                                 {dayjs(createdAt).fromNow()}
                                          </Box>


                                          <Typography variant='button' >
                                                 {item.city}
                                          </Typography>
                                   </Stack>

                                   <Stack

                                          flexGrow={1}
                                          direction="row"
                                          flexWrap="nowrap"
                                          justifyContent="space-between"
                                          sx={{
                                                 typography: 'caption',
                                                 color: 'text.disabled',
                                          }}
                                   >
                                          <Stack direction="row" alignItems="center" >
                                                 <Iconify icon="eva:message-circle-fill" width={16} />
                                                 {fShortenNumber(item.nbrComment || 0)}
                                          </Stack>

                                          <Stack direction="row" alignItems="center" sx={{ mr: 1, ml: 1 }}>
                                                 <Iconify icon="solar:eye-bold" width={16} />
                                                 {fShortenNumber(item.nbrView || 0)}
                                          </Stack>

                                          <Stack direction="row" alignItems="center" >
                                                 <Iconify icon="mdi:star-rate" width={16} />
                                                 {/* <Iconify icon="solar:share-bold" width={ 16 } sx={ { mr: 0.5 } } /> */}
                                                 {fShortenNumber(item.rating || 0)} / 5
                                          </Stack>
                                   </Stack>


                            </Stack>
                     </Stack>

                     <Label
                            variant="filled"
                            sx={{
                                   left: 16,
                                   zIndex: 9,
                                   top: 16,
                                   position: 'absolute',
                            }}
                     >
                            {price} FCFA
                     </Label>


              </Paper>
       );
}

BookingItem.propTypes = {
       item: PropTypes.object,
};
