import { useBoolean } from 'src/hooks/use-boolean';
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
import { useAdd } from 'src/1VALDO/hook/transaction/add';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHandleTransaction } from 'src/1VALDO/hook/transaction/use-handle-transaction';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, InputAdornment, Rating, Switch, Typography } from '@mui/material';
import { height, Stack, width } from '@mui/system';
import Label from 'src/components/label';
import { useMiseALaUne } from 'src/1VALDO/hook/annonce/use-mise-aLaUne';
import { useDisable } from 'src/1VALDO/hook/user/disable';
import { request } from 'src/store/transaction/add/reducer';
import { useGetSponsor } from 'src/sections/byValdo/order/service/get-sponsor';
import SponsorItem from '../../sponsor/sponsor-item-list-to-buy';
import DialogALaUneBuyComponent1 from './components/dialog-aLaUne-buy-c1';
import DialogAnnoncePaimentInProcess from '../dialog-annonce-paiment-inProcess ';

export default function DialogALaUneBuy({ showDialog, dataGet }) {
  // let objectToAdd
  console.log('sssssssssssssss a la une appeler', dataGet.name);

  const { handleMiseAlaUne } = useMiseALaUne(true);

  const dispatch = useDispatch();
  const location = useLocation();
  const startPaiement = useBoolean();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const passObject = { id: 0, titre: dataGet?.name, validite: 3, montant: 10, description: 'votre esnnonce est presente dans les annonces a la une ', ...dataGet };
  const additionalFields = { montant: dataGet?.montant || '', validite: dataGet?.validite || '', heure: dataGet?.heure || '' };
  const baseFields = { description: dataGet?.description || '', titre: dataGet?.titre || '', avatarUrl: dataGet?.avatarUrl || null };
  const defaultValues = { numero: '', montant: 10 };

  const [payant, setChecked] = useState(false);
  const [sponsGet, setSponsGet] = useState([]);
  const [dataPass, setDataPass] = useState([passObject]);
  const [fullWidth, setFullWidth] = useState(true);
  const [tableData, setTableData] = useState([]);
  const addData = (tempDataGet) => {
    setTableData(tempDataGet);
    setSponsGet(tempDataGet.map((item) => item.titre));
  };
  const annonce = useMemo(() => location.state?.annonce || null, [location]);

  const resetAfterSuccess = () => {
    reset();
  };

  const handleSuccesTransaction = (token) => {
    console.log('appeler apres la reuisssite de la transaction', token);

    const newAnnonce = { ...dataGet, transactionToken: token, aLaUne: true };
    console.log('data envoyer', newAnnonce);
    handleMiseAlaUne(newAnnonce);
    startPaiement.onFalse();
    showDialog.onFalse();
    enqueueSnackbar('la transaction a ete effectuer avec success');
  };

  const handlePending = () => {
    startPaiement.onTrue();
  };

  const handleCancel = () => {
    startPaiement.onFalse();
    enqueueSnackbar('la transaction a ete annuler veuiller reessayez', { variant: 'error' });
  };

  const handleStart = () => {
    enqueueSnackbar('transaction en cours veuillez patientez');
  };

  const handleError = () => {
    enqueueSnackbar('Erreur lors de la transaction', { variant: 'error' });
  };

  const { handleTransaction, submiting, setSubmiting } = useHandleTransaction(user, resetAfterSuccess, {
    onSuccess: (tokenGet) => handleSuccesTransaction(tokenGet),
    onPending: () => handlePending(),
    onCancelled: () => handleCancel(),
    onstart: () => handleStart(),
    onError: () => handleError(),
  });

  const descriptionValidation = Yup.string().required('Description is required');
  // const ReviewSchema = Yup.object().shape( { description: descriptionValidation } );
  const validationSchema = Yup.object().shape({
    numero: Yup.string()
      .required('Le numéro est requis')
      .matches(/^\d{9}$/, 'Le numéro doit contenir exactement 9 chiffres'),
  });

  const methods = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  // fonction use

  const log = (message) => {
    console.log(message);
  };
  const dataTransaction = useCallback(() => ({ id: Date.now(), transactorEmail: user?.email, type: 'mise a la une', dataType: [], date: Date.now(), montant: 6000, statut: 'paid', anonnceId: dataGet?.id, anonnceName: dataGet?.name }), [user?.email, dataGet?.name, dataGet?.id]);

  const { reset, setValue, handleSubmit, watch } = methods;

  const afterTransactionadd = () => {
    startPaiement.onTrue();
    showDialog.onFalse();
  };

  const onSubmit = handleSubmit(async (data) => {
    await handleTransaction(data);
    //     console.log(data);
  });

  useEffect(() => {
    if (dataGet) {
      const passObject2 = {
        id: dataGet._id,
        titre: `${dataGet?.name}`,
        validite: 3,
        montant: 10,
        description: 'votre annonce est presente dans les annonces a la une',
        ...dataGet,
      };
      setDataPass([passObject2]);
    }
  }, [dataGet]);
  useAdd(undefined, afterTransactionadd);

  return (
    <>
      <DialogAnnoncePaimentInProcess showDialog={startPaiement} dataGet={dataGet} />

      <Dialog maxWidth="sm" fullWidth={fullWidth} open={showDialog.value} onClose={showDialog.onFalse}>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <DialogTitle>
              <Button variant="contained" color="primary">
                Mise a la une
              </Button>
            </DialogTitle>
            <DialogContent>
              {/* <Stack direction="row" flexWrap="wrap" alignItems="center" mb={ 3 } spacing={ 1.5 }>
                                                 <Typography variant="h6">Selectionner Votre Sponsor</Typography>
                                          </Stack> */}

              <DialogALaUneBuyComponent1 items={dataPass} />
              {dataPass.length > 0 && (
                <RHFTextField
                  sx={{ mt: 2 }}
                  name="numero"
                  label="Numero Orange Money"
                  placeholder="000"
                  type="number"
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
              )}
            </DialogContent>

            <DialogActions>
              <Button color="inherit" variant="outlined" onClick={() => showDialog.onFalse()}>
                Annuler
              </Button>

              <LoadingButton color="primary" type="submit" variant="contained" loading={submiting}>
                Payer
              </LoadingButton>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </>
  );
}

DialogALaUneBuy.propTypes = {
  showDialog: PropTypes.shape({
    value: PropTypes.bool,
    onTrue: PropTypes.func,
    onFalse: PropTypes.func,
    toggle: PropTypes.func,
  }).isRequired,

  dataGet: PropTypes.object,
  updateDataAfterSucces: PropTypes.func,
};
