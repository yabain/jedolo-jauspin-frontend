import { enqueueSnackbar } from 'notistack';
import { HOST_FRONT_PROD, tokenUser } from 'src/config-global';
import axiosInstance from 'src/utils/axios';









export async function request(userId) {
       console.log("Envoi d'une requête pour recupperer le le profil utilisateur:", userId);
       try {
              const response = await axiosInstance.get(`${HOST_FRONT_PROD}/user/profile/${userId}`, { headers: { Authorization: `Bearer ${tokenUser()}` } });
              console.log('Réponse de la requête :', response.data);
              return response;
       } catch (error) {
              enqueueSnackbar(error.message, {
                     variant: 'error',
              });
              console.error('Erreur lors de la requête :', error);
              throw error;
       }
}






