import { enqueueSnackbar } from "notistack";
import { HOST_PORT, HOST_BACKEND_URL, HOST_FRONT_PROD, tokenUser } from "src/config-global"; import axiosInstance from "src/utils/axios";

export async function request(data) {
       console.log(`Envoi d'une requête pour récupérer tous les annonces banni non banni`);
       try {
              // const response = await axiosInstance.get( `${ endpoints.user.get }/${ userID }` );

              let response

              // console.log(`${HOST_BACKEND_URL}/annonces`);
              // console.log('http://192.168.1.122:5000/annonces');
              console.log('tyeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeepe', data.type);

              if (data.type === 'admin') {


                     response = await axiosInstance.get(`${HOST_FRONT_PROD}/annonce/all`, { headers: { Authorization: `Bearer ${tokenUser()}` } });
                     return response.data;

              }

              response = await axiosInstance.get(`${HOST_FRONT_PROD}/annonce`);


              // response = await axiosInstance.get( `http://192.168.1.122:5000/annonces` );

              return response.data;

              // console.log( 'Réponse retourner :', response );
              // console.log( 'Réponse de la requête :', response.data );
              // alert( `Erreur: $reussi` );

       } catch (error) {
              // alert( `Erreur: ${ error }` );

              enqueueSnackbar(error, {
                     variant: 'error',
              });
              console.error('Erreur lors de la requête :', error);
              throw error;
       }
}