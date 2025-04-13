import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
import axios from 'axios';

import { HOST_FRONT_PROD, tokenUser } from 'src/config-global';
import { fData } from 'src/utils/format-number';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useHandleTransaction } from 'src/1VALDO/hook/transaction/use-handle-transaction';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { RHFAutocomplete, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';


import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, InputAdornment, Rating, Switch, Typography } from '@mui/material';
import { height, Stack, width } from '@mui/system';
import Label from 'src/components/label';
import { request } from 'src/store/annonces/addAnnonce/reducer';
import DialogAnnonceBuyCreation from './dialog-annonce-buy-created';
import DialogAnnoncePaimentInProcess from './dialog-annonce-paiment-inProcess ';

export default function DialogAnnonceBuy({ showDialog, dataGet, updateDataAfterSucces }) {



       // let objectToAdd 
       // console.log( 'element recu', dataGet.userEmail );

       const resetAfterSuccess = () => { reset(); }
       const startPaiement = useBoolean()
       const { enqueueSnackbar } = useSnackbar()






       const handleSuccesTransaction = (token) => {
              const newAnnonce = { ...dataGet, transactionToken: token }
              dispatch(request(newAnnonce))
       }


       const handlePending = () => {
              startPaiement.onTrue()
       }


       const handleCancel = () => {
              startPaiement.onFalse()
              enqueueSnackbar('la transaction a ete annuler veuiller reessayez', { variant: 'error' })
       }



       const handleStart = () => {
              enqueueSnackbar('transaction en cours veuillez patientez',)
       }




       const handleError = () => {
              enqueueSnackbar('Erreur lors de la transaction', { variant: 'error' })
       }



       const dispatch = useDispatch();
       const location = useLocation()
       const { user } = useAuthContext();
       const { handleTransaction, submiting, setSubmiting } = useHandleTransaction(user, resetAfterSuccess,
              {
                     onSuccess: () => handleSuccesTransaction(),
                     onPending: () => handlePending(),
                     onCancelled: () => handleCancel(),
                     onstart: () => handleStart(),
                     onError: () => handleError(),
              }
       );









       const passObject = useMemo(() => ({ id: 1, titre: dataGet.name, montant: 2600, description: dataGet.subDescription }), [dataGet.subDescription, dataGet.name]);
       const additionalFields = { montant: dataGet?.montant || '', validite: dataGet?.validite || '', heure: dataGet?.heure || '' };
       const baseFields = { description: dataGet?.description || '', titre: dataGet?.titre || '', avatarUrl: dataGet?.avatarUrl || null };
       const defaultValues = { numero: '' };





       const [payant, setChecked] = useState(false);
       const [sponsGet, setSponsGet] = useState(['top']);
       const [dataPass, setDataPass] = useState([passObject]);
       // const [submiting, setSubmiting] = useState(false)
       const [fullWidth, setFullWidth] = useState(true);
       const [tableData, setTableData] = useState([]);
       const addData = (tempDataGet) => { setTableData(tempDataGet); setSponsGet(tempDataGet.map((item) => item.titre)); }
       const annonce = useMemo(() => location.state?.annonce || null, [location]);





       const descriptionValidation = Yup.string().required('Description is required');
       const validationSchema = Yup.object().shape({
              numero: Yup.string()
                     .required('Le numéro est requis')
                     .matches(/^\d{9}$/, 'Le numéro doit contenir exactement 9 chiffres'),
       });

       // const ReviewSchema = Yup.object().shape( { description: descriptionValidation } );
       const methods = useForm({ defaultValues, resolver: yupResolver(validationSchema), });
       useEffect(() => { setDataPass([passObject]) }, [passObject])





       // fonction use

       const log = (message) => { console.log(message); };








       const { reset, setValue, handleSubmit, watch } = methods;

       const onSubmit = handleSubmit(async (data) => {
              await handleTransaction(data);
              // console.log(data);

       });

       // useGetSponsor( addData )










       return (
              <>
                     <DialogAnnoncePaimentInProcess showDialog={startPaiement} dataGet={dataGet} />
                     <Dialog maxWidth='sm' fullWidth={fullWidth} open={showDialog.value} onClose={showDialog.onFalse}>
                            <FormProvider {...methods}>
                                   <form onSubmit={onSubmit}>
                                          <DialogTitle > <Label variant="soft" color='primary'>Frais de creation  </Label></DialogTitle>

                                          <DialogContent>
                                                 {/* <Stack direction="row" flexWrap="wrap" alignItems="center" mb={ 3 } spacing={ 1.5 }>
                                                 <Typography variant="h6">Selectionner Votre Sponsor</Typography>
                                          </Stack> */}

                                                 <DialogAnnonceBuyCreation items={dataPass} />
                                                 {dataPass.length > 0 && <RHFTextField
                                                        sx={{ mt: 2 }}
                                                        name="numero"
                                                        label="Numero Orange Money"
                                                        placeholder="000"
                                                        type="Number"
                                                        InputLabelProps={{ shrink: true }}
                                                        inputProps={{
                                                               maxLength: 9, // limite à 9 caractères
                                                               inputMode: 'numeric', // clavier numérique sur mobile
                                                               pattern: '[0-9]*', // accepte uniquement les chiffres
                                                        }}
                                                        onInput={(e) => {
                                                               e.target.value = e.target.value.replace(/\D/g, '').slice(0, 9);
                                                        }}
                                                        InputProps={{
                                                               startAdornment: (
                                                                      <InputAdornment position="start">
                                                                             <Box component="span" sx={{ color: 'text.disabled' }}>
                                                                                    OM
                                                                             </Box>
                                                                      </InputAdornment>
                                                               ),
                                                               endAdornment: (
                                                                      <InputAdornment position="start">
                                                                             <Box component="span" sx={{ color: 'text.disabled' }}>
                                                                                    FCFA
                                                                             </Box>
                                                                      </InputAdornment>
                                                               ),
                                                        }}
                                                 />
                                                 }


                                          </DialogContent>

                                          <DialogActions>
                                                 <Button color="inherit" variant="outlined" onClick={() => {
                                                        // setSubmiting(false);
                                                        showDialog.onFalse()
                                                 }
                                                 }
                                                 >
                                                        Annuler
                                                 </Button>

                                                 <LoadingButton color='primary' type="submit" variant="contained" loading={submiting}>
                                                        Payer
                                                 </LoadingButton>
                                          </DialogActions>
                                   </form>
                            </FormProvider>
                     </Dialog >
              </>
       );

}

DialogAnnonceBuy.propTypes = {
       showDialog: PropTypes.shape({
              value: PropTypes.bool,
              onTrue: PropTypes.func,
              onFalse: PropTypes.func,
              toggle: PropTypes.func,
       }).isRequired,

       startPaiement: PropTypes.shape({
              value: PropTypes.bool,
              onTrue: PropTypes.func,
              onFalse: PropTypes.func,
              toggle: PropTypes.func,
       }),

       dataGet: PropTypes.object,
       updateDataAfterSucces: PropTypes.func
};