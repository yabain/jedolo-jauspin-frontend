import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';
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





export default function DialogConnect( { showDialog } )
{


       // let objectToAdd 

       const navigate = useNavigate();
       const [ fullWidth, setFullWidth ] = useState( true );









       return (
              <Dialog maxWidth="sm" fullWidth={ fullWidth } open={ showDialog.value } onClose={ showDialog.onFalse }>
                     <DialogTitle>
                            <Label variant="soft" color="error">Non connecté</Label>
                     </DialogTitle>

                     <DialogContent>
                            <Stack direction="row" flexWrap="wrap" alignItems="center" mb={ 3 } spacing={ 1.5 }>
                                   <Typography variant="h6">
                                          Vous devez être connecté pour effectuer cette action. 
                                   </Typography>
                                   <Typography variant="h6">
                                           Connectez-vous et réessayez.
                                   </Typography>
                            </Stack>
                     </DialogContent>

                     <DialogActions>
                            <Button color="inherit" variant="outlined" onClick={ showDialog.onFalse }>
                                   Annuler
                            </Button>

                            <Button color="success" variant="contained" onClick={ () =>
                            {
                                   showDialog.onFalse();
                                   navigate( '/auth/jwt/register' );
                            } }>
                                   Inscription
                            </Button>

                            <Button color="success" variant="contained" onClick={ () =>
                            {
                                   showDialog.onFalse();
                                   navigate( '/auth/jwt/login' );
                            } }>
                                   Connexion
                            </Button>
                     </DialogActions>
              </Dialog>
       );
}

DialogConnect.propTypes = {
       showDialog: PropTypes.shape( {
              value: PropTypes.bool,
              onTrue: PropTypes.func,
              onFalse: PropTypes.func,
              toggle: PropTypes.func,
       } ).isRequired,
};