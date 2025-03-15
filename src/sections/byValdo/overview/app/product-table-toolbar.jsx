import PropTypes from 'prop-types';
import { useState, useCallback, useMemo, useEffect } from 'react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { postRef } from 'src/1data/annonces/ref';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { Autocomplete, Button, Chip, Grid, InputAdornment, TextField } from '@mui/material';
import { filteredByArgStriingExported, globalFilterFnctCall } from 'src/1functions/annonces';
import { Box } from '@mui/system';
import { HEADER } from 'src/layouts/config-layout';

// ----------------------------------------------------------------------

export default function ProductTableToolbar( {
       filters,
       onFilters,
       //
       stockOptions,
       publishOptions,
} )
{
       const popover = usePopover();
       const [ stock, setStock ] = useState( stockOptions );
       const [ publish, setPublish ] = useState( stockOptions );
       const [ selectedCity, setSelectedCity ] = useState( [] );
       const [ maxPriceFormat, setMaxPriceFormat ] = useState( "" );
       const [ categorieSelected, setCategorieSelected ] = useState( [] );



       const cityOption = useMemo( () => [ 'Bafoussam', 'Yaounde', 'Bertou' ], [] );
       const optionCategorie = useMemo( () => [ 'categorie3', 'categorie4', 'categorie5', 'categorie6', 'categorie2' ], [] );










       const handleChangeStock = useCallback( ( event ) =>
       {
              const {
                     target: { value },
              } = event;
              setStock( typeof value === 'string' ? value.split( ',' ) : value );
       }, [] );

       const handleChangePublish = useCallback( ( event ) =>
       {
              const {
                     target: { value },
              } = event;
              setPublish( typeof value === 'string' ? value.split( ',' ) : value );
       }, [] );

       const handleCloseStock = useCallback( () =>
       {
              onFilters( 'stock', stock );
       }, [ onFilters, stock ] );

       const handleClosePublish = useCallback( () =>
       {
              onFilters( 'publish', publish );
       }, [ onFilters, publish ] );








       const search = () =>
       {

              console.log( 'value', categorieSelected );
              console.log( 'selected city', selectedCity );
              globalFilterFnctCall( { categoriesTab: categorieSelected, citiesTab: selectedCity, maxPrice: maxPriceFormat, minPrice: null, order: '' } )
              setTimeout( () => { window.scrollTo( { top: postRef.current.offsetTop - HEADER.H_DESKTOP - 100, behavior: 'smooth', } ); }, 1000 );

       }










       const formatToThousands = ( inputValue2 ) =>
       {
              if ( !inputValue2 ) return "";
              const numericValue = inputValue2.replace( /\D/g, "" );
              return Number( numericValue ).toLocaleString();
       };















       const handleChangeMaxPrice = ( event ) =>
       {

              setMaxPriceFormat( event.target.value.replace( /\D/g, "" ) );
              console.log( event.target.value.replace( /\D/g, "" ) );
              console.log( 'type of maxprice', maxPriceFormat );


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
                                   <Grid item xs={ 3 } md={ 3 }>

                                          <Autocomplete
                                                 sx={ { mt: 2, backgroundColor: 'white', borderRadius: "14px", } }
                                                 fullWidth
                                                 multiple
                                                 limitTags={ 1 }
                                                 options={ cityOption }
                                                 onChange={ ( event, newValue ) =>
                                                 {
                                                        console.log( newValue );
                                                        setSelectedCity( newValue.length > 0 ? newValue : [] );


                                                 }
                                                 }
                                                 getOptionLabel={ ( option ) => option }
                                                 // defaultValue={ categorieOpttion.slice( 0, 8 ) }
                                                 renderInput={ ( params ) => (
                                                        <TextField { ...params } placeholder="Selectionner une Ville" label="Villes"
                                                        />
                                                 ) }
                                                 renderOption={ ( props, option ) => (
                                                        <li { ...props } key={ option }>
                                                               { option }
                                                        </li>
                                                 ) }
                                                 renderTags={ ( selected, getTagProps ) =>
                                                 {
                                                        const displayedTags = selected.slice( 0, 1 ); // Limite à 5 tags
                                                        const extraTagsCount = selected.length - 1;

                                                        return (
                                                               <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1 } }>
                                                                      { displayedTags.map( ( option, index ) => (
                                                                             <Chip
                                                                                    { ...getTagProps( { index } ) }
                                                                                    key={ option }
                                                                                    label={ option }
                                                                                    size="small"
                                                                                    variant="soft"
                                                                                    color="primary"
                                                                             />
                                                                      ) ) }
                                                                      { extraTagsCount > 0 && (
                                                                             <Chip
                                                                                    label={ `+${ extraTagsCount }` }
                                                                                    size="small"
                                                                                    variant="soft"
                                                                                    color="primary"
                                                                                    sx={ { alignSelf: 'center' } }
                                                                             />
                                                                      ) }
                                                               </Box>
                                                        );
                                                 } }
                                          />
                                   </Grid>
                                   <Grid item xs={ 3 } md={ 3 }>

                                          <Autocomplete
                                                 sx={ { mt: 2, ml: 1, backgroundColor: 'white', borderRadius: "14px" } }
                                                 fullWidth
                                                 multiple
                                                 limitTags={ 1 }
                                                 options={ optionCategorie }
                                                 onChange={ ( event, newValue ) =>
                                                 {
                                                        console.log( newValue );
                                                        setCategorieSelected( newValue.length > 0 ? newValue : [] );


                                                 }
                                                 }
                                                 getOptionLabel={ ( option ) => option }
                                                 // defaultValue={ categorieOpttion.slice( 0, 8 ) }
                                                 renderInput={ ( params ) => (
                                                        <TextField { ...params } placeholder="Selectionner une Categorie" label="categories"
                                                        />
                                                 ) }
                                                 renderOption={ ( props, option ) => (
                                                        <li { ...props } key={ option }>
                                                               { option }
                                                        </li>
                                                 ) }
                                                 renderTags={ ( selected, getTagProps ) =>
                                                 {
                                                        const displayedTags = selected.slice( 0, 1 ); // Limite à 5 tags
                                                        const extraTagsCount = selected.length - 1;

                                                        return (
                                                               <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1 } }>
                                                                      { displayedTags.map( ( option, index ) => (
                                                                             <Chip
                                                                                    { ...getTagProps( { index } ) }
                                                                                    key={ option }
                                                                                    label={ option }
                                                                                    size="small"
                                                                                    variant="soft"
                                                                                    color="primary"
                                                                             />
                                                                      ) ) }
                                                                      { extraTagsCount > 0 && (
                                                                             <Chip
                                                                                    label={ `+${ extraTagsCount }` }
                                                                                    size="small"
                                                                                    variant="soft"
                                                                                    color="primary"
                                                                                    sx={ { alignSelf: 'center' } }
                                                                             />
                                                                      ) }
                                                               </Box>
                                                        );
                                                 } }
                                          />

                                   </Grid>

                                   <Grid item xs={ 3 } md={ 3 }>


                                          <TextField
                                                 sx={ { mt: 2, ml: 2, backgroundColor: 'white', borderRadius: "14px" } }
                                                 type='text'
                                                 variant='outlined'
                                                 fullWidth
                                                 value={ formatToThousands( maxPriceFormat ) } // Affiche la valeur formatée

                                                 label="Prix maximum"
                                                 InputProps=
                                                 { {
                                                        startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                                                        endAdornment: <InputAdornment position="start"> <Iconify icon="solar:eye-bold" width={ 24 } /></InputAdornment>,
                                                 } }
                                                 onChange={ ( event => { handleChangeMaxPrice( event ) } ) }
                                                 onKeyPress={ handleKeyPress }

                                          />


                                   </Grid>
                                   <Grid item xs={ 3 } md={ 3 }


                                          sx={ {

                                                 alignItems: 'center',
                                                 display: 'flex',

                                          } }

                                   >


                                          <Button

                                                 onClick={ () => search() }
                                                 sx={ {

                                                        mt: 2,

                                                        ml: 3,

                                                 } }
                                                 variant="contained" color="primary"
                                                 startIcon={ <Iconify icon="eva:search-fill" /> }
                                          >
                                                 Rechercher
                                          </Button>
                                   </Grid>
                            </Grid >




                     </FormControl>



                     <CustomPopover
                            open={ popover.open }
                            onClose={ popover.onClose }
                            arrow="right-top"
                            sx={ { width: 140 } }
                     >
                            <MenuItem
                                   onClick={ () =>
                                   {
                                          popover.onClose();
                                   } }
                            >
                                   <Iconify icon="solar:printer-minimalistic-bold" />
                                   Print
                            </MenuItem>

                            <MenuItem
                                   onClick={ () =>
                                   {
                                          popover.onClose();
                                   } }
                            >
                                   <Iconify icon="solar:import-bold" />
                                   Import
                            </MenuItem>

                            <MenuItem
                                   onClick={ () =>
                                   {
                                          popover.onClose();
                                   } }
                            >
                                   <Iconify icon="solar:export-bold" />
                                   Export
                            </MenuItem>
                     </CustomPopover>
              </>
       );
}

ProductTableToolbar.propTypes = {
       filters: PropTypes.object,
       onFilters: PropTypes.func,
       publishOptions: PropTypes.array,
       stockOptions: PropTypes.array,
};
