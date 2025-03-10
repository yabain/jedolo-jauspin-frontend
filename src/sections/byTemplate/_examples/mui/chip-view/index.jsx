import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ComponentHero from 'src/sections/byTemplate/_examples/component-hero';

import Chip from './chip';

// ----------------------------------------------------------------------

export default function ChipView()
{
       return (
              <>
                     <ComponentHero>
                            <CustomBreadcrumbs
                                   heading="Chip"
                                   links={ [
                                          {
                                                 name: 'Components',
                                                 href: paths.components,
                                          },
                                          { name: 'Chip' },
                                   ] }
                                   moreLink={ [ 'https://mui.com/components/chips' ] }
                            />
                     </ComponentHero>

                     <Container sx={ { my: 10 } }>
                            <Box
                                   gap={ 3 }
                                   display="grid"
                                   gridTemplateColumns={ {
                                          xs: 'repeat(1, 1fr)',
                                          md: 'repeat(3, 1fr)',
                                   } }
                            >
                                   <Card>
                                          <CardHeader title="Filled" />
                                          <CardContent>
                                                 <Chip />
                                          </CardContent>
                                   </Card>

                                   <Card>
                                          <CardHeader title="Outlined" />
                                          <CardContent>
                                                 <Chip variant="outlined" />
                                          </CardContent>
                                   </Card>

                                   <Card>
                                          <CardHeader title="Soft" />
                                          <CardContent>
                                                 <Chip variant="soft" />
                                          </CardContent>
                                   </Card>
                            </Box>
                     </Container>
              </>
       );
}
