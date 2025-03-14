import { useSnackbar } from "notistack";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request, resetAfterRequest } from "src/store/sponsor/update/reducer";






export function useUpdateSponsor( resetAfterSuccess, updateDataAfterSucces )
{

       const dispatch = useDispatch();
       const { enqueueSnackbar } = useSnackbar();
       const { data, isFulled, isPending, isError } = useSelector( ( state ) => state.updateSponsor );





       const handleReset = useCallback( () => dispatch( resetAfterRequest() ), [ dispatch ] );
       const handleEnque = useCallback( () => enqueueSnackbar( "Sponsor modifier avec success !" ), [ enqueueSnackbar ] )
       const handleError = useCallback( () => enqueueSnackbar( "Une erreur lors de recuperation des categories!", { variant: "error" } ), [ enqueueSnackbar ] );






       useEffect( () => () => handleReset(), [ handleReset ] );
       useEffect( () => { if ( isFulled && !isPending ) handleReset() }, [ isFulled, isPending, handleReset ] );
       useEffect( () => { if ( isFulled && !isPending ) handleEnque(); }, [ isFulled, isPending, handleEnque ] );
       useEffect( () => { if ( isFulled && !isPending ) resetAfterSuccess() }, [ isFulled, isPending, resetAfterSuccess ] );
       useEffect( () => { if ( isFulled && !isPending && updateDataAfterSucces ) updateDataAfterSucces() }, [ isFulled, isPending, updateDataAfterSucces ] );





       // useEffect( () => { if ( isError && reset ) reset() }, [ isError, reset ] );
       // useEffect( () => { if ( isError ) handleReset() }, [ isError, handleReset ] );
       useEffect( () => { if ( isError ) handleError() }, [ isError, handleError ] );


}