import { enqueueSnackbar } from "notistack";
import { HOST_PORT, HOST_URL } from "src/config-global"; import axiosInstance from "src/utils/axios";

export async function getList( email )
{
       // console.log( `Envoi d'une requête pour récupérer l'utilisateur avec ID ${ email }` );
       try
       {
              // const response = await axiosInstance.get( `${ endpoints.user.get }/${ userID }` );
              const response = await axiosInstance.get( `${ HOST_URL }:${ HOST_PORT }/annonces/${ email }` );
              // console.log( 'Réponse de la requête :', response.data );
              return response;
       } catch ( error )
       {
              enqueueSnackbar( error.message, {
                     variant: 'error',
              } );
              console.error( 'Erreur lors de la requête :', error );
              throw error;
       }
}