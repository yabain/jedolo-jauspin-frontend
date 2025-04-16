import { useSnackbar } from "notistack";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "src/auth/hooks";
import { request, resetAfterRequest } from "src/store/users/updateprofile/reducer";






export function useUpdateProfil() {

       const dispatch = useDispatch();
       const { user } = useAuthContext()
       const { enqueueSnackbar } = useSnackbar();
       const { data, isFulled, isPending, isError } = useSelector((state) => state.updateUserProfil);





       const handleReset = useCallback(() => dispatch(resetAfterRequest()), [dispatch]);
       const handleEnque = useCallback(() => enqueueSnackbar("profil mis a jour avec success !"), [enqueueSnackbar])
       const handleError = useCallback(() => enqueueSnackbar("Une erreur lors de la requette!", { variant: "error" }), [enqueueSnackbar]);
       const handleSucces = useCallback(() => { const userUpdate = { ...user, ...data }; localStorage.setItem('user', JSON.stringify(userUpdate)) }, [user, data])







       // useEffect( () => () => handleReset(), [ handleReset ] );
       useEffect(() => { if (isFulled && !isPending) handleReset() }, [isFulled, isPending, handleReset]);
       useEffect(() => { if (isFulled && !isPending) { handleEnque(); handleSucces() } }, [isFulled, isPending, handleEnque, handleSucces]);
       // useEffect(() => { if (isFulled && !isPending) resetAfterSuccess() }, [isFulled, isPending, resetAfterSuccess]);
       // useEffect(() => { if (isFulled && !isPending && updateDataAfterSucces) updateDataAfterSucces() }, [isFulled, isPending, updateDataAfterSucces]);





       // useEffect( () => { if ( isError && reset ) reset() }, [ isError, reset ] );
       // useEffect(() => { if (isError) handleError() }, [isError, handleError]);
       // useEffect(() => { if (isError) resetAfterSuccess() }, [isError, resetAfterSuccess]);


}