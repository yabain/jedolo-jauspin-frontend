import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { fDate, fTime } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

export default function PostItemHorizontal( { post } )
{

       const router = useRouter();
       const popover = usePopover();
       const navigate = useNavigate();
       const smUp = useResponsive( 'up', 'sm' );

       const {
              categorie,
              city,
              title,
              author,
              publish,
              coverUrl,
              price,
              totalViews,
              totalShares,
              totalComments,
              description,
       } = post;
       // console.log( post.createdAt );
       // console.log( categorie );


       const toconvert = Number( post.createdAt )
       const createdAt = fDate( toconvert )
       // console.log( post );

       return (
              <>
                     <Stack sx={ { cursor: "pointer" } } onClick={ () => navigate( 'annonces/view', { state: { annonce: post } } ) } component={ Card } direction="row" justifyContent="space-between">
                            <Stack
                                   sx={ {
                                          p: ( theme ) => theme.spacing( 2, 0, 2, 2 ),
                                   } }
                            >
                                   <Stack direction="row" alignItems="center" justifyContent="space-between" sx={ { mb: 2 } }>
                                          <Label variant="soft" color={ ( publish === 'published' && 'info' ) || 'default' }>
                                                 { categorie[ 0 ] }
                                          </Label>

                                          <Box component="span" sx={ { typography: 'caption', color: 'text.disabled' } }>

                                                 <Typography variant='button' >
                                                        { `${ price } fcfa` }
                                                 </Typography>

                                          </Box>
                                   </Stack>

                                   <Stack spacing={ 0 } flexGrow={ 1 }>
                                          <Link color="inherit" component={ RouterLink } href={ paths.dashboard.post?.details( title ) }>
                                                 <TextMaxLine variant="subtitle2" line={ 2 }>
                                                        { post.name }
                                                 </TextMaxLine>
                                          </Link>

                                          <TextMaxLine variant="body2" sx={ { color: 'text.secondary' } }>
                                                 { post.subDescription }
                                          </TextMaxLine>



                                   </Stack>

                                   <Stack direction="column" alignItems="center">
                                          {/* <IconButton color={ popover.open ? 'inherit' : 'default' } onClick={ popover.onOpen }>
                                                 <Iconify icon="eva:more-horizontal-fill" />
                                          </IconButton> */}

                                          <Box flexDirection="column" display="flex" alignItems="flex-start" width={ 1 } pb={ 1 }>
                                                 <Typography variant='button' >
                                                        { city[ 0 ] }
                                                 </Typography>
                                                 <Box component="span" sx={ { typography: 'caption', color: 'black' } }>
                                                        { createdAt }


                                                 </Box>
                                          </Box>
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
                                                        { fShortenNumber( totalComments ) }
                                                 </Stack>

                                                 <Stack direction="row" alignItems="center" sx={ { mr: 1, ml: 1 } }>
                                                        <Iconify icon="solar:eye-bold" width={ 16 } />
                                                        { fShortenNumber( totalViews ) }
                                                 </Stack>

                                                 <Stack direction="row" alignItems="center" >
                                                        <Iconify icon="mdi:star-rate" width={ 16 } />
                                                        {/* <Iconify icon="solar:share-bold" width={ 16 } sx={ { mr: 0.5 } } /> */ }
                                                        { fShortenNumber( totalShares ) }
                                                 </Stack>
                                          </Stack>
                                   </Stack>
                            </Stack>

                            {/* { !smUp && ( */ }
                            <Box
                                   sx={ {
                                          width: 180,
                                          height: 240,
                                          position: 'relative',
                                          flexShrink: 0,
                                          p: 1,
                                   } }
                            >
                                   <Avatar
                                          alt={ author.name }
                                          src={ author.avatarUrl }
                                          sx={ { position: 'absolute', top: 16, right: 16, zIndex: 9 } }
                                   />
                                   <Image alt={ title } src={ coverUrl } sx={ { height: 1, borderRadius: 1.5 } } />
                            </Box>
                            {/* ) } */ }
                     </Stack>

                     <CustomPopover
                            open={ popover.open }
                            onClose={ popover.onClose }
                            arrow="bottom-center"
                            sx={ { width: 140 } }
                     >
                            <MenuItem
                                   onClick={ () =>
                                   {
                                          popover.onClose();
                                          router.push( paths.dashboard.post.details( title ) );
                                   } }
                            >
                                   <Iconify icon="solar:eye-bold" />
                                   View
                            </MenuItem>

                            <MenuItem
                                   onClick={ () =>
                                   {
                                          popover.onClose();
                                          router.push( paths.dashboard.post.edit( title ) );
                                   } }
                            >
                                   <Iconify icon="solar:pen-bold" />
                                   Edit
                            </MenuItem>

                            <MenuItem
                                   onClick={ () =>
                                   {
                                          popover.onClose();
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

PostItemHorizontal.propTypes = {
       post: PropTypes.shape( {
              author: PropTypes.object,
              categorie: PropTypes.arrayOf( PropTypes.string ),
              city: PropTypes.arrayOf( PropTypes.string ),
              coverUrl: PropTypes.string,
              // createdAt: PropTypes.oneOfType( [ PropTypes.string, PropTypes.instanceOf( Date ) ] ),
              createdAt: PropTypes.number,
              description: PropTypes.string,
              publish: PropTypes.string,
              price: PropTypes.number,
              title: PropTypes.string,
              totalComments: PropTypes.number,
              totalShares: PropTypes.number,
              totalViews: PropTypes.number,
              subDescription: PropTypes.string,
              name: PropTypes.string

       } ),
};
