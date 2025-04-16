import { annonceFromStoreRef, filterByArgumentStingRef, globalFilterRef, setValeurRef } from "src/1data/annonces/ref";








export function globalFilterFnctCall(data) {

       globalFilterRef.current?.(data)
}








export function filteredByArgStriingExported(type, value) {

       filterByArgumentStingRef.current?.(annonceFromStoreRef.current, type, value)
}














export const addAnnoncesToUsersList = (dataToAdd) => {

       if (setValeurRef.current) {

              console.log('fonction correctement appeler');
              setValeurRef.current((currentData) => [...currentData, dataToAdd]);

       } else {

              console.warn("setValeurRef n'est pas encore défini !");

       }
       return 1

}









export function deleteObjectFromTabObjetc(annonces, updatedAnnonce) {

       const index = annonces.findIndex(annonce => annonce._id === updatedAnnonce._id);
       if (index === -1) { console.error('Annonce non trouvée dans le tableau'); return annonces; }
       const newAnnonces = [...annonces.slice(0, index), ...annonces.slice(index + 1),];
       return newAnnonces;

}









export function updateObjectFromTabObjetc(annonces, updatedAnnonce) {

       const index = annonces.findIndex(annonce => annonce._id === updatedAnnonce._id);
       if (index === -1) { console.error('Annonce non trouvée dans le tableau'); return annonces; }
       const newAnnonces = [...annonces.slice(0, index), updatedAnnonce, ...annonces.slice(index + 1),];
       return newAnnonces;

}









export function deleteAnnonceInArray(annonces, updatedAnnonce) {


       console.log('recu', annonces.length);
       const index = annonces.findIndex(annonce => String(annonce._id) === String(updatedAnnonce._id));
       if (index === -1) { console.error('Annonce non trouvée dans le tableau'); return annonces; }
       const newAnnonces = [...annonces.slice(0, index), ...annonces.slice(index + 1),];
       console.log('final renvoye', newAnnonces.length);

       return newAnnonces;

}









export function updateAnnonceInArray(annonces, updatedAnnonce) {

       console.log('updateAnnonceInArray', updatedAnnonce._id);
       const index = annonces.findIndex(annonce => String(annonce._id) === String(updatedAnnonce._id));

       console.log(`Index trouvé : ${index}`);

       if (index === -1) { console.error('Annonce non trouvée dans le tableau'); return annonces; }
       const newAnnonces = [...annonces.slice(0, index), updatedAnnonce, ...annonces.slice(index + 1),];

       console.log('nouvelle Annonces dans le store', newAnnonces);
       return newAnnonces;
}



















export function calculateRatingCounts(commentsArray) {
       const counts = [0, 0, 0, 0, 0]; // index 0 → 1 étoile, index 4 → 5 étoiles

       commentsArray.forEach((item) => {
              if (item.rating >= 1 && item.rating <= 5) {
                     counts[item.rating - 1] += 1;
              }
       });

       return [
              { name: "1 etoile", starCount: counts[0] },
              { name: "2 etoile", starCount: counts[1] },
              { name: "3 etoile", starCount: counts[2] },
              { name: "4 etoile", starCount: counts[3] },
              { name: "5 etoile", starCount: counts[4] },
       ];
};



















export function updateRatingsWithNewComment(newComment, setRating) {
       if (newComment.rating >= 1 && newComment.rating <= 5) {
              setRating((prevRatings) =>
                     prevRatings.map((ratingObj, index) => {
                            if (index === newComment.rating - 1) {
                                   return {
                                          ...ratingObj,
                                          starCount: ratingObj.starCount + 1,
                                   };
                            }
                            return ratingObj;
                     })
              );
       }
};



















export function updateRatingsWithNewCommentWhithoutState(newComment, prevRatings) {
       if (newComment.rating >= 1 && newComment.rating <= 5) {
              return prevRatings.map((ratingObj, index) => {
                     if (index === newComment.rating - 1) {
                            return {
                                   ...ratingObj,
                                   starCount: ratingObj.starCount + 1,
                            };
                     }
                     return ratingObj;
              });
       }
       return prevRatings; // Retourne le tableau inchangé si la condition n'est pas remplie
}



















export function calculerMoyenneEtoiles(data2) {
       let totalVotes = 0;
       let totalPoints = 0;

       // console.log( 'comment get', data2 );

       data2.forEach((item, index) => {
              const etoile = index + 1; // 1 à 5 étoiles
              totalVotes += item.starCount;
              totalPoints += etoile * item.starCount;
       });
       if (totalVotes === 0) {
              // console.log( 'Aucun vote, la moyenne est 0' );
              return 0; // Retourne 0 si aucun vote n'a été enregistré
       }


       const moyenne = totalPoints / totalVotes;
       // console.log('pts mm', moyenne.toFixed(2));
       return moyenne.toFixed(2); // arrondi à 2 décimales
}