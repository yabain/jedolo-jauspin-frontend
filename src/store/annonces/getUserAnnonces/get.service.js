import { enqueueSnackbar } from "notistack";
import { HOST_PORT, HOST_BACKEND_URL, HOST_FRONT_PROD, tokenUser } from "src/config-global"; import axiosInstance from "src/utils/axios";

export async function getList(id) {
       // console.log( `Envoi d'une requête pour récupérer l'utilisateur avec ID ${ id }` );
       try {
              // const response = await axiosInstance.get( `${ endpoints.user.get }/${ userID }` );
              const response = await axiosInstance.get(`${HOST_FRONT_PROD}/annonce/user/${id}`, { headers: { Authorization: `Bearer ${tokenUser()}` } });
              // console.log( 'Réponse de la requête :', response.data );
              return response;
       } catch (error) {
              enqueueSnackbar(error.message, {
                     variant: 'error',
              });
              console.error('Erreur lors de la requête :', error);
              throw error;
       }
}