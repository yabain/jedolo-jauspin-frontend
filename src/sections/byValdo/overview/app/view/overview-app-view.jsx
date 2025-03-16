
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { Box, display } from '@mui/system';
import { useMockedUser } from 'src/hooks/use-mocked-user';

import { SeoIllustration } from 'src/assets/illustrations';
import { PostListView } from 'src/sections/byValdo/blog/view';
import BookingNewest from 'src/sections/byValdo/booking/booking-newest';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled, _bookingNew } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import { handleFilterByTownSelectedRef, selectedTownTabRef } from 'src/1data/annonces/ref';
import TownTabs from 'src/sections/byValdo/blog/view/TownTabs';

import { Typography } from '@mui/material';
import AppWelcome from '../app-welcome';

// ----------------------------------------------------------------------

export default function Home()
{



       const theme = useTheme();
       const { user } = useMockedUser();
       const settings = useSettingsContext();
       const annonceFromStore = useSelector( ( state ) => state.usersAnnonces.data )
       const HeadlineAnnouncement = annonceFromStore.filter( annonce => annonce.aLaUne );
       // if ( HeadlineAnnouncement.length > 0 ) console.log( "Il y a des annonces à la une :", HeadlineAnnouncement );






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


                            <Grid xs={ 12 } md={ 12 } pl="0px" pr="0px">
                                   <Container maxWidth={ settings.themeStretch ? false : 'xl' } sx={ { pl: { sm: "0", xs: "0", md: "0" }, pr: { sm: "0", xs: "0", md: "0" } } }>





                                          <TownTabs
                                                 // selectedTownTab={ selectedTownTabRef.current }
                                                 handleFilterByTownSelected={ handleFilterByTownSelectedRef.current }
                                          />




                                          <Grid container spacing={ 0 }>



                                                 <Grid xs={ 12 } md={ 12 } pl="0" pr="0">
                                                        <BookingNewest title="Annonces à la une" subheader="12 Nouvelles Annonces" list={ HeadlineAnnouncement } />
                                                 </Grid>







                                          </Grid>
                                   </Container>

                            </Grid>


                            <Grid xs={ 12 } md={ 12 } lg={ 12 }>
                                   <PostListView />
                            </Grid>






                     </Grid>
              </Container>
       );
}
