import { useSnackbar } from "notistack";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request, resetAfterRequest } from "src/store/users/disable/reducer";






export function useDisable( resetAfterSuccess, dataGet, updateDataAfterSucces )
{

       const dispatch = useDispatch();
       const { enqueueSnackbar } = useSnackbar();
       const { data, isFulled, isPending, isError } = useSelector( ( state ) => state.disableUsers );





       const handleReset = useCallback( () => dispatch( resetAfterRequest() ), [ dispatch ] );
       const handleEnque = useCallback( () => enqueueSnackbar( "Compte désactiver avec success !" ), [ enqueueSnackbar ] )
       const handleError = useCallback( () => enqueueSnackbar( "Une erreur lors de la requette!", { variant: "error" } ), [ enqueueSnackbar ] );






       // useEffect( () => () => handleReset(), [ handleReset ] );
       useEffect( () => { if ( isFulled && !isPending ) handleReset() }, [ isFulled, isPending, handleReset ] );
       useEffect( () => { if ( isFulled && !isPending ) handleEnque(); }, [ isFulled, isPending, handleEnque ] );
       useEffect( () => { if ( isFulled && !isPending ) resetAfterSuccess() }, [ isFulled, isPending, resetAfterSuccess ] );
       useEffect( () => { if ( isFulled && !isPending && updateDataAfterSucces ) updateDataAfterSucces() }, [ isFulled, isPending, updateDataAfterSucces ] );





       // useEffect( () => { if ( isError && reset ) reset() }, [ isError, reset ] );
       useEffect( () => { if ( isError ) handleError() }, [ isError, handleError ] );
       useEffect( () => { if ( isError ) resetAfterSuccess() }, [ isError, resetAfterSuccess ] );


}