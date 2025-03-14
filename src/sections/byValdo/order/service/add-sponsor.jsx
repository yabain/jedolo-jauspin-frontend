import { useSnackbar } from "notistack";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAfterRequest } from "src/store/sponsor/add/reducer";






export function useAddSponsor( reset )
{

       const dispatch = useDispatch();
       const { enqueueSnackbar } = useSnackbar();
       const { isFulled, isPending, isError } = useSelector( ( state ) => state.addSponsor );



       const handleReset = useCallback( () => dispatch( resetAfterRequest() ), [ dispatch ] );
       const handleEnque = useCallback( () => enqueueSnackbar( "Categorie ajouter avec success !" ), [ enqueueSnackbar ] )
       const handleError = useCallback( () => enqueueSnackbar( "Une erreur est survenue !", { variant: "error" } ), [ enqueueSnackbar ] );




       useEffect( () => { if ( isFulled && !isPending && reset ) reset() }, [ isFulled, isPending, reset ] );
       useEffect( () => { if ( isFulled && !isPending ) handleReset(); }, [ isFulled, isPending, handleReset ] );
       useEffect( () => { if ( isFulled && !isPending ) handleEnque(); }, [ isFulled, isPending, handleEnque ] );





       useEffect( () => { if ( isError && reset ) reset() }, [ isError, reset ] );
       useEffect( () => { if ( isError ) handleReset() }, [ isError, handleReset ] );
       useEffect( () => { if ( isError ) handleError() }, [ isError, handleError ] );


}