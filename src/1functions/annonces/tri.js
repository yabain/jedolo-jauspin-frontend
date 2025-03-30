export function trierAnnonces( tableau )
{
       return [ ...tableau ] // Création d'une copie pour éviter la mutation
              .sort( ( a, b ) =>
              {
                     const priorite = {
                            premium: 1,
                            top: 2,
                            default: 3, // Toutes les autres annonces, y compris "" ou undefined
                     };

                     const prioriteA = a.sponsored ? priorite[ a.sponsored ] || priorite.default : priorite.default;
                     const prioriteB = b.sponsored ? priorite[ b.sponsored ] || priorite.default : priorite.default;
                     // console.table( resultat.map( item => ( { sponsored: item.sponsored } ) ) );

                     return prioriteA - prioriteB;
              } );
}
