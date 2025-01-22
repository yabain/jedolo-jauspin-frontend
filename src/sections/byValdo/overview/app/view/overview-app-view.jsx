import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { SeoIllustration } from 'src/assets/illustrations';
import { PostListView } from 'src/sections/byValdo/blog/view';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import { Typography } from '@mui/material';
import AppWelcome from '../app-welcome';
import SidebarFilter from '../sidebar-filter';

// ----------------------------------------------------------------------

export default function Home()
{
       const { user } = useMockedUser();

       const theme = useTheme();

       const settings = useSettingsContext();





       return (
              <Container maxWidth={ settings.themeStretch ? false : 'xl' }>
                     <Grid container spacing={ 3 }>
                            <Grid xs={ 12 } md={ 12 }>
                                   <AppWelcome
                                          title={ `Welcome back 👋 \n ${ user?.displayName }` }
                                          description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
                                          img={ <SeoIllustration /> }
                                          action={
                                                 <Button variant="contained" color="primary">
                                                        Go Now
                                                 </Button>
                                          }
                                   />
                            </Grid>





                            <Grid xs={ 12 } md={ 10 } lg={ 10 }>
                                   <PostListView />
                            </Grid>



                            <Grid xs={ 2 } lg={ 2 }>
                                   <Button variant="outlined" color="primary">
                                          supprimer les filtres
                                   </Button>

                                   <SidebarFilter />


                            </Grid>


                     </Grid>
              </Container>
       );
}
