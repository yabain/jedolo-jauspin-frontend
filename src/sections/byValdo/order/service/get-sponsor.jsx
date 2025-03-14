import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request, resetAfterRequest } from "src/store/sponsor/get/reducer";






export function useGetSponsor( dataGet )
{

       const dispatch = useDispatch();
       const { enqueueSnackbar } = useSnackbar();
       const [ isLoad, setIsLoad ] = useState( false )
       const { data, isFulled, isPending, isError } = useSelector( ( state ) => state.getSponsors );





       const handleReset = useCallback( () => dispatch( resetAfterRequest() ), [ dispatch ] );
       const handleEnque = useCallback( () => enqueueSnackbar( "Categorie recuperer avec success !" ), [ enqueueSnackbar ] )
       const handleError = useCallback( () => enqueueSnackbar( "Une erreur lors de recuperation des categories!", { variant: "error" } ), [ enqueueSnackbar ] );






       useEffect( () => () => handleReset(), [ handleReset ] );
       useEffect( () => { if ( !isFulled && !isPending ) dispatch( request() ); }, [ isFulled, isPending, dispatch ] );
       useEffect( () => { if ( isFulled && !isPending && !isLoad ) { dataGet( data ); setIsLoad( true ) } }, [ isLoad, isFulled, isPending, dataGet, data ] );
       useEffect( () => { if ( isFulled && !isPending ) handleEnque(); }, [ isFulled, isPending, handleEnque ] );





       // useEffect( () => { if ( isError && reset ) reset() }, [ isError, reset ] );
       // useEffect( () => { if ( isError ) handleReset() }, [ isError, handleReset ] );
       useEffect( () => { if ( isError ) handleError() }, [ isError, handleError ] );


}