import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ComponentHero from 'src/sections/byTemplate/_examples/component-hero';

import ComponentBlock from '../component-block';

// ----------------------------------------------------------------------

const COLORS = [ 'default', 'primary', 'secondary', 'info', 'success', 'warning', 'error' ];

const STATUS = [ 'alway', 'online', 'busy', 'offline' ];

// ----------------------------------------------------------------------

export default function BadgeView()
{
       return (
              <>
                     <ComponentHero>
                            <CustomBreadcrumbs
                                   heading="Badge"
                                   links={ [
                                          {
                                                 name: 'Components',
                                                 href: paths.components,
                                          },
                                          { name: 'Badge' },
                                   ] }
                                   moreLink={ [ 'https://mui.com/components/badges' ] }
                            />
                     </ComponentHero>

                     <Container sx={ { my: 10 } }>
                            <Masonry columns={ { xs: 1, md: 2 } } spacing={ 3 }>
                                   <ComponentBlock title="Basic">
                                          { COLORS.map( ( color ) => (
                                                 <Badge key={ color } badgeContent={ 4 } color={ color }>
                                                        <Iconify icon="fluent:mail-24-filled" width={ 24 } />
                                                 </Badge>
                                          ) ) }
                                   </ComponentBlock>

                                   <ComponentBlock title="Maximum value">
                                          <Badge
                                                 badgeContent={ 99 }
                                                 color="error"
                                                 children={ <Iconify icon="fluent:mail-24-filled" width={ 24 } /> }
                                          />
                                          <Badge
                                                 badgeContent={ 100 }
                                                 color="error"
                                                 children={ <Iconify icon="fluent:mail-24-filled" width={ 24 } /> }
                                          />
                                          <Badge
                                                 badgeContent={ 1000 }
                                                 max={ 999 }
                                                 color="error"
                                                 children={ <Iconify icon="fluent:mail-24-filled" width={ 24 } /> }
                                          />
                                   </ComponentBlock>

                                   <ComponentBlock title="Dot badge">
                                          <Badge color="info" variant="dot">
                                                 <Iconify icon="fluent:mail-24-filled" width={ 24 } />
                                          </Badge>

                                          <Badge color="info" variant="dot">
                                                 <Typography>Typography</Typography>
                                          </Badge>
                                   </ComponentBlock>

                                   <ComponentBlock title="Badge overlap">
                                          <Badge color="info" badgeContent=" ">
                                                 <Box sx={ { width: 40, height: 40, bgcolor: 'warning.main' } } />
                                          </Badge>

                                          <Badge color="info" badgeContent=" " variant="dot">
                                                 <Box sx={ { width: 40, height: 40, bgcolor: 'warning.main' } } />
                                          </Badge>

                                          <Badge color="info" overlap="circular" badgeContent=" ">
                                                 <Box
                                                        sx={ {
                                                               width: 40,
                                                               height: 40,
                                                               borderRadius: '50%',
                                                               bgcolor: 'warning.main',
                                                        } }
                                                 />
                                          </Badge>

                                          <Badge color="info" overlap="circular" badgeContent=" " variant="dot">
                                                 <Box
                                                        sx={ {
                                                               width: 40,
                                                               height: 40,
                                                               borderRadius: '50%',
                                                               bgcolor: 'warning.main',
                                                        } }
                                                 />
                                          </Badge>
                                   </ComponentBlock>

                                   <ComponentBlock title="Status">
                                          { STATUS.map( ( status ) => (
                                                 <Badge
                                                        key={ status }
                                                        variant={ status }
                                                        anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
                                                 >
                                                        <Box
                                                               sx={ {
                                                                      width: 40,
                                                                      height: 40,
                                                                      borderRadius: '50%',
                                                                      bgcolor: 'grey.400',
                                                               } }
                                                        />
                                                 </Badge>
                                          ) ) }
                                   </ComponentBlock>
                            </Masonry>
                     </Container>
              </>
       );
}
