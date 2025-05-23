import { enqueueSnackbar } from "notistack";
import { HOST_PORT, HOST_BACKEND_URL } from "src/config-global"; import axiosInstance from "src/utils/axios";














export async function request( data )
{

       console.log( `Envoi d'une requête pour ajouter ${ data.data.id }` );
       try
       {

              console.log( 'requette pour ajouter appeler' );

              const response = await axiosInstance.post( `${ HOST_BACKEND_URL }/transactions/${ data.transactorEmail }`, { ...data.data } );
              console.log( 'Réponse de la requête :', response.data );
              return response;


       } catch ( error )
       {


              enqueueSnackbar( error.message, { variant: 'error', } );
              console.error( 'Erreur lors de la requête :', error );
              throw error;


       }

}