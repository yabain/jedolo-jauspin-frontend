import { useSnackbar } from "notistack";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAfterRequest } from "src/store/signal/add/reducer";






export function useAddSignal( reset )
{

       const dispatch = useDispatch();
       const { enqueueSnackbar } = useSnackbar();
       const { isFulled, isPending } = useSelector( ( state ) => state.addUserAnnonceSignal );



       const handleReset = useCallback( () => dispatch( resetAfterRequest() ), [ dispatch ] );
       const handleEnque = useCallback( () => enqueueSnackbar( "Annonce signalée !" ), [ enqueueSnackbar ] )



       useEffect( () => { if ( isFulled && !isPending && reset ) reset() }, [ isFulled, isPending, reset ] );
       useEffect( () => { if ( isFulled && !isPending ) handleReset(); }, [ isFulled, isPending, handleReset ] );
       useEffect( () => { if ( isFulled && !isPending ) handleEnque(); }, [ isFulled, isPending, handleEnque ] );


}