import { enqueueSnackbar } from "notistack";
import { HOST_PORT, HOST_BACKEND_URL, HOST_FRONT_PROD, tokenUser } from "src/config-global"; import axiosInstance from "src/utils/axios";














export async function request(data) {

       console.log(`Envoi d'une requête pour ajouter ${data}`);
       try {

              // const response = await axiosInstance.get( `${ endpoints.user.get }/${ userID }` );
              console.log('requette pour ajouter appeler');

              const response = await axiosInstance.post(`${HOST_FRONT_PROD}/useraction`, data, { headers: { Authorization: `Bearer ${tokenUser}` } });
              console.log('Réponse de la requête :', response.data);
              return response;


       } catch (error) {


              enqueueSnackbar(error.message, { variant: 'error', });
              console.error('Erreur lors de la requête :', error);
              throw error;


       }

}