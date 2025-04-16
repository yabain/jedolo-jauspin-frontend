import { useSnackbar } from "notistack";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAnnonceInArray } from "src/1functions/annonces";
import { setData } from "src/store/annonces/data/dataReducer";
import { resetAfterRequest } from "src/store/annonces/updateAnnonce/reducer";






export function useUpdate(reset, afterRequestSuccess, msgAfterReqSuccess = false, dataUpdate = undefined) {

       // console.log('useeppppppppppppppdaaaaaaateeeeeeeee');

       const dispatch = useDispatch();
       const { enqueueSnackbar } = useSnackbar();

       const annonceFromStore = useSelector((state) => state.annonces.data);
       const { isFulled, isPending, isError } = useSelector((state) => state.updateUserAnnonce);



       const handleReset = useCallback(() => dispatch(resetAfterRequest()), [dispatch]);
       const handleUpdate = useCallback(() => dispatch(setData(updateAnnonceInArray(annonceFromStore, dataUpdate))), [dispatch, dataUpdate, annonceFromStore]);
       const handleEnque = useCallback(() => enqueueSnackbar("annonce mis a jour effectuer avec success !"), [enqueueSnackbar])
       const handleError = useCallback(() => enqueueSnackbar("Une erreur est survenue !", { variant: "error" }), [enqueueSnackbar]);




       // useEffect( () => { if ( isFulled && !isPending && reset ) reset() }, [ isFulled, isPending, reset ] );
       useEffect(() => { if (isFulled && !isPending) handleReset(); }, [isFulled, isPending, handleReset]);
       useEffect(() => { if (isFulled && !isPending && dataUpdate !== undefined) handleUpdate(); }, [isFulled, isPending, handleUpdate, dataUpdate]);
       useEffect(() => { if (isFulled && !isPending && afterRequestSuccess) afterRequestSuccess(); }, [isFulled, isPending, afterRequestSuccess]);
       useEffect(() => { if (isFulled && !isPending && msgAfterReqSuccess) handleEnque(); }, [isFulled, isPending, handleEnque, msgAfterReqSuccess]);





       useEffect(() => { if (isError && reset) reset() }, [isError, reset]);
       useEffect(() => { if (isError) handleReset() }, [isError, handleReset]);
       useEffect(() => { if (isError) handleError() }, [isError, handleError]);


}