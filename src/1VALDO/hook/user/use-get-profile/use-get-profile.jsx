import { useSnackbar } from "notistack";
import axiosInstance from 'src/utils/axios';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "src/auth/hooks";
import { HOST_FRONT_PROD, tokenUser } from "src/config-global";
import { request, resetAfterRequest } from "src/store/users/getProfil/reducer";
import { useNavigate } from "react-router";






export function useGetProfil(userId, handleSucces) {


       const { user } = useAuthContext()

       const navigate = useNavigate()
       const dispatch = useDispatch();
       const { enqueueSnackbar } = useSnackbar();









       const [isError, setIsError] = useState(false);
       const [isFulled, setIsFulled] = useState(false);
       const [isPending, setIsPending] = useState(false);









       const url = `${HOST_FRONT_PROD}/user/profile/${userId}`;
       const headers = useMemo(() => ({ Authorization: `Bearer ${tokenUser()}` }), []);









       const handleError = useCallback(() => navigate('/404'), [navigate]);
       const handleEnque = useCallback(() => enqueueSnackbar("profil recuperer avec success !"), [enqueueSnackbar])














       const extraActionUserId = useCallback((async () => { setIsFulled(true); handleSucces(undefined); }), [handleSucces]);
       useEffect(() => { if (userId === undefined) { extraActionUserId() } }, [userId, extraActionUserId])














       const get = useCallback((() => axiosInstance.get(url, { headers })), [headers, url]);
       const onSucces = useCallback(((response) => { handleSucces(response.data.data); setIsFulled(true); }), [handleSucces])
       const requet = useCallback((async () => { const response = await get(); onSucces(response) }), [get, onSucces]);
       const getUserProfile = useCallback((async () => { try { await requet(); } catch (error) { handleError(); } }), [requet, handleError])
       useEffect(() => { if (!isFulled && userId !== undefined) { getUserProfile() } }, [isFulled, userId, getUserProfile])














       return { isFulled, isError }

}