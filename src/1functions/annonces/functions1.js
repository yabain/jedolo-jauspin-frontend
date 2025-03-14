import { annonceFromStoreRef, filterByArgumentStingRef, globalFilterRef, setValeurRef } from "src/1data/annonces/ref";








export function globalFilterFnctCall( data )
{

       globalFilterRef.current?.( data )
}








export function filteredByArgStriingExported( type, value )
{

       filterByArgumentStingRef.current?.( annonceFromStoreRef.current, type, value )
}














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









export function deleteObjectFromTabObjetc( annonces, updatedAnnonce )
{

       const index = annonces.findIndex( annonce => annonce.id === updatedAnnonce.id );
       if ( index === -1 ) { console.error( 'Annonce non trouvée dans le tableau' ); return annonces; }
       const newAnnonces = [ ...annonces.slice( 0, index ), ...annonces.slice( index + 1 ), ];
       return newAnnonces;

}









export function updateObjectFromTabObjetc( annonces, updatedAnnonce )
{

       const index = annonces.findIndex( annonce => annonce.id === updatedAnnonce.id );
       if ( index === -1 ) { console.error( 'Annonce non trouvée dans le tableau' ); return annonces; }
       const newAnnonces = [ ...annonces.slice( 0, index ), updatedAnnonce, ...annonces.slice( index + 1 ), ];
       return newAnnonces;

}









export function deleteAnnonceInArray( annonces, updatedAnnonce )
{


       const index = annonces.findIndex( annonce => String( annonce.id ) === String( updatedAnnonce.id ) );
       if ( index === -1 ) { console.error( 'Annonce non trouvée dans le tableau' ); return annonces; }
       const newAnnonces = [ ...annonces.slice( 0, index ), ...annonces.slice( index + 1 ), ];
       return newAnnonces;

}









export function updateAnnonceInArray( annonces, updatedAnnonce )
{

       console.log( 'updateAnnonceInArray', updatedAnnonce.id );
       const index = annonces.findIndex( annonce => String( annonce.id ) === String( updatedAnnonce.id ) );

       console.log( `Index trouvé : ${ index }` );

       if ( index === -1 ) { console.error( 'Annonce non trouvée dans le tableau' ); return annonces; }
       const newAnnonces = [ ...annonces.slice( 0, index ), updatedAnnonce, ...annonces.slice( index + 1 ), ];

       console.log( 'nouvelle Annonces dans le store', newAnnonces );
       return newAnnonces;
}