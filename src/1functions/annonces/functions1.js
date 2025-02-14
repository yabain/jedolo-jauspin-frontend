import { setValeurRef } from "src/1data/annonces/ref";














export const addAnnoncesToUsersList = ( dataToAdd ) =>
{

       if ( setValeurRef.current )
       {

              console.log( 'fonction correctement appeler' );
              setValeurRef.current( ( currentData ) => [ ...currentData, dataToAdd ] );

       } else
       {

              console.warn( "setValeurRef n'est pas encore défini !" );

       }
       return 1

}