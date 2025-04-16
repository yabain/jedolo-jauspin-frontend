import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "src/auth/hooks";
import { request, resetAfterRequest } from "src/store/signal/gets/reducer";






export function useGetSignalAnnonces(dataGet, isActive = true) {

       const dispatch = useDispatch();
       const { user } = useAuthContext()
       const { enqueueSnackbar } = useSnackbar();
       const [isLoad, setIsLoad] = useState(false)
       const { data, isFulled, isPending, isError } = useSelector((state) => state.getUsersAnnonceSignals);





       const handleReset = useCallback(() => dispatch(resetAfterRequest()), [dispatch]);
       const handleEnque = useCallback(() => enqueueSnackbar("Annonces Signaler recuperer avec success !"), [enqueueSnackbar])
       const handleError = useCallback(() => enqueueSnackbar("Une erreur lors de la requette!", { variant: "error" }), [enqueueSnackbar]);






       useEffect(() => () => handleReset(), [handleReset]);
       // useEffect(() => { if (isFulled && !isPending && isActive) handleEnque(); }, [isFulled, isPending, isActive, handleEnque]);
       useEffect(() => {
              if (!isFulled && !isPending && !isError && isActive) dispatch(request()); console.log('get signaleir appeler');
       }, [isError, isFulled, isPending, isActive, dispatch]);
       useEffect(() => { if (isFulled && !isPending && isActive && !isLoad) { dataGet(data); setIsLoad(true) } }, [isLoad, isFulled, isPending, isActive, dataGet, data]);





       // useEffect( () => { if ( isError && reset ) reset() }, [ isError, reset ] );
       // useEffect( () => { if ( isError ) handleReset() }, [ isError, handleReset ] );
       useEffect(() => { if (isError) handleError() }, [isError, handleError]);


}