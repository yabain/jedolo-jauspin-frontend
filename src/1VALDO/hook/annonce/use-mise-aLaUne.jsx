import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnnonceInArray } from 'src/1functions/annonces';
import { HOST_FRONT_PROD, tokenUser } from 'src/config-global';
import { setData } from 'src/store/annonces/data/dataReducer';
import { resetAfterRequest } from 'src/store/annonces/updateAnnonce/reducer';

export function useMiseALaUne(msgAfterReqSuccess = false) {
  // console.log('useeppppppppppppppdaaaaaaateeeeeeeee');

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const annonceFromStore = useSelector((state) => state.annonces.data);
  const { isFulled, isPending, isError } = useSelector((state) => state.updateUserAnnonce);

  const handleReset = useCallback(() => dispatch(resetAfterRequest()), [dispatch]);
  const handleUpdate = useCallback((dataUpdate) => dispatch(setData(updateAnnonceInArray(annonceFromStore, dataUpdate))), [dispatch, annonceFromStore]);
  const handleEnque = useCallback(() => enqueueSnackbar('Mise a la une effectuer avec success !'), [enqueueSnackbar]);
  const handleError = useCallback(() => enqueueSnackbar('Une erreur est survenue !', { variant: 'error' }), [enqueueSnackbar]);

  const handleMiseAlaUne = async (dataUpdate) => {
    try {
      const response = await axios.put(`${HOST_FRONT_PROD}/annonce/${dataUpdate._id}`, { aLaUne: dataUpdate.aLaUne, transactionToken: dataUpdate.transactionToken }, { headers: { Authorization: `Bearer ${tokenUser()}` } });

      handleReset();
      handleUpdate(dataUpdate);
      if (msgAfterReqSuccess) handleEnque();
    } catch (error) {
      handleError();
      console.log('Erreur lors de la mise a la une', error);
    }
  };

  // useEffect( () => { if ( isFulled && !isPending && reset ) reset() }, [ isFulled, isPending, reset ] );
  // useEffect(() => { if (isFulled && !isPending && afterRequestSuccess) afterRequestSuccess(); }, [isFulled, isPending, afterRequestSuccess]);

  // useEffect(() => { if (isError && reset) reset() }, [isError, reset]);
  // useEffect(() => { if (isError) handleReset() }, [isError, handleReset]);

  return { handleMiseAlaUne };
}
