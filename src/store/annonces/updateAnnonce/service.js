import { enqueueSnackbar } from "notistack";
import { HOST_PORT, HOST_URL } from "src/config-global"; import axiosInstance from "src/utils/axios";














export async function request( data )
{

       // console.log( 'Envoi de la requête pour modifer ', data );
       try
       {

              // const response = await axiosInstance.get( `${ endpoints.user.get }/${ userID }` );
              const response = await axiosInstance.patch( `${ HOST_URL }:${ HOST_PORT }/annonces/${ data.userEmail }/${ data.id }`, data );
              // console.log( 'Réponse de la requête :', response.data );
              return response;


       } catch ( error )
       {


              enqueueSnackbar( error.message, { variant: 'error', } );
              // console.error( 'Erreur lors de la requête :', error );
              throw error;


       }

}