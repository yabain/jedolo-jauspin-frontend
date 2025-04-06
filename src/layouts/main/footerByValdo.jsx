import
{
       Box,
       Grid,
       Typography,
       IconButton,
       TextField,
       Button,
       Link,
       List,
       ListItem,
       ListItemText,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { Container } from '@mui/system';
import { useSettingsContext } from 'src/components/settings';

export default function Footer()
{


       const settings = useSettingsContext();
       return (

              <Container maxWidth={ settings.themeStretch ? false : '100%' } sx={ { mt: 'auto', p: '0px !important' } } >


                     <Container maxWidth={ settings.themeStretch ? false : '100%' } sx={ { bgcolor: "success.darker", mt: 12 } } >
                            <Box sx={ { color: '#fff', pt: 5 } }>


                                   {/* Footer Content */ }
                                   <Box sx={ { pt: 5, pb: 5 } }>
                                          <Grid container spacing={ 4 }>
                                                 {/* Logo & Text */ }
                                                 <Grid item xs={ 12 } md={ 4 }>

                                                        <Typography variant="body2" sx={ { color: 'grey.100', mb: 2, mt: 3 } }>
                                                               Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                        </Typography>
                                                        <Typography variant="h6" gutterBottom>Follow us</Typography>
                                                        <Box>
                                                               <IconButton sx={ { backgroundColor: '#3B5998', color: '#fff', mr: 1 } }>
                                                                      <Icon icon="mdi:facebook" />
                                                               </IconButton>
                                                               <IconButton sx={ { backgroundColor: '#55ACEE', color: '#fff', mr: 1 } }>
                                                                      <Icon icon="mdi:twitter" />
                                                               </IconButton>
                                                               <IconButton sx={ { backgroundColor: '#DD4B39', color: '#fff' } }>
                                                                      <Icon icon="mdi:google" />
                                                               </IconButton>
                                                        </Box>
                                                 </Grid>

                                                 {/* Useful Links */ }
                                                 <Grid item xs={ 12 } md={ 4 }>
                                                        <Typography variant="h6" sx={ { mb: 3, position: 'relative' } }>
                                                               Useful Links
                                                               <Box sx={ {
                                                                      position: 'absolute', bottom: -10, left: 0,
                                                                      width: 50, height: 2,
                                                               } } bgcolor="success.main" />
                                                        </Typography>
                                                        <Grid container spacing={ 1 }>
                                                               { [
                                                                      "Home", "About", "Services",
                                                                      "About us", "Contact us", "Latest News"
                                                               ].map( ( text, i ) => (
                                                                      <Grid item xs={ 6 } key={ i }>
                                                                             <Typography component={ Link } href="#" sx={ { color: 'grey.400', textTransform: 'capitalize', '&:hover': { color: 'success.main' } } }>
                                                                                    { text }
                                                                             </Typography>
                                                                      </Grid>
                                                               ) ) }
                                                        </Grid>
                                                 </Grid>

                                                 {/* Subscribe */ }
                                                 <Grid item xs={ 12 } md={ 4 }>
                                                        <Typography variant="h6" sx={ { mb: 3, position: 'relative' } }>
                                                               Subscribe
                                                               <Box sx={ {
                                                                      position: 'absolute', bottom: -10, left: 0,
                                                                      width: 50, height: 2,
                                                               } } bgcolor="success.main" />
                                                        </Typography>
                                                        <Typography variant="body2" sx={ { color: 'grey.500', mb: 2 } }>
                                                               Don’t miss to subscribe to our new feeds, kindly fill the form below.
                                                        </Typography>
                                                        <Box sx={ { position: 'relative' } }>
                                                               <TextField
                                                                      fullWidth
                                                                      placeholder="Email Address"
                                                                      variant="filled"
                                                                      sx={ {
                                                                             input: { p: 1.5 },

                                                                      } }
                                                               />
                                                               <Button
                                                                      variant="contained"
                                                                      color='success'
                                                                      sx={ {
                                                                             position: 'absolute',
                                                                             top: 0,
                                                                             right: 0,
                                                                             height: '100%',

                                                                             borderRadius: 0,
                                                                             px: 3
                                                                      } }
                                                               >
                                                                      <Icon icon="mdi:send" style={ { transform: 'rotate(-6deg)', color: '#fff' } } />
                                                               </Button>
                                                        </Box>
                                                 </Grid>
                                          </Grid>
                                   </Box>

                                   {/* Copyright */ }
                                   <Box sx={ { py: 3 } }>
                                          <Grid container justifyContent="space-between" alignItems="center">
                                                 <Grid item xs={ 12 } md={ 6 }>
                                                        <Typography variant="body2" sx={ { color: '#878787' } }>
                                                               © 2025 All Right Reserved
                                                        </Typography>
                                                 </Grid>
                                                 <Grid item xs={ 12 } md={ 6 }>
                                                        <Box sx={ { textAlign: { xs: 'left', md: 'right' } } }>
                                                               <List sx={ { display: 'inline-flex', p: 0 } }>
                                                                      { [ 'Home', 'Terms', 'Privacy', 'Policy', 'Contact' ].map( ( item, index ) => (
                                                                             <ListItem key={ index } sx={ { px: 1, width: 'auto' } }>
                                                                                    <Link href="#" sx={ { color: '#878787', fontSize: 14, '&:hover': { color: '#ff5e14' } } }>
                                                                                           { item }
                                                                                    </Link>
                                                                             </ListItem>
                                                                      ) ) }
                                                               </List>
                                                        </Box>
                                                 </Grid>
                                          </Grid>
                                   </Box>
                            </Box>
                     </Container >


              </Container >
       );
};

