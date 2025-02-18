import PropTypes from 'prop-types';
import { useState, useCallback, useMemo } from 'react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { Autocomplete, Button, Chip, FormControlLabel, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { annonceFromStoreRef, postRef } from 'src/1data/annonces/ref';
import { HEADER } from 'src/layouts/config-layout';
import { globalFilterFnctCall } from 'src/1functions/annonces';

// ----------------------------------------------------------------------

export default function SidebarFilter( {
       filters,
       onFilters,
       stockOptions,
       onPriceFilters,
       publishOptions,
       onArgumentFilters,
       onOrderPriceFilters
} )
{





       const popover = usePopover();
       const [ minPrice, setValue ] = useState( "" );
       const [ stock, setStock ] = useState( stockOptions );
       const [ publish, setPublish ] = useState( stockOptions );
       const [ cityTable, setCityTable ] = useState( [ 'Bafoussam', 'yaoune', 'Douala', 'Bertoua' ] )






       const [ order, setOrder ] = useState( '' );
       const [ maxPrice, setmaxPrice ] = useState( "" );
       const [ citiesTab, setCitiesTab ] = useState( [] );
       const [ categoriesTab, setCategoriesTab ] = useState( [] );
       const cityOptions = useMemo( () => cityTable, [ cityTable ] );










       const handleCloseStock = useCallback( () =>
       {

              onFilters( 'stock', stock );


       }, [ onFilters, stock ] );











       const handleClosePublish = useCallback( () =>
       {

              onFilters( 'publish', publish );

       }, [ onFilters, publish ] );











       const handleChangeStock = useCallback( ( event ) =>
       {

              const { target: { value }, } = event;
              setStock( typeof value === 'string' ? value.split( ',' ) : value );

       }, [] );











       const handleChangePublish = useCallback( ( event ) =>
       {

              const { target: { value }, } = event;
              setPublish( typeof value === 'string' ? value.split( ',' ) : value );

       }, [] );









       const search = () =>
       {

              globalFilterFnctCall( { categoriesTab, citiesTab, maxPrice, minPrice, order } )
              setTimeout( () => { window.scrollTo( { top: postRef.current.offsetTop - HEADER.H_DESKTOP - 100, behavior: 'smooth', } ); }, 1000 );

       }











       // Fonction pour formater en milliers
       const formatToThousands = ( inputValue2 ) =>
       {
              if ( !inputValue2 ) return "";
              const numericValue = inputValue2.replace( /\D/g, "" );
              return Number( numericValue ).toLocaleString();
       };





       const handleChangeMinPrice = ( event ) =>
       {

              setValue( event.target.value.replace( /\D/g, "" ) );

       };





       const handleChangeMaxPrice = ( event ) =>
       {

              setmaxPrice( event.target.value.replace( /\D/g ), "" );
       };






       const handleKeyPress = ( event ) =>
       {

              const charCode = event.which || event.keyCode;
              const char = String.fromCharCode( charCode );
              if ( !/\d/.test( char ) && charCode !== 8 && charCode !== 46 ) event.preventDefault()

       };









       return (
              <>
                     <FormControl
                            sx={ {
                                   flexShrink: 0,
                                   width: { xs: '100%', md: '100%' },
                            } }
                     >

                            <Grid container  >
                                   <Grid xs={ 12 } md={ 12 } item >


                                          <Typography sx={ { color: '#003768', mt: 0, ml: 0, fontSize: 14, fontWeight: "bold", } } >Categorie</Typography>



                                          <Autocomplete
                                                 fullWidth
                                                 multiple
                                                 limitTags={ 3 }
                                                 options={ categorieOpttion }
                                                 onChange={ ( event, newValue ) =>
                                                 {
                                                        // console.log( newValue );
                                                        const dataToPass = newValue.length > 0 ? newValue : [];
                                                        setCategoriesTab( dataToPass )
                                                 }
                                                 }
                                                 getOptionLabel={ ( option ) => option }
                                                 renderInput={ ( params ) => (
                                                        <TextField { ...params } placeholder="Selectioner une categories" />
                                                 ) }
                                                 renderOption={ ( props, option ) => (
                                                        <li { ...props } key={ option }>
                                                               { option }
                                                        </li>
                                                 ) }
                                                 renderTags={ ( selected, getTagProps ) =>
                                                        selected.map( ( option, index ) => (
                                                               <Chip
                                                                      { ...getTagProps( { index } ) }
                                                                      key={ option }
                                                                      label={ option }
                                                                      size="small"
                                                                      variant="soft"
                                                                      color='primary'
                                                               />
                                                        ) )
                                                 }
                                          />
                                   </Grid>


                            </Grid>




                     </FormControl>



                     {/* <Typography sx={ { color: '#003768', mt: 3, ml: 0, fontSize: 14, fontWeight: "bold", mb: 1 } } >Categorie</Typography> */ }

                     {/* <Stack> */ }
                     {/* <Button sx={ { mb: 1 } } variant="soft" color="secondary"
                            size="small"
                            startIcon={ <Iconify icon="eva:search-fill" /> }
                     >
                            Categorie 1
                     </Button>
                   */}

                     {/* </Stack> */ }


                     <FormControl
                            sx={ {
                                   flexShrink: 0,
                                   width: { xs: '100%', md: '100%' },
                            } }
                     >

                            <Grid container  >
                                   <Grid xs={ 12 } md={ 12 } item >


                                          <Typography sx={ { color: '#003768', mt: 2, ml: 0, fontSize: 14, fontWeight: "bold", } } >Prix</Typography>




                                          {/* <Typography sx={ { color: '#003768', mt: 1, ml: 0, fontSize: 14, fontWeight: "bold", } } >Prix minimum</Typography> */ }

                                          <Box mt={ 1 } flexDirection="column" display="flex">
                                                 <FormControlLabel
                                                        key="Croissant"
                                                        control={ <Checkbox size="medium" color="success" /> }
                                                        label="Croissant"
                                                        onChange={ ( event => setOrder( event.target.checked ? 'croissant' : null ) ) }
                                                        sx={ { textTransform: 'capitalize' } }
                                                 />
                                                 <FormControlLabel
                                                        key="deCroissant"
                                                        control={ <Checkbox size="medium" color="success" /> }
                                                        label="Decroissant"
                                                        onChange={ ( event => setOrder( event.target.checked ? 'decroissant' : null ) ) }
                                                        sx={ { textTransform: 'capitalize' } }
                                                 />
                                          </Box>

                                          <TextField
                                                 sx={ { mt: 3.5 } }
                                                 type='text'
                                                 variant='outlined'
                                                 fullWidth
                                                 value={ formatToThousands( minPrice ) } // Affiche la valeur formatée

                                                 label="Minimum"
                                                 InputProps=
                                                 { {
                                                        startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                                                        endAdornment: <InputAdornment position="start"> <Iconify icon="solar:eye-bold" width={ 24 } /></InputAdornment>,
                                                 } }

                                                 onChange={ ( event => { handleChangeMinPrice( event ) } ) }
                                                 onKeyPress={ handleKeyPress } />



                                          <TextField
                                                 sx={ { mt: 2.5 } }
                                                 type='text'
                                                 variant='outlined'
                                                 fullWidth
                                                 value={ formatToThousands( maxPrice ) } // Affiche la valeur formatée

                                                 label="Maximum"
                                                 InputProps=
                                                 { {
                                                        startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                                                        endAdornment: <InputAdornment position="start"> <Iconify icon="solar:eye-bold" width={ 24 } /></InputAdornment>,
                                                 } }
                                                 onChange={ ( event => { handleChangeMaxPrice( event ) } ) }
                                                 onKeyPress={ handleKeyPress }

                                          />


                                   </Grid>


                            </Grid>




                     </FormControl>








                     <FormControl
                            sx={ {
                                   flexShrink: 0,
                                   width: { xs: '100%', md: '100%' },
                            } }
                     >

                            <Grid container  >
                                   <Grid xs={ 12 } md={ 12 } item >

                                          <Typography sx={ { color: '#003768', mt: 3, ml: 0, fontSize: 14, fontWeight: "bold", mb: 0 } } >Villes</Typography>






                                          <Autocomplete
                                                 sx={ { mt: 2.5 } }
                                                 fullWidth
                                                 multiple
                                                 limitTags={ 3 }
                                                 options={ cityOptions }
                                                 onChange={ ( event, newValue ) =>
                                                 {
                                                        // console.log( newValue );
                                                        const dataToPass = newValue.length > 0 ? newValue : [];
                                                        setCitiesTab( dataToPass );
                                                 }
                                                 }
                                                 getOptionLabel={ ( option ) => option }
                                                 // defaultValue={ categorieOpttion.slice( 0, 8 ) }
                                                 renderInput={ ( params ) => (
                                                        <TextField { ...params } placeholder="Selectionner une ville" />
                                                 ) }
                                                 renderOption={ ( props, option ) => (
                                                        <li { ...props } key={ option }>
                                                               { option }
                                                        </li>
                                                 ) }
                                                 renderTags={ ( selected, getTagProps ) =>
                                                        selected.map( ( option, index ) => (
                                                               <Chip
                                                                      { ...getTagProps( { index } ) }
                                                                      key={ option }
                                                                      label={ option }
                                                                      size="small"
                                                                      variant="soft"
                                                                      color='primary'
                                                               />
                                                        ) )
                                                 }
                                          />



                                   </Grid>


                            </Grid>




                     </FormControl>

                     <Button

                            onClick={ () => search() }
                            sx={ {

                                   mt: 2,

                                   ml: 3,

                            } }
                            variant="contained" color="primary"
                            startIcon={ <Iconify icon="ic:round-filter-list" /> }
                     >
                            Apliquer les Filtre
                     </Button>


              </>
       );
}

SidebarFilter.propTypes = {
       filters: PropTypes.object,
       onFilters: PropTypes.func,
       stockOptions: PropTypes.array,
       onPriceFilters: PropTypes.func,
       publishOptions: PropTypes.array,
       onArgumentFilters: PropTypes.func,
       onOrderPriceFilters: PropTypes.func,
};



const categorieOpttion = [
       'categorie1',
       'categorie2',
       'categorie3',
]
