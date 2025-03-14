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
import { height, Stack, width } from '@mui/system';
import Label from 'src/components/label';
import { useDisable } from 'src/1VALDO/hook/user/disable';
import { request } from 'src/store/users/disable/reducer';
import { useGetSponsor } from 'src/sections/byValdo/order/service/get-sponsor';
import SponsorItem from '../sponsor/sponsor-item-list-to-buy';




export default function DialogALaUneBuy( { showDialog, dataGet, updateDataAfterSucces, startPaiement } )
{



       // let objectToAdd 
       // console.log( dataGet?.avatarUrl );

       const dispatch = useDispatch();
       const location = useLocation()
       const { user } = useAuthContext();








       const passObject = { id: 1, titre: 'mis a la une', validite: 3, montant: 6000, description: "votre esnnonce est presente dans les annonces a la une " };
       const additionalFields = { montant: dataGet?.montant || '', validite: dataGet?.validite || '', heure: dataGet?.heure || '' };
       const baseFields = { description: dataGet?.description || '', titre: dataGet?.titre || '', avatarUrl: dataGet?.avatarUrl || null };
       const defaultValues = { ...baseFields, ...additionalFields, sponsor: [], numero: '' };





       const [ payant, setChecked ] = useState( false );
       const [ sponsGet, setSponsGet ] = useState( [] );
       const [ dataPass, setDataPass ] = useState( [ passObject ] );
       const [ submiting, setSubmiting ] = useState( false )
       const [ fullWidth, setFullWidth ] = useState( true );
       const [ tableData, setTableData ] = useState( [] );
       const addData = ( tempDataGet ) => { setTableData( tempDataGet ); setSponsGet( tempDataGet.map( ( item ) => item.titre ) ); }
       const annonce = useMemo( () => location.state?.annonce || null, [ location ] );





       const descriptionValidation = Yup.string().required( 'Description is required' );
       // const ReviewSchema = Yup.object().shape( { description: descriptionValidation } );
       const methods = useForm( { defaultValues, } );





       // fonction use

       const log = ( message ) => { console.log( message ); };








       const { reset, setValue, handleSubmit, watch } = methods;
       const resetAfterSuccess = () => { reset(); setSubmiting( false ); showDialog.onFalse() }
       const onSubmit = handleSubmit( ( data ) => { startPaiement.onTrue(); showDialog.onFalse() } );

       useGetSponsor( addData )










       return (
              <Dialog maxWidth='sm' fullWidth={ fullWidth } open={ showDialog.value } onClose={ showDialog.onFalse }>
                     <FormProvider { ...methods }>
                            <form onSubmit={ onSubmit }>
                                   <DialogTitle > <Label variant="soft" color='primary'>Mise a la une  </Label></DialogTitle>

                                   <DialogContent>
                                          {/* <Stack direction="row" flexWrap="wrap" alignItems="center" mb={ 3 } spacing={ 1.5 }>
                                                 <Typography variant="h6">Selectionner Votre Sponsor</Typography>
                                          </Stack> */}

                                          <SponsorItem items={ dataPass } />
                                          { dataPass.length > 0 && <RHFTextField
                                                 sx={ { mt: 2 } }
                                                 name="numero"
                                                 label="Numero Orange Money"
                                                 placeholder="000"
                                                 type="number"
                                                 InputLabelProps={ { shrink: true } }
                                                 InputProps={ {
                                                        startAdornment: (
                                                               <InputAdornment position="start">
                                                                      <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                             OM
                                                                      </Box>
                                                               </InputAdornment>
                                                        ),
                                                        endAdornment: (
                                                               <InputAdornment position="start">
                                                                      <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                             FCFA
                                                                      </Box>
                                                               </InputAdornment>
                                                        ),
                                                 } }
                                          />
                                          }


                                   </DialogContent>

                                   <DialogActions>
                                          <Button color="inherit" variant="outlined" onClick={ () => showDialog.onFalse() }>
                                                 Annuler
                                          </Button>

                                          <LoadingButton color='primary' type="submit" variant="contained" loading={ submiting }>
                                                 Payer
                                          </LoadingButton>
                                   </DialogActions>
                            </form>
                     </FormProvider>
              </Dialog >

       );

}

DialogALaUneBuy.propTypes = {
       showDialog: PropTypes.shape( {
              value: PropTypes.bool,
              onTrue: PropTypes.func,
              onFalse: PropTypes.func,
              toggle: PropTypes.func,
       } ).isRequired,

       startPaiement: PropTypes.shape( {
              value: PropTypes.bool,
              onTrue: PropTypes.func,
              onFalse: PropTypes.func,
              toggle: PropTypes.func,
       } ).isRequired,

       dataGet: PropTypes.object,
       updateDataAfterSucces: PropTypes.func
};