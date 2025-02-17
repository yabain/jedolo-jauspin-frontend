import { enqueueSnackbar } from "notistack";
import axiosInstance from "src/utils/axios";

export async function request()
{
       // console.log( `Envoi d'une requête pour récupérer l'utilisateur avec ID ${ email }` );
       try
       {
              // const response = await axiosInstance.get( `${ endpoints.user.get }/${ userID }` );
              const response = await axiosInstance.get( `http://localhost:5000/annonces/all` );
              // console.log( 'Réponse retourner :', response );
              // console.log( 'Réponse de la requête :', response.data );
              return response.data;
       } catch ( error )
       {
              enqueueSnackbar( error.message, {
                     variant: 'error',
              } );
              console.error( 'Erreur lors de la requête :', error );
              throw error;
       }
}