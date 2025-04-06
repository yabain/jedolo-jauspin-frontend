import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'notistack';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { RHFTextField } from 'src/components/hook-form';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useLocation } from 'react-router';
import { request } from 'src/store/signal/add/reducer';
import { useAddSignal } from '../service/addSignal';

export default function DialogSignalAnnonce( { showDialog } )
{


       const dispatch = useDispatch();
       const location = useLocation()
       const { user } = useAuthContext();





       const [ submiting, setSubmiting ] = useState( false )
       const [ fullWidth, setFullWidth ] = useState( true );






       const defaultValues = { comment: '', };
       const annonce = useMemo( () => location.state?.annonce || null, [ location ] );





       const commentValidation = Yup.string().required( 'Comment is required' );
       const ReviewSchema = Yup.object().shape( { comment: commentValidation } );
       const methods = useForm( { resolver: yupResolver( ReviewSchema ), defaultValues, } );





       const { reset, handleSubmit } = methods;

       const annonceToSend = {
              annonceId: annonce.id,
              data: {
                     signaledUserAnnonceId: annonce.userEmail,
                     coverUrl: annonce.coverUrl,
                     aLaUne: annonce.aLaUne,
                     sponsorAnnonce: annonce.sponsored,
                     anonnceName: annonce.name
              }
       }

       // console.log( annonceToSend );

       const resetAfterSuccess = () => { reset(); setSubmiting( false ); showDialog.onFalse() }

       const onSubmit = handleSubmit( ( formData ) =>
       {
              setSubmiting( true );
              dispatch( request( {
                     ...annonceToSend,
                     data: {
                            ...annonceToSend.data,
                            ...formData,
                            signalerId: user._id,
                            date: new Date(),
                            signalerEmail: user?.email
                     },
                     signaledUserAnnonceId: annonce.userEmail
              } ) )

              console.log(
                     {
                            ...annonceToSend,
                            data: {
                                   ...annonceToSend.data,
                                   ...formData,
                                   signalerId: user._id,
                                   date: new Date(),
                                   signalerEmail: user?.email
                            }
                     }
              );

       } );






       useAddSignal( resetAfterSuccess )










       return (
              <Dialog maxWidth='sm' fullWidth={ fullWidth } open={ showDialog.value } onClose={ showDialog.onFalse }>
                     <FormProvider { ...methods }>
                            <form onSubmit={ onSubmit }>
                                   <DialogTitle color='error'> Signaler l&apos;annonce </DialogTitle>

                                   <DialogContent>
                                          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={ 1.5 }>
                                                 <Typography variant="body2">Pourquoi voulez signaler cette annonce ?</Typography>
                                          </Stack>

                                          <RHFTextField name="comment" label="Commantaire *" multiline rows={ 3 } sx={ { mt: 3 } } />
                                   </DialogContent>

                                   <DialogActions>
                                          <Button color="inherit" variant="outlined" onClick={ showDialog.onFalse }>
                                                 Annuler
                                          </Button>

                                          <LoadingButton color='error' type="submit" variant="contained" loading={ submiting }>
                                                 Signaler
                                          </LoadingButton>
                                   </DialogActions>
                            </form>
                     </FormProvider>
              </Dialog>

       );

}

DialogSignalAnnonce.propTypes = {
       showDialog: PropTypes.shape( {
              value: PropTypes.bool,
              onTrue: PropTypes.func,
              onFalse: PropTypes.func,
              toggle: PropTypes.func,
       } ).isRequired,
       // data: PropTypes.object,
};