import { enqueueSnackbar } from "notistack";
import axiosInstance from "src/utils/axios";

export async function request()
{
       // console.log( `Envoi d'une requête pour récupérer l'utilisateur avec ID ${ email }` );
       try
       {


              const response = await axiosInstance.get( `http://localhost:5000/transactions` );

              // response = await axiosInstance.get( `http://192.168.1.122:5000/annonces` );


              return response.data;

              // console.log( 'Réponse retourner :', response );
              // console.log( 'Réponse de la requête :', response.data );
              // alert( `Erreur: $reussi` );

       } catch ( error )
       {
              // alert( `Erreur: ${ error }` );

              enqueueSnackbar( error, {
                     variant: 'error',
              } );
              console.error( 'Erreur lors de la requête :', error );
              throw error;
       }
}