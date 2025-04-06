import { enqueueSnackbar } from "notistack";
import { HOST_PORT, HOST_BACKEND_URL, HOST_FRONT_PROD } from "src/config-global"; import axiosInstance from "src/utils/axios";














export async function request(data) {

       console.log(`Envoi d'une requête pour supprimer ${data._id}`);
       try {

              // const response = await axiosInstance.get( `${ endpoints.user.get }/${ userID }` );
              const response = await axiosInstance.delete(`${HOST_FRONT_PROD}/annonce/${data._id}`);
              // console.log( 'Réponse de la requête :', response.data );
              return response;


       } catch (error) {


              enqueueSnackbar(error.message, { variant: 'error', });
              console.error('Erreur lors de la requête :', error);
              throw error;


       }

}