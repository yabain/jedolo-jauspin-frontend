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
import { Stack } from '@mui/system';
import { request } from 'src/store/sponsor/update/reducer';
import { useAddSponsor } from '../service/add-sponsor';
import { useUpdateSponsor } from '../service/edit-sponsor';






export default function DialogEditSponsor( { showDialog, dataGet, updateDataAfterSucces } )
{


       // let objectToAdd 
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
       const ReviewSchema = Yup.object().shape( { description: descriptionValidation } );
       const methods = useForm( { resolver: yupResolver( ReviewSchema ), defaultValues, } );





       // fonction use

       const log = ( message ) => { console.log( message ); };






       const { reset, setValue, handleSubmit } = methods;
       const resetAfterSuccess = () => { reset(); setSubmiting( false ); showDialog.onFalse() }
       const onSubmit = handleSubmit( ( data ) => { setSubmiting( true ); dispatch( request( { ...dataGet, ...data } ) ) } );





       const handleDrop = useCallback(
              ( acceptedFiles ) =>
              {
                     const file = acceptedFiles[ 0 ];
                     const newFile = Object.assign( file, { preview: URL.createObjectURL( file ), } );
                     if ( file ) { setValue( 'avatarUrl', newFile, { shouldValidate: true } ); }
              },
              [ setValue ]
       );
       useUpdateSponsor( resetAfterSuccess, updateDataAfterSucces )










       return (
              <Dialog maxWidth='sm' fullWidth={ fullWidth } open={ showDialog.value } onClose={ showDialog.onFalse }>
                     <FormProvider { ...methods }>
                            <form onSubmit={ onSubmit }>
                                   <DialogTitle > Nouveau sponsor </DialogTitle>

                                   <DialogContent>
                                          {/* <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={ 1.5 }>
                                                 <Typography variant="body2">Pourquoi voulez signaler cette annonce ?</Typography>
                                          </Stack> */}
                                          <Box display="flex" width={ 1 } >
                                                 <RHFUploadAvatar
                                                        name="avatarUrl"
                                                        maxSize={ 3145728 }
                                                        onDrop={ handleDrop }
                                                 />
                                                 <Box display="flex" width={ 1 } flexDirection="column" ml={ 3 }>
                                                        <Typography sx={ { mt: "20px" } } variant="body2">titre du sponsor</Typography>
                                                        <RHFTextField name="titre" label="titre de la categorie" sx={ { mt: "auto", mb: "20px" } } />
                                                 </Box>
                                                 <Box display="flex" width={ 1 } flexDirection="column" ml={ 1 }>
                                                        <Typography sx={ { mt: "20px" } } variant="body2">heure </Typography>
                                                        <RHFTextField
                                                               sx={ { mt: "auto", mb: "20px" } }
                                                               name="heure"
                                                               placeholder="0.00"
                                                               type="number"
                                                               InputLabelProps={ { shrink: true } }
                                                               InputProps={ {
                                                                      endAdornment: (
                                                                             <InputAdornment position="end">
                                                                                    <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                                           Heure
                                                                                    </Box>
                                                                             </InputAdornment>
                                                                      ),
                                                               } }
                                                        />                                                 </Box>
                                          </Box>

                                          <Box display="flex" width={ 1 } mt={ 3 } >
                                                 <RHFTextField
                                                        name="validite"
                                                        label="Vadlitié"
                                                        placeholder="0.00"
                                                        type="number"
                                                        InputLabelProps={ { shrink: true } }
                                                        InputProps={ {
                                                               endAdornment: (
                                                                      <InputAdornment position="end">
                                                                             <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                                    Jour(s)
                                                                             </Box>
                                                                      </InputAdornment>
                                                               ),
                                                        } }
                                                 />
                                                 <Box display="flex" width={ 1 } ml={ 3 }>
                                                        <RHFTextField
                                                               name="montant"
                                                               label="Montant"
                                                               placeholder="0.00"
                                                               type="number"
                                                               InputLabelProps={ { shrink: true } }
                                                               InputProps={ {
                                                                      endAdornment: (
                                                                             <InputAdornment position="end">
                                                                                    <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                                           FCFA
                                                                                    </Box>
                                                                             </InputAdornment>
                                                                      ),
                                                               } }
                                                        />
                                                 </Box>
                                          </Box>

                                          <RHFTextField name="description" label="Description" multiline rows={ 3 } sx={ { mt: 3 } } />
                                          {/* <FormControlLabel
                                                 control={ <Switch checked={ payant } onChange={ ( event ) => { setChecked( event.target.checked ) } } /> }
                                                 label="Payante"
                                                 sx={ { flexGrow: 1, mt: 2 } }
                                          /> */}
                                   </DialogContent>

                                   <DialogActions>
                                          <Button color="inherit" variant="outlined" onClick={ () => setSubmiting( false ) }>
                                                 Annuler
                                          </Button>

                                          <LoadingButton color='success' type="submit" variant="contained" loading={ submiting }>
                                                 Ajouter
                                          </LoadingButton>
                                   </DialogActions>
                            </form>
                     </FormProvider>
              </Dialog>

       );

}

DialogEditSponsor.propTypes = {
       showDialog: PropTypes.shape( {
              value: PropTypes.bool,
              onTrue: PropTypes.func,
              onFalse: PropTypes.func,
              toggle: PropTypes.func,
       } ).isRequired,
       dataGet: PropTypes.object,
       updateDataAfterSucces: PropTypes.func
};