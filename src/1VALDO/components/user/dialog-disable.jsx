import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
import { fData } from 'src/utils/format-number';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, InputAdornment, Rating, Switch, Typography } from '@mui/material';
import { height, Stack, width } from '@mui/system';
import Label from 'src/components/label';
import { useDisable } from 'src/1VALDO/hook/user/disable';
import { request } from 'src/store/users/disable/reducer';





export default function DialogDisable( { showDialog, dataGet, updateDataAfterSucces } )
{


       // let objectToAdd 
       console.log( dataGet.avatarUrl );

       const dispatch = useDispatch();
       const location = useLocation()
       const { user } = useAuthContext();





       const [ payant, setChecked ] = useState( false );
       const [ submiting, setSubmiting ] = useState( false )
       const [ fullWidth, setFullWidth ] = useState( true );
       const annonce = useMemo( () => location.state?.annonce || null, [ location ] );








       const additionalFields = { montant: dataGet.montant || '', validite: dataGet.validite || '', heure: dataGet.heure || '' };
       const baseFields = { description: dataGet.description || '', titre: dataGet.titre || '', avatarUrl: dataGet.avatarUrl || null };
       const defaultValues = { ...baseFields, ...additionalFields };





       const descriptionValidation = Yup.string().required( 'Description is required' );
       // const ReviewSchema = Yup.object().shape( { description: descriptionValidation } );
       const methods = useForm( { defaultValues, } );





       // fonction use

       const log = ( message ) => { console.log( message ); };








       const { reset, setValue, handleSubmit, watch } = methods;
       const resetAfterSuccess = () => { reset(); setSubmiting( false ); showDialog.onFalse() }
       const onSubmit = handleSubmit( ( data ) => { setSubmiting( true ); dispatch( request( { ...dataGet, ...data } ) ) } );



       useEffect( () => { setValue( "avatarUrl", dataGet.avatarUrl ) }, [ dataGet.avatarUrl, setValue ] );


       const handleDrop = useCallback(
              ( acceptedFiles ) =>
              {
                     const file = acceptedFiles[ 0 ];
                     const newFile = Object.assign( file, { preview: URL.createObjectURL( file ), } );
                     if ( file ) { setValue( 'avatarUrl', newFile, { shouldValidate: true } ); }
              },
              [ setValue ]
       );
       useDisable( resetAfterSuccess, dataGet, updateDataAfterSucces )










       return (
              <Dialog maxWidth='sm' fullWidth={ fullWidth } open={ showDialog.value } onClose={ showDialog.onFalse }>
                     <FormProvider { ...methods }>
                            <form onSubmit={ onSubmit }>
                                   <DialogTitle > <Label variant="soft" color='error'>Desactiver le compte  </Label></DialogTitle>

                                   <DialogContent>
                                          <Stack direction="row" flexWrap="wrap" alignItems="center" mb={ 3 } spacing={ 1.5 }>
                                                 <Typography variant="h6">Voulez vous vraiment desactiver ce compte ?</Typography>
                                          </Stack>
                                          <Box display="flex" width={ 1 } >
                                                 <RHFUploadAvatar
                                                        sx={ { width: "100px", height: "100px" } }
                                                        name="avatarUrl"
                                                        maxSize={ 3145728 }
                                                        onDrop={ handleDrop }


                                                 />
                                                 <Box display="flex" width={ 1 } flexDirection="column" ml={ 3 }>
                                                        <Typography sx={ { mt: "20px" } } variant="body2">{ dataGet.name }</Typography>
                                                        <Typography sx={ { mt: "auto", mb: "20px" } } variant="subtitle1">{ dataGet.email }</Typography>
                                                 </Box>
                                          </Box>



                                   </DialogContent>

                                   <DialogActions>
                                          <Button color="inherit" variant="outlined" onClick={ () => showDialog.onFalse() }>
                                                 Annuler
                                          </Button>

                                          <LoadingButton color='error' type="submit" variant="contained" loading={ submiting }>
                                                 Desactiver
                                          </LoadingButton>
                                   </DialogActions>
                            </form>
                     </FormProvider>
              </Dialog >

       );

}

DialogDisable.propTypes = {
       showDialog: PropTypes.shape( {
              value: PropTypes.bool,
              onTrue: PropTypes.func,
              onFalse: PropTypes.func,
              toggle: PropTypes.func,
       } ).isRequired,
       dataGet: PropTypes.object,
       updateDataAfterSucces: PropTypes.func
};