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
