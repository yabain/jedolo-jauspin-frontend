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
import { Autocomplete, Button, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function SidebarFilter( {
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


                                          <Typography sx={ { color: '#003768', mt: 5, ml: 0, fontSize: 14, fontWeight: "bold", } } >Critère de Trie</Typography>

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
                                   </Grid>


                            </Grid>




                     </FormControl>



                     <Typography sx={ { color: '#003768', mt: 3, ml: 0, fontSize: 14, fontWeight: "bold", mb: 1 } } >Categorie</Typography>

                     {/* <Stack> */ }
                     <Button sx={ { mb: 1 } } variant="soft" color="secondary"
                            size="small"
                            startIcon={ <Iconify icon="eva:search-fill" /> }
                     >
                            Categorie 1
                     </Button>
                     <Button sx={ { mb: 1 } } variant="soft" color="info"
                            size="small"
                            startIcon={ <Iconify icon="eva:search-fill" /> }
                     >
                            Categorie 1
                     </Button>
                     <Button sx={ { mb: 1 } } variant="soft" color="warning"
                            size="small"
                            startIcon={ <Iconify icon="eva:search-fill" /> }
                     >
                            Categorie 1
                     </Button>
                     <Button sx={ { mb: 1 } } variant="soft" color="error"
                            size="small"
                            startIcon={ <Iconify icon="eva:search-fill" /> }
                     >
                            Categorie 1
                     </Button>

                     {/* </Stack> */ }


                     <FormControl
                            sx={ {
                                   flexShrink: 0,
                                   width: { xs: '100%', md: '100%' },
                            } }
                     >

                            <Grid container  >
                                   <Grid xs={ 12 } md={ 12 }>


                                          <Typography sx={ { color: '#003768', mt: 3, ml: 0, fontSize: 14, fontWeight: "bold", } } >Prix minimum</Typography>

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


                                          <Typography sx={ { color: '#003768', mt: 1, ml: 0, fontSize: 14, fontWeight: "bold", } } >Prix minimum</Typography>

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
                                   </Grid>


                            </Grid>




                     </FormControl>






                     <Typography sx={ { color: '#003768', mt: 3, ml: 0, fontSize: 14, fontWeight: "bold", mb: 1 } } >Villes</Typography>

                     {/* <Stack> */ }
                     <Button sx={ { mb: 1 } } variant="outlined" color="secondary"
                            size="small"
                            startIcon={ <Iconify icon="eva:search-fill" /> }
                     >
                            Categorie 1
                     </Button>
                     <Button sx={ { mb: 1 } } variant="outlined" color="info"
                            size="small"
                            startIcon={ <Iconify icon="eva:search-fill" /> }
                     >
                            Categorie 1
                     </Button>
                     <Button sx={ { mb: 1 } } variant="outlined" color="warning"
                            size="small"
                            startIcon={ <Iconify icon="eva:search-fill" /> }
                     >
                            Categorie 1
                     </Button>
                     <Button sx={ { mb: 1 } } variant="outlined" color="error"
                            size="small"
                            startIcon={ <Iconify icon="eva:search-fill" /> }
                     >
                            Categorie 1
                     </Button>
              </>
       );
}

SidebarFilter.propTypes = {
       filters: PropTypes.object,
       onFilters: PropTypes.func,
       publishOptions: PropTypes.array,
       stockOptions: PropTypes.array,
};
