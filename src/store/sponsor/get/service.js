import { enqueueSnackbar } from "notistack";
import axiosInstance from "src/utils/axios";

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
              // if ( data.type === 'user' ) response = await axiosInstance.get( `http://localhost:5000/sponsor` )
              // if ( data.type === 'admin' ) response = await axiosInstance.get( `http://localhost:5000/annonces/all` )              





              const response = await axiosInstance.get( `http://localhost:5000/sponsor` );
              return response.data;


       } catch ( error )
       {
              // alert( `Erreur: ${ error }` );
              enqueueSnackbar( error, { variant: 'error', } );
              console.error( 'Erreur lors de la requête :', error );
              throw error;
       }
}