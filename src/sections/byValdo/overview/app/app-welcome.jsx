import PropTypes from 'prop-types';

import { FormControlLabel, FormGroup, Grid, Switch } from '@mui/material';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';


import ProductTableToolbar from './product-table-toolbar';

// ----------------------------------------------------------------------

export default function AppWelcome( { title, description, action, img, ...other } )
{
       const theme = useTheme();



       const PUBLISH_OPTIONS = [
              { value: 'published', label: 'Published' },
              { value: 'draft', label: 'Draft' },
       ];

       const PRODUCT_STOCK_OPTIONS = [
              { value: 'in stock', label: 'In stock' },
              { value: 'low stock', label: 'Low stock' },
              { value: 'out of stock', label: 'Out of stock' },
       ];

       return (
              <Stack
                     flexDirection={ { xs: 'column', md: 'row' } }
                     sx={ {
                            ...bgGradient( {
                                   direction: '135deg',
                                   startColor: alpha( theme.palette.primary.light, 0.2 ),
                                   endColor: alpha( theme.palette.primary.main, 0.2 ),
                            } ),
                            height: { md: 1 },
                            borderRadius: 2,
                            position: 'relative',
                            color: 'primary.darker',
                            backgroundColor: 'common.white',
                     } }
                     { ...other }
              >
                     <Stack
                            flexGrow={ 1 }
                            justifyContent="center"
                            alignItems={ { xs: 'center', md: 'flex-start' } }
                            sx={ {
                                   p: {
                                          xs: theme.spacing( 5, 3, 0, 3 ),
                                          md: theme.spacing( 2 ),
                                   },
                                   textAlign: { xs: 'center', md: 'left' },
                            } }
                     >
                            <Typography variant="h4" sx={ { mb: 3, whiteSpace: 'pre-line' } }>
                                   { title }
                            </Typography>


                            <ProductTableToolbar
                                   // filters={ filters }
                                   // onFilters={ handleFilters }
                                   stockOptions={ PRODUCT_STOCK_OPTIONS }
                                   publishOptions={ PUBLISH_OPTIONS }
                            />

                            {/* <Grid container  >
                                   <Grid item xs={ 2 } md={ 2 }>

                                          <FormGroup>
                                                 <FormControlLabel
                                                        key="primary"
                                                        control={ <Switch defaultChecked color="primary" /> }
                                                        label="primary"
                                                        sx={ { textTransform: 'capitalize' } }
                                                 />


                                          </FormGroup>
                                   </Grid>
                                   <Grid item xs={ 2 } md={ 2 }>

                                          <FormGroup>
                                                 <FormControlLabel
                                                        key="primary"
                                                        control={ <Switch defaultChecked color="primary" /> }
                                                        label="primary"
                                                        sx={ { textTransform: 'capitalize' } }
                                                 />


                                          </FormGroup>
                                   </Grid>
                                   <Grid item xs={ 2 } md={ 2 }>

                                          <FormGroup>
                                                 <FormControlLabel
                                                        key="primary"
                                                        control={ <Switch defaultChecked color="primary" /> }
                                                        label="primary"
                                                        sx={ { textTransform: 'capitalize' } }
                                                 />


                                          </FormGroup>
                                   </Grid>
                                   <Grid item xs={ 2 } md={ 2 }>

                                          <FormGroup>
                                                 <FormControlLabel
                                                        key="primary"
                                                        control={ <Switch defaultChecked color="primary" /> }
                                                        label="primary"
                                                        sx={ { textTransform: 'capitalize' } }
                                                 />


                                          </FormGroup>
                                   </Grid>

                            </Grid> */}


                            {/* <Typography
                                   variant="body2"
                                   sx={ {
                                          opacity: 0.8,
                                          maxWidth: 360,
                                          mb: { xs: 3, xl: 5 },
                                   } }
                            >
                                   { description }
                            </Typography>

                            { action && action } */}
                     </Stack>

                     { img && (
                            <Stack
                                   component="span"
                                   justifyContent="center"
                                   sx={ {
                                          p: { xs: 5, md: 3 },
                                          maxWidth: 360,
                                          mx: 'auto',
                                   } }
                            >
                                   { img }
                            </Stack>
                     ) }
              </Stack>
       );
}

AppWelcome.propTypes = {
       img: PropTypes.node,
       action: PropTypes.node,
       title: PropTypes.string,
       description: PropTypes.string,
};
