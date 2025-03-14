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
import { RHFAutocomplete, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, InputAdornment, Rating, Switch, Typography } from '@mui/material';
import { fontSize, height, Stack, width } from '@mui/system';
import Label from 'src/components/label';
import { useDisable } from 'src/1VALDO/hook/user/disable';
import { request } from 'src/store/users/disable/reducer';
import { useGetSponsor } from 'src/sections/byValdo/order/service/get-sponsor';
import SponsorItem from './sponsor-item-list-to-buy';





export default function DialogPaimentInProcess( { showDialog, dataGet, updateDataAfterSucces } )
{



       // let objectToAdd 
       const dispatch = useDispatch();
       const location = useLocation()
       const { user } = useAuthContext();
       const [ message, setMessage ] = useState( '' );
       const [ messageStyle, setMessageStyle ] = useState( { color: 'black' } );






       const [ payant, setChecked ] = useState( false );
       const [ sponsGet, setSponsGet ] = useState( [] );
       const [ dataPass, setDataPass ] = useState( [] );
       const [ submiting, setSubmiting ] = useState( false )
       const [ fullWidth, setFullWidth ] = useState( true );
       const [ tableData, setTableData ] = useState( [] );
       const addData = ( tempDataGet ) => { setTableData( tempDataGet ); setSponsGet( tempDataGet.map( ( item ) => item.titre ) ); }
       const annonce = useMemo( () => location.state?.annonce || null, [ location ] );








       const additionalFields = { montant: dataGet?.montant || '', validite: dataGet?.validite || '', heure: dataGet?.heure || '' };
       const baseFields = { description: dataGet?.description || '', titre: dataGet?.titre || '', avatarUrl: dataGet?.avatarUrl || null };
       const defaultValues = { ...baseFields, ...additionalFields, sponsor: [], numero: '' };





       const descriptionValidation = Yup.string().required( 'Description is required' );
       // const ReviewSchema = Yup.object().shape( { description: descriptionValidation } );
       const methods = useForm( { defaultValues, } );





       // fonction use

       const log = ( messageGet ) => { console.log( messageGet ); };








       const { reset, setValue, handleSubmit, watch } = methods;
       const resetAfterSuccess = () => { reset(); setSubmiting( false ); showDialog.onFalse() }
       const onSubmit = handleSubmit( ( data ) => { setSubmiting( true ); dispatch( request( { ...dataGet, ...data } ) ) } );

       useGetSponsor( addData )



       useEffect( () =>
       {
              // Si le dialogue est ouvert, commencez les timeouts
              if ( showDialog.value )
              {
                     const messageTimeout = setTimeout( () =>
                     {
                            setMessage( 'Paiement effectué avec succès' );
                            setMessageStyle( { color: 'green' } ); // Styliser en vert

                     }, 5000 );

                     const closeTimeout = setTimeout( () =>
                     {
                            showDialog.onFalse();
                            setMessage( '' );
                     }, 8000 );

                     // Cleanup lors du démontage ou de la fermeture du dialogue
                     return () =>
                     {
                            clearTimeout( messageTimeout );
                            clearTimeout( closeTimeout );
                            setMessage( '' );

                     };
              }

              // Retour explicite dans le cas où la condition if échoue
              return undefined;
       }, [ showDialog ] ); // Ce useEffect dépend de la valeur de showDialog










       return (
              <Dialog maxWidth='xs' fullWidth={ fullWidth } open={ showDialog.value } onClose={ showDialog.onFalse }>
                     <FormProvider { ...methods }>
                            <form onSubmit={ onSubmit }>
                                   <DialogTitle justifyContent="center" display="flex" > <Label variant="soft" color='primary' > Transaction initier </Label></DialogTitle>

                                   <DialogContent>
                                          <Stack direction="column" flexWrap="wrap" alignItems="center" mb={ 3 } spacing={ 1.5 }>
                                                 {/* <Typography variant="h6"><Label variant="soft" color='primary'></Label></Typography> */ }
                                                 { message === '' && ( <Typography variant="h6">Veuiller composer le #150*50# et entre Votre code secret pour Terminer la transaction</Typography> ) }

                                                 { message !== '' && ( <Typography variant="h6" style={ messageStyle }>  { message }</Typography> ) }
                                          </Stack>



                                   </DialogContent>

                                   { message === '' && <DialogActions>
                                          <Button color="error" variant="contained" onClick={ () => showDialog.onFalse() }>
                                                 Annuler
                                          </Button>


                                   </DialogActions> }
                            </form>
                     </FormProvider>
              </Dialog >

       );

}

DialogPaimentInProcess.propTypes = {
       showDialog: PropTypes.shape( {
              value: PropTypes.bool,
              onTrue: PropTypes.func,
              onFalse: PropTypes.func,
              toggle: PropTypes.func,
       } ).isRequired,
       dataGet: PropTypes.object,
       updateDataAfterSucces: PropTypes.func
};