import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from 'src/auth/hooks';
// import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// import { fData } from 'src/utils/format-number';
// import { Controller, FormProvider, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { LoadingButton } from '@mui/lab';
// import { ConfirmDialog } from 'src/components/custom-dialog';
// import { RHFAutocomplete, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, InputAdornment, Rating, Switch, Typography } from '@mui/material';
import { fontSize, height, Stack, width } from '@mui/system';
import Label from 'src/components/label';
import { useDisable } from 'src/1VALDO/hook/user/disable';
import { useGetSponsor } from 'src/sections/byValdo/order/service/get-sponsor';
import { request } from 'src/store/annonces/addAnnonce/reducer';
import { request as buyAnnonceCreationRequest } from 'src/store/transaction/add/reducer';
import { CreationAnnonceTransaction } from 'src/1VALDO/hook/annonce/creationAnnonceTransaction';





export default function DialogAnnoncePaimentInProcess({ showDialog, dataGet, updateDataAfterSucces }) {



       // let objectToAdd 
       const dispatch = useDispatch();
       const location = useLocation()
       const { user } = useAuthContext();
       const [message, setMessage] = useState('');
       const [messageStyle, setMessageStyle] = useState({ color: 'black' });






       const [payant, setChecked] = useState(false);
       const [sponsGet, setSponsGet] = useState([]);
       const [dataPass, setDataPass] = useState([]);
       const [submiting, setSubmiting] = useState(false)
       const [fullWidth, setFullWidth] = useState(true);
       const [tableData, setTableData] = useState([]);
       const addData = (tempDataGet) => { console.log('kkkkkkkkk', tempDataGet); setTableData(tempDataGet); setSponsGet(tempDataGet.map((item) => item.titre)); }
       const annonce = useMemo(() => location.state?.annonce || null, [location]);








       const dataTransaction = useCallback(() => ({ id: Date.now(), transactorEmail: user?.email, type: 'creation annonce', dataType: [], date: Date.now(), montant: 2600, statut: 'paid', anonnceId: dataGet.id, anonnceName: dataGet.name }), [user?.email, dataGet.name, dataGet.id]);





       // fonction use

       const log = (messageGet) => { console.log(messageGet); };



















       return (
              <Dialog maxWidth='xs' fullWidth={fullWidth} open={showDialog.value} onClose={showDialog.onFalse}>

                     <DialogTitle justifyContent="center" display="flex" > <Label variant="soft" color='primary' > Transaction initier </Label></DialogTitle>

                     <DialogContent>
                            <Stack direction="column" flexWrap="wrap" alignItems="center" mb={3} spacing={1.5}>
                                   {/* <Typography variant="h6"><Label variant="soft" color='primary'></Label></Typography> */}
                                   {message === '' && (<Typography variant="h6">Veuiller composer le #150*50# et entre Votre code secret pour Terminer la transaction</Typography>)}

                                   {message !== '' && (<Typography variant="h6" style={messageStyle}>  {message}</Typography>)}
                            </Stack>



                     </DialogContent>

                     {/* {message === '' && <DialogActions>
                            <Button color="error" variant="contained" onClick={() => showDialog.onFalse()}>
                                   Annuler
                            </Button>


                     </DialogActions>} */}

              </Dialog >

       );

}

DialogAnnoncePaimentInProcess.propTypes = {
       showDialog: PropTypes.shape({
              value: PropTypes.bool,
              onTrue: PropTypes.func,
              onFalse: PropTypes.func,
              toggle: PropTypes.func,
       }).isRequired,
       dataGet: PropTypes.object,
       updateDataAfterSucces: PropTypes.func
};