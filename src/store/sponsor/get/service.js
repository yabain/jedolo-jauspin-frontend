import { enqueueSnackbar } from "notistack";
import { HOST_PORT, HOST_BACKEND_URL } from "src/config-global"; import axiosInstance from "src/utils/axios";

export async function request( data )
{

       try
       {


              // let response
              // alert( `Erreur: $reussi` );
              // console.log( 'Réponse retourner :', response );
              // console.log( 'Réponse de la requête :', response.data );
              // console.log( `Envoi d'une requête pour récupérer l'utilisateur avec ID ${ email }` );
              // const response = await axiosInstance.get( `${ endpoints.user.get }/${ userID }` );
              // if ( data.type === 'user' ) response = await axiosInstance.get( `${HOST_BACKEND_URL}sponsor` )
              // if ( data.type === 'admin' ) response = await axiosInstance.get( `${HOST_BACKEND_URL}annonces/all` )              





              const response = await axiosInstance.get( `${ HOST_BACKEND_URL }/sponsor` );
              return response.data;


       } catch ( error )
       {
              // alert( `Erreur: ${ error }` );
              enqueueSnackbar( error, { variant: 'error', } );
              console.error( 'Erreur lors de la requête :', error );
              throw error;
       }
}