import { useCallback } from "react";

export function useExtractUserData(userId, isFulled, fetchProfileRequest, handleSucces, setIsFulled) {


    return useCallback(async () => {
        if (!isFulled && userId !== undefined) {
            const response = await fetchProfileRequest();
            handleSucces(response.data.data);
            setIsFulled(true);
        }
    }, [userId, isFulled, fetchProfileRequest, handleSucces, setIsFulled]);
}