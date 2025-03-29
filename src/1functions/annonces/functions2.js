export function findMatchingWord( arr1, arr2 )
{
       const matches = [];

       arr2.forEach( item2 =>
       {
              const found = arr1.some( item1 =>
                     item1.toLowerCase().includes( item2.toLowerCase() )
              );
              if ( found )
              {
                     matches.push( item2 );
              }
       } );

       if ( matches.length === 1 ) return matches[ 0 ];
       if ( matches.length > 1 ) return 'tout le monde';

       return null;
}















export function normalizeString( name )
{
       if ( !name ) return '';

       // Convertir en minuscules
       name = name.toLowerCase();

       // Supprimer les accents et autres caractères spéciaux
       name = name.normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );

       // Supprimer les espaces supplémentaires et les caractères non alphabétiques
       name = name.replace( /\s+/g, ' ' ).trim();

       return name;
}