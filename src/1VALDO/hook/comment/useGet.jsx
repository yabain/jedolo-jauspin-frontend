import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "src/auth/hooks";
import { request, resetAfterRequest } from "src/store/comments/get/reducer";






export function useGet( dataGet, productGet, isActive = true )
{

       const dispatch = useDispatch();
       const { user } = useAuthContext()
       const { enqueueSnackbar } = useSnackbar();
       const [ isLoad, setIsLoad ] = useState( false )
       const { data, isFulled, isPending, isError } = useSelector( ( state ) => state.getUsersAnnoncesComments );





       const handleReset = useCallback( () => dispatch( resetAfterRequest() ), [ dispatch ] );
       const handleEnque = useCallback( () => enqueueSnackbar( "Commentaire recuperer avec success !" ), [ enqueueSnackbar ] )
       const handleError = useCallback( () => enqueueSnackbar( "Une erreur lors de la requette!", { variant: "error" } ), [ enqueueSnackbar ] );






       useEffect( () => () => handleReset(), [ handleReset ] );
       // useEffect( () => { if ( isFulled && !isPending && isActive ) handleEnque(); }, [ isFulled, isPending, isActive, handleEnque ] );
       useEffect( () => { if ( !isFulled && !isPending && isActive ) dispatch( request( { type: 'user', annonceId: productGet.id } ) ) }, [ productGet, isFulled, isPending, isActive, dispatch ] );
       useEffect( () => { if ( isFulled && !isPending && isActive && !isLoad ) { dataGet( data ); setIsLoad( true ) } }, [ isLoad, isFulled, isPending, isActive, dataGet, data ] );





       // useEffect( () => { if ( isError && reset ) reset() }, [ isError, reset ] );
       // useEffect( () => { if ( isError ) handleReset() }, [ isError, handleReset ] );
       useEffect( () => { if ( isError ) handleError() }, [ isError, handleError ] );


}