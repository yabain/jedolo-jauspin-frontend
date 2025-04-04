import { enqueueSnackbar } from "notistack";
import { HOST_PORT, HOST_BACKEND_URL } from "src/config-global"; import axiosInstance from "src/utils/axios";

export async function request( data )
{
       // console.log( `Envoi d'une requête pour récupérer l'utilisateur avec ID ${ email }` );
       try
       {
              // const response = await axiosInstance.get( `${ endpoints.user.get }/${ userID }` );

              let response

              if ( data.type === 'user' )
              {


                     response = await axiosInstance.get( `${ HOST_BACKEND_URL }/comments/${ data.annonceId }` );

                     // response = await axiosInstance.get( `http://192.168.1.122:5000/annonces` );


              }

              if ( data.type === 'admin' )
              {


                     // response = await axiosInstance.get( `${HOST_BACKEND_URL}annonces/all` );


              }
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