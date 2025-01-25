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
import { Autocomplete, Button, Chip, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function SidebarFilter( {
       filters,
       onFilters,
       onArgumentFilters,
       stockOptions,
       publishOptions,
} )
{
       const popover = usePopover();

       const [ stock, setStock ] = useState( stockOptions );

       const [ publish, setPublish ] = useState( stockOptions );


       const options = useMemo( () => [ 'valeur1', 'valeur2' ], [] );
       const [ valueAutoCompleted, setValueCompleted ] = useState( 'valeur1' );
       const [ inputValue, setInputValue ] = useState( 'valeur1' );

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


       return (
              <>
                     <FormControl
                            sx={ {
                                   flexShrink: 0,
                                   width: { xs: '100%', md: '100%' },
                            } }
                     >

                            <Grid container  >
                                   <Grid xs={ 12 } md={ 12 }>


                                          <Typography sx={ { color: '#003768', mt: 0, ml: 0, fontSize: 14, fontWeight: "bold", } } >Categorie</Typography>



                                          <Autocomplete
                                                 fullWidth
                                                 multiple
                                                 limitTags={ 3 }
                                                 options={ top100Films }
                                                 onChange={ ( event, newValue ) =>
                                                 {
                                                        console.log( newValue );
                                                        const dataToPass = newValue.length > 0 ? newValue : [ 'all' ];
                                                        onArgumentFilters( 'categorie', dataToPass );
                                                 }
                                                 }
                                                 getOptionLabel={ ( option ) => option }
                                                 defaultValue={ top100Films.slice( 0, 8 ) }
                                                 renderInput={ ( params ) => (
                                                        <TextField { ...params } placeholder="categories" />
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
                                   <Grid xs={ 12 } md={ 12 }>


                                          <Typography sx={ { color: '#003768', mt: 2, ml: 0, fontSize: 14, fontWeight: "bold", } } >Prix</Typography>

                                          <Autocomplete
                                                 sx={ {

                                                        mt: 0.5,

                                                        backgroundColor: 'white',
                                                        borderRadius: "14px",

                                                 } }
                                                 fullWidth
                                                 value={ valueAutoCompleted }
                                                 options={ options }
                                                 onChange={ ( event, newValue ) =>
                                                 {
                                                        setValueCompleted( newValue );
                                                        console.log( event, newValue );
                                                 } }
                                                 inputValue={ inputValue }
                                                 onInputChange={ ( event, newInputValue ) =>
                                                 {

                                                        console.log( event, newInputValue );

                                                        setInputValue( newInputValue );

                                                        // if ( newInputValue === "" )
                                                        // {
                                                        //        setInputValue( null );
                                                        // }
                                                 } }
                                                 getOptionLabel={ ( option ) => option }
                                                 renderInput={ ( params ) => <TextField { ...params } /> }
                                                 renderOption={ ( props, option ) => (
                                                        <li { ...props } key={ option }>
                                                               { option }
                                                        </li>
                                                 ) }
                                          />


                                          {/* <Typography sx={ { color: '#003768', mt: 1, ml: 0, fontSize: 14, fontWeight: "bold", } } >Prix minimum</Typography> */ }

                                          <Autocomplete
                                                 sx={ {

                                                        mt: 2.5,

                                                        backgroundColor: 'white',
                                                        borderRadius: "14px",

                                                 } }
                                                 fullWidth
                                                 value={ valueAutoCompleted }
                                                 options={ options }
                                                 onChange={ ( event, newValue ) =>
                                                 {
                                                        setValueCompleted( newValue );
                                                        console.log( event, newValue );
                                                 } }
                                                 inputValue={ inputValue }
                                                 onInputChange={ ( event, newInputValue ) =>
                                                 {

                                                        console.log( event, newInputValue );

                                                        setInputValue( newInputValue );

                                                        // if ( newInputValue === "" )
                                                        // {
                                                        //        setInputValue( null );
                                                        // }
                                                 } }
                                                 getOptionLabel={ ( option ) => option }
                                                 renderInput={ ( params ) => <TextField { ...params } /> }
                                                 renderOption={ ( props, option ) => (
                                                        <li { ...props } key={ option }>
                                                               { option }
                                                        </li>
                                                 ) }
                                          />

                                          <Autocomplete
                                                 sx={ {

                                                        mt: 2.5,

                                                        backgroundColor: 'white',
                                                        borderRadius: "14px",

                                                 } }
                                                 fullWidth
                                                 value={ valueAutoCompleted }
                                                 options={ options }
                                                 onChange={ ( event, newValue ) =>
                                                 {
                                                        setValueCompleted( newValue );
                                                        console.log( event, newValue );
                                                 } }
                                                 inputValue={ inputValue }
                                                 onInputChange={ ( event, newInputValue ) =>
                                                 {

                                                        console.log( event, newInputValue );

                                                        setInputValue( newInputValue );

                                                        // if ( newInputValue === "" )
                                                        // {
                                                        //        setInputValue( null );
                                                        // }
                                                 } }
                                                 getOptionLabel={ ( option ) => option }
                                                 renderInput={ ( params ) => <TextField { ...params } /> }
                                                 renderOption={ ( props, option ) => (
                                                        <li { ...props } key={ option }>
                                                               { option }
                                                        </li>
                                                 ) }
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
                                   <Grid xs={ 12 } md={ 12 }>

                                          <Typography sx={ { color: '#003768', mt: 3, ml: 0, fontSize: 14, fontWeight: "bold", mb: 0 } } >Villes</Typography>


                                          <Autocomplete
                                                 sx={ {

                                                        mt: 2,

                                                        backgroundColor: 'white',
                                                        borderRadius: "14px",

                                                 } }
                                                 fullWidth
                                                 value={ valueAutoCompleted }
                                                 options={ options }
                                                 onChange={ ( event, newValue ) =>
                                                 {
                                                        setValueCompleted( newValue );
                                                        console.log( event, newValue );
                                                 } }
                                                 inputValue={ inputValue }
                                                 onInputChange={ ( event, newInputValue ) =>
                                                 {

                                                        console.log( event, newInputValue );

                                                        setInputValue( newInputValue );

                                                        // if ( newInputValue === "" )
                                                        // {
                                                        //        setInputValue( null );
                                                        // }
                                                 } }
                                                 getOptionLabel={ ( option ) => option }
                                                 renderInput={ ( params ) => <TextField { ...params } /> }
                                                 renderOption={ ( props, option ) => (
                                                        <li { ...props } key={ option }>
                                                               { option }
                                                        </li>
                                                 ) }
                                          />



                                   </Grid>


                            </Grid>




                     </FormControl>

              </>
       );
}

SidebarFilter.propTypes = {
       filters: PropTypes.object,
       onArgumentFilters: PropTypes.func,
       onFilters: PropTypes.func,
       publishOptions: PropTypes.array,
       stockOptions: PropTypes.array,
};



const top100Films = [
       'categorie1',
       'categorie2',
       'categorie3',
]
