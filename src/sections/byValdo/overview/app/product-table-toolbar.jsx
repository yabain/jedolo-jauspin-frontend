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
import { Autocomplete, Button, Grid, InputAdornment, TextField } from '@mui/material';

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
                                   <Grid xs={ 3 } md={ 3 }>

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
                                                 renderInput={ ( params ) => <TextField { ...params } label="Statut" /> }
                                                 renderOption={ ( props, option ) => (
                                                        <li { ...props } key={ option }>
                                                               { option }
                                                        </li>
                                                 ) }
                                          />
                                   </Grid>
                                   <Grid xs={ 3 } md={ 3 }>

                                          <Autocomplete
                                                 sx={ {

                                                        mt: 2,

                                                        ml: 1,
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
                                                 renderInput={ ( params ) => <TextField { ...params } label="Statut" /> }
                                                 renderOption={ ( props, option ) => (
                                                        <li { ...props } key={ option }>
                                                               { option }
                                                        </li>
                                                 ) }
                                          />
                                   </Grid>

                                   <Grid xs={ 3 } md={ 3 }>

                                          <TextField

                                                 sx={ {

                                                        mt: 2,

                                                        ml: 2,
                                                        backgroundColor: 'white',
                                                        borderRadius: "14px",

                                                 } }
                                                 variant='outlined'
                                                 fullWidth
                                                 //    label="Filled"

                                                 placeholder='valeur du place holder'

                                          />

                                   </Grid>
                                   <Grid xs={ 3 } md={ 3 }


                                          sx={ {

                                                 alignItems: 'center',
                                                 display: 'flex',

                                          } }

                                   >


                                          <Button

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
                            </Grid>




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
