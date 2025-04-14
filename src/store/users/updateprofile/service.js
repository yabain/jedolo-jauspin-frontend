import { enqueueSnackbar } from 'notistack';
import { HOST_FRONT_PROD, tokenUser } from 'src/config-global';
import axiosInstance from 'src/utils/axios';









export async function request(userData) {
       console.log("Envoi d'une requête pour mettre a jour le profil utilisateur:", userData);
       try {
              const response = await axiosInstance.put(`${HOST_FRONT_PROD}/user/profile/update`, userData, { headers: { Authorization: `Bearer ${tokenUser}` } });
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






