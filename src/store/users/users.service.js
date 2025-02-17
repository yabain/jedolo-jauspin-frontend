import { enqueueSnackbar } from 'notistack';
import axiosInstance, { endpoints } from 'src/utils/axios';

export async function getUser( userID )
{
       console.log( `Envoi d'une requête pour récupérer l'utilisateur avec ID ${ userID }` );
       try
       {
              // const response = await axiosInstance.get( `${ endpoints.user.get }/${ userID }` );
              const response = await axiosInstance.get( `https://testapi.postgrad.fr/api/users/${ userID }` );
              console.log( 'Réponse de la requête :', response.data );
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









export async function addUser( userData )
{
       console.log( "Envoi d'une requête pour ajouter un nouvel utilisateur:", userData );
       try
       {
              const response = await axiosInstance.post( endpoints.user.addUser, { ...userData } );
              console.log( 'Réponse de la requête :', response.data );
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









export async function addProfilUser( userData )
{
       console.log( "Envoi d'une requête pour ajouter un nouvel utilisateur:", userData );
       try
       {
              const response = await axiosInstance.post( endpoints.user.addUserProfil, { ...userData } );
              console.log( 'Réponse de la requête :', response.data );
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










export async function updatePassword( PasswordObject )
{
       console.log(
              "Envoi d'une requête pour modifier le mot de passe de l'utilisateur:",
              PasswordObject
       );
       try
       {
              const response = await axiosInstance.post( endpoints.user.updatePassword, { ...PasswordObject } );
              console.log( 'Réponse de la requête :', response.data );
              return response;
       } catch ( error )
       {
              enqueueSnackbar( error.error, {
                     variant: 'error',
              } );
              console.error( 'Erreur lors de la requête :', error );

              throw error; // Autres types d'erreurs (réseau, etc.)
       }
}

export async function uploadImage( imageObject )
{
       console.log( "Envoi d'une requête pour uploader l'image", imageObject );
       try
       {
              const response = await axiosInstance.post( endpoints.user.uploadImage, { ...imageObject } );
              console.log( 'Réponse de la requête :', response.data );
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
