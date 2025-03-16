import { enqueueSnackbar } from "notistack";
import { HOST_PORT, HOST_URL } from "src/config-global"; import axiosInstance from "src/utils/axios";

export async function request( data )
{
       // console.log( `Envoi d'une requête pour récupérer l'utilisateur avec ID ${ email }` );
       try
       {

              // console.log( 'reauette envoye :', data.email );

              const response = await axiosInstance.get( `${ HOST_URL }:${ HOST_PORT }/transactions/${ data.email }` );

              // response = await axiosInstance.get( `http://192.168.1.122:5000/annonces` );



              return response.data;

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