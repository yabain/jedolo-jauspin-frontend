const express = require( "express" );
const cors = require( "cors" );
const fs = require( "fs" );

const http = require( "http" ); // Importation de http pour démarrer le serveur Socket.io
const socketIo = require( "socket.io" ); // Importation de socket.io

const app = express();
const PORT = 5000;


const server = http.createServer( app ); // Créer un serveur HTTP à partir de Express
// const io = socketIo( server ); // Créer une instance de Socket.io
const io = require( "socket.io" )( server, {
       cors: {
              origin: "*",
              methods: [ "*" ], // Ou ["GET", "POST", "PUT", "DELETE", "OPTIONS", etc.]
              allowedHeaders: [ "*" ],
              credentials: true,
       },
} );


app.use( express.json() );
// Configuration CORS pour Express
app.use(
       cors( {
              origin: "*",  // Accepte toutes les origines
              methods: "*",  // Accepte toutes les méthodes HTTP
              allowedHeaders: "*",  // Accepte tous les en-têtes
              credentials: true,  // Autorise les cookies et autres informations d'authentification
       } )
);



const DATA_FILE = "data.json";

// 🔹 Lire les données JSON
const readData = () =>
{
       if ( !fs.existsSync( DATA_FILE ) ) return { "users": {}, "categories": [], annonces: [] };
       // console.log( DATA_FILE );

       return JSON.parse( fs.readFileSync( DATA_FILE, "utf8" ) );
};

// 🔹 Écrire dans le fichier JSON
const writeData = ( data ) =>
{
       fs.writeFileSync( DATA_FILE, JSON.stringify( data, null, 2 ), "utf8" );
};

app.use( ( err, req, res, next ) =>
{
       if ( err instanceof SyntaxError && err.status === 400 && 'body' in err )
       {
              console.error( "❌ Erreur JSON détectée :", err.message );
              return res.status( 400 ).json( { error: "JSON invalide. Vérifiez la syntaxe." } );
       }
       next();
} );
// ✅ **UTILISATEURS**
// 🔹 Ajouter un utilisateur avec des champs dynamiques
app.post( "/auth/register", ( req, res ) =>
{
       const { email, ...rest } = req.body;
       let data = readData();

       if ( !email )
       {

              return res.status( 400 ).json( { error: "L'email est obligatoire." } );
       }

       if ( data.users[ email.trim() ] )
       {
              return res.status( 400 ).json( { message: "L'email existe déjà." } );
       }

       data.users[ email.trim() ] = { ...req.body, id: Date.now() }
       writeData( data );

       res.json( { success: true, user: data.users[ email.trim() ] } );
} );

// 🔹 Récupérer un utilisateur
app.post( "/auth/login", ( req, res ) =>
{
       const { email, ...rest } = req.body;
       let data = readData();

       if ( !data.users[ email.trim() ] )
       {
              return res.status( 404 ).json( { message: "Utilisateur non trouvé." } );
       }

       const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6IlVTRVIiLCJzdWIiOiI2N2UxODVlMzFkN2RlYjFhNjZhYzFhMDAiLCJpYXQiOjE3NDM2MTY1MjYsImV4cCI6MTc0MzY1MjUyNn0.goS8TStxFWN02Z6K38vHH6yiagF_ompwFr1rqblNqiY"
       const user = data.users[ email.trim() ]
       res.json( {
              user: user,
              access_token: access_token,
       } );
} );

// 🔹 Modifier un utilisateur (ajout/modification de champs dynamiques)
app.patch( "/users/:email", ( req, res ) =>
{
       const { email } = req.params;
       let data = readData();

       if ( !data.users[ email.trim() ] )
       {
              return res.status( 404 ).json( { error: "Utilisateur non trouvé." } );
       }

       data.users[ email.trim() ] = { ...data.users[ email.trim() ], ...req.body };
       writeData( data );

       res.json( { success: true, user: data.users[ email.trim() ] } );
} );

// 🔹 Supprimer un utilisateur
app.delete( "/users/:email", ( req, res ) =>
{
       const { email } = req.params;
       let data = readData();

       if ( !data.users[ email.trim() ] )
       {
              return res.status( 404 ).json( { error: "Utilisateur non trouvé." } );
       }

       delete data.users[ email.trim() ];
       writeData( data );

       res.json( { success: true, message: "Utilisateur supprimé." } );
} );

// 🔹 Désactiver un compte utilisateur (mettre isPublic à false)
app.patch( "/user/disable/:email", ( req, res ) =>
{
       const { email } = req.params; // Récupérer l'email depuis les paramètres
       let data = readData();

       // Vérifier si l'utilisateur existe
       if ( !data.users[ email.trim() ] )
       {
              return res.status( 404 ).json( { error: "Utilisateur non trouvé." } );
       }

       // Mettre à jour le champ isPublic à false
       data.users[ email.trim() ].isPublic = false;
       writeData( data );

       // (Optionnel) Émettre un événement Socket.io pour informer les clients
       io.emit( "user-disabled", { email: email.trim(), isPublic: false } );

       res.json( { success: true, message: "Compte utilisateur désactivé.", user: data.users[ email.trim() ] } );
} );


// ✅ **ANNONCES**
// 🔹 Ajouter une annonce
app.post( "/annonces/:email", ( req, res ) =>
{
       const { email } = req.params;
       const { ...rest } = req.body;
       let data = readData();


       // if ( !data.users[ email.trim() ] )
       // {
       //        return res.status( 404 ).json( { "error": "Utilisateur non trouvé." } );
       // }

       const newAnnonce = { "id": Date.now(), ...rest };


       // data.users[ email.trim() ].annonces.push( newAnnonce );
       // console.log( 'donne ajouter au user', data.users[ email.trim() ] );

       data.annonces.push( newAnnonce );

       writeData( data );

       // Informer tous les clients connectés que la nouvelle annonce a été ajoutée
       io.emit( "new-annonce", newAnnonce ); // Emission de l'événement 'new-annonce'

       res.json( { success: true, annonce: newAnnonce } );
} );

// 🔹 Récupérer toutes les annonces (globale)
app.get( "/annonces", ( req, res ) =>
{
       let data = readData();
       const publishedAnnonces = data.annonces.filter( annonce => annonce.publish === "published" );

       res.json( publishedAnnonces );
} );

// 🔹 Récupérer toutes les annonces (globale)
app.get( "/annonces/all", ( req, res ) =>
{
       // return res.json( {
       //        error: "Erreur CORS : L'origine de la requête n'est pas autorisée.",
       //        origin: req.headers,
       // } );

       let data = readData();
       const publishedAnnonces = data.annonces;

       res.json( publishedAnnonces );
} );


// 🔹 Récupérer toutes les annonces à la une (globale)
app.get( "/annonces/a-la-une", ( req, res ) =>
{
       let data = readData();

       // Filtrer les annonces pour ne retourner que celles à la une
       const featuredAnnonces = data.annonces.filter( annonce =>
              annonce.aLaUne === true
       );

       res.json( featuredAnnonces );
} );

// 🔹 Récupérer les annonces d'un utilisateur
// 🔹 Récupérer les annonces d'un utilisateur (parcourir les annonces globales)
app.get( "/annonces/:email", ( req, res ) =>
{
       const { email } = req.params;
       let data = readData();

       // Parcourir les annonces globales et filtrer celles dont l'email correspond
       const userAnnonces = data.annonces.filter( annonce => annonce.userEmail === email.trim() );

       // Si aucune annonce n'est trouvée, retourner un tableau vide
       if ( userAnnonces.length === 0 )
       {
              return res.status( 404 ).json( { error: "Aucune annonce trouvée pour cet utilisateur." } );
       }

       // Retourner les annonces filtrées
       res.json( userAnnonces );
} );

// 🔹 Modifier une annonce
app.patch( "/annonces/:email/:id", ( req, res ) =>
{

       // console.log( 'data a modifer recu', req );

       const { email, id } = req.params;
       let data = readData();

       if ( !data.users[ email.trim() ] )
       {
              return res.status( 404 ).json( { error: "Utilisateur non trouvé." } );
       }

       // let annonce = data.users[ email.trim() ].annonces.find( a => a.id == id );
       // if ( !annonce )
       // {
       //        return res.status( 404 ).json( { error: "Annonce non trouvée." } );
       // }


       // Modifier l'annonce dans la liste globale
       let annonceGlobale = data.annonces.find( a => a.id == id );
       if ( annonceGlobale )
       {
              Object.assign( annonceGlobale, req.body );
       }

       writeData( data );

       console.log( req.body );

       io.emit( "update-annonce", req.body ); // Emission de l'événement 'new-annonce'

       res.json( { success: true, annonce: annonceGlobale } );
} );




// 🔹 bannir une annonce
app.patch( "/annonces/banned/:email/:id", ( req, res ) =>
{

       // console.log( 'data a modifer recu', req );

       const { email, id } = req.params;
       let data = readData();

       if ( !data.users[ email.trim() ] )
       {
              return res.status( 404 ).json( { error: "Utilisateur non trouvé." } );
       }

       // let annonce = data.users[ email.trim() ].annonces.find( a => a.id == id );
       // if ( !annonce )
       // {
       //        return res.status( 404 ).json( { error: "Annonce non trouvée." } );
       // }

       // Object.assign( annonce, req.body );

       // Modifier l'annonce dans la liste globale
       let annonceGlobale = data.annonces.find( a => a.id == id );
       if ( annonceGlobale )
       {
              Object.assign( annonceGlobale, req.body );
       }

       writeData( data );

       io.emit( "banned-annonce", req.body ); // Emission de l'événement 'new-annonce'

       res.json( { success: true, annonce: annonceGlobale } );
} );



// // 🔹 Supprimer une annonce
// app.delete( "/annonces/:email/:id", ( req, res ) =>
// {
//        const { email, id } = req.params;
//        let data = readData();

//        if ( !data.users[ email.trim() ] )
//        {
//               return res.status( 404 ).json( { error: "Utilisateur non trouvé." } );
//        }

//        data.users[ email.trim() ].annonces = data.users[ email.trim() ].annonces.filter( a => a.id != id );
//        data.annonces = data.annonces.filter( a => a.id != id );
//        writeData( data );
//        io.emit( "delete-annonce", req.body ); // Emission de l'événement 'new-annonce'

//        res.json( { success: true, message: "Annonce supprimée." } );
// } );

// 🔹 Supprimer une annonce avec uniquement l'ID
app.delete( "/annonces/:id", ( req, res ) =>
{
       const { id } = req.params;
       let data = readData();

       // Suppression dans les annonces générales
       data.annonces = data.annonces.filter( a => a.id != id );

       // Suppression chez l'utilisateur
       // Object.keys( data.users ).forEach( email =>
       // {
       //        data.users[ email.trim() ].annonces = data.users[ email.trim() ].annonces.filter( a => a.id != id );
       // } );

       writeData( data );
       io.emit( "delete-annonce", { id } ); // Émettre l'ID de l'annonce supprimée

       res.json( { success: true, message: "Annonce supprimée." } );
} );


// ✅ **CATÉGORIES**
// 🔹 Ajouter un sponsor
app.post( "/sponsor", ( req, res ) =>
{
       let data = readData();
       const sponsor = req.body; // Récupère l'objet entier du body
       const sponsorId = sponsor.id; // Suppose que l'objet contient un champ 'id'

       if ( !sponsorId ) return res.status( 400 ).json( { error: "L'ID de la catégorie est requis.", dataSend: sponsor } );

       // Initialise sponsor comme objet s'il n'existe pas
       if ( !data.sponsor || Array.isArray( data.sponsor ) )
       {
              data.sponsor = [];
       }

       // Ajoute l'objet catégorie avec son ID comme clé
       data.sponsor.push( sponsor );
       writeData( data );
       // console.log( data.sponsor );


       res.json( { success: true, sponsor } );
} );


// 🔹 Modifier un sponsor
app.patch( "/sponsor/:id", ( req, res ) =>
{
       const { id } = req.params; // Récupérer l'ID du sponsor depuis les paramètres
       const updatedSponsor = req.body; // Récupérer les nouvelles données du sponsor depuis le body
       let data = readData();

       // Vérifier si sponsor existe dans les données
       if ( !data.sponsor || !Array.isArray( data.sponsor ) )
       {
              return res.status( 400 ).json( { error: "Aucun sponsor n'existe dans la base de données." } );
       }

       // Trouver l'index du sponsor à modifier
       const sponsorIndex = data.sponsor.findIndex( s => s.id == id );
       if ( sponsorIndex === -1 )
       {
              return res.status( 404 ).json( { error: "Sponsor non trouvé." } );
       }

       // Mettre à jour le sponsor en fusionnant les anciennes et nouvelles données
       data.sponsor[ sponsorIndex ] = { ...data.sponsor[ sponsorIndex ], ...updatedSponsor };
       writeData( data );

       // Émettre un événement Socket.io pour informer les clients de la mise à jour
       io.emit( "update-sponsor", data.sponsor[ sponsorIndex ] );

       res.json( { success: true, sponsor: data.sponsor[ sponsorIndex ] } );
} );


// 🔹 Récupérer toutes les catégories
app.get( "/sponsor", ( req, res ) =>
{
       const data = readData();
       res.json( data.sponsor );
} );


// 🔹 Supprimer une catégorie
app.delete( "/categories/:name", ( req, res ) =>
{
       const { name } = req.params;
       let data = readData();

       if ( !data.categories.includes( name ) )
       {
              return res.status( 404 ).json( { error: "Catégorie non trouvée." } );
       }

       data.categories = data.categories.filter( c => c !== name );
       writeData( data );

       res.json( { success: true, message: "Catégorie supprimée." } );
} );





//comments


// 🔹 Ajouter un commentaire 


// 🔹 Ajouter un commentaire
app.post( "/comments/:userId", ( req, res ) =>
{
       const { userId } = req.params; // ID de l'utilisateur sur lequel on commente
       const comment = req.body; // L'objet représentant le commentaire est passé dans le body

       // Vérifier si le commentaire contient les champs obligatoires


       let data = readData();




       // Créer l'objet comments[userId] s'il n'existe pas
       if ( !data.comments )
       {
              data.comments = {}; // Initialiser l'objet comments s'il n'existe pas
       }
       if ( !data.comments[ userId ] )
       {
              data.comments[ userId ] = []; // Initialiser un tableau si l'utilisateur n'a pas encore de commentaires
       }

       // Ajouter le commentaire à l'objet global des commentaires
       data.comments[ userId ].push( comment );

       writeData( data );

       // Émettre un événement Socket.io pour informer les clients du nouveau commentaire
       io.emit( "new-comment", { userId, comment } );

       res.json( { success: true, comment } );
} );

app.get( "/comments/:userId", ( req, res ) =>
{
       const { userId } = req.params;

       let data = readData();



       // Récupérer les commentaires de l'utilisateur
       const userComments = data.comments[ userId ] || [];

       res.json( { success: true, comments: userComments } );
} );




// 🔹 signaler une annonce
app.post( "/signal/:annonceId/:signaledUserId", ( req, res ) =>
{
       const { annonceId, signaledUserId } = req.params;
       const signal = req.body;

       let data = readData();




       if ( !data.signal ) { data.signal = {} }
       if ( !data.signaledUserAnnonces ) { data.signaledUserAnnonces = {} }


       if ( !data.signal[ annonceId ] ) { data.signal[ annonceId ] = []; }
       if ( !data.signaledUserAnnonces[ signaledUserId ] ) { data.signaledUserAnnonces[ signaledUserId ] = []; }

       data.signal[ annonceId ].push( signal );
       data.signaledUserAnnonces[ signaledUserId ].push( signal );

       writeData( data );

       // Émettre un événement Socket.io pour informer les clients du nouveau signalaire
       io.emit( "new-signal", { annonceId, signal } );

       res.json( { success: true, signal } );
} );

app.get( "/signal/:userId", ( req, res ) =>
{
       const { userId } = req.params;

       let data = readData();



       const signalAnnonce = data.signaledUserAnnonces[ userId ] || [];

       res.json( { success: true, signalAnnonce } );
} );


app.get( "/signal", ( req, res ) =>
{
       const { annonceId } = req.params;

       let data = readData();





       // Récupérer toutes les transactions dans un tableau plat
       const allTransactions = Object.values( data.signal ).flat();

       res.json( { success: true, signalAnnonce: allTransactions } );
} );


// 🔹 Ajouter une transaction
app.post( "/transactions/:transactorEmail", ( req, res ) =>
{
       const { transactorEmail } = req.params; // Email du transactor
       const transaction = req.body; // Objet de la transaction reçu dans le body

       let data = readData();

       // Vérifier si l'utilisateur existe
       if ( !data.users[ transactorEmail.trim() ] )
       {
              return res.status( 404 ).json( { error: "Utilisateur non trouvé." } );
       }

       // Initialiser le tableau des transactions s'il n'existe pas
       if ( !data.transactions )
       {
              data.transactions = {};
       }

       // Initialiser le tableau des transactions pour cet utilisateur s'il n'existe pas
       if ( !data.transactions[ transactorEmail.trim() ] )
       {
              data.transactions[ transactorEmail.trim() ] = [];
       }

       // Ajouter la transaction à la liste des transactions de l'utilisateur
       data.transactions[ transactorEmail.trim() ].push( transaction );
       writeData( data );

       // Émettre un événement Socket.io pour informer les clients de la nouvelle transaction
       io.emit( "new-transaction", { transactorEmail: transactorEmail.trim(), transaction } );

       res.json( { success: true, transaction } );
} );






// 🔹 Récupérer toutes les transactions (retourne un tableau plat)
app.get( "/transactions", ( req, res ) =>
{
       let data = readData();

       // Si aucune transaction n'existe, retourner un tableau vide
       if ( !data.transactions )
       {
              return res.json( { success: true, transactions: [] } );
       }

       // Récupérer toutes les transactions dans un tableau plat
       const allTransactions = Object.values( data.transactions ).flat();

       res.json( { success: true, transactions: allTransactions } );
} );









// 🔹 Récupérer les transactions par email
app.get( "/transactions/:email", ( req, res ) =>
{
       const { email } = req.params; // Email de l'utilisateur
       let data = readData();

       // Si aucune transaction n'existe pour cet email, retourner un tableau vide
       if ( !data.transactions || !data.transactions[ email.trim() ] )
       {
              return res.json( { success: true, transactions: [] } );
       }

       res.json( { success: true, transactions: data.transactions[ email.trim() ] } );
} );











// 🔹 Récupérer les 5 villes avec le plus d'annonces
app.get( "/top-cities", ( req, res ) =>
{
       console.log( 'Requête appelée' );
       let data = readData();

       // Vérifier si des annonces existent
       if ( !data.annonces || data.annonces.length === 0 )
       {
              return res.json( { success: true, cities: [] } );
       }

       // Créer une map pour compter les annonces par ville
       const cityCounts = {};

       data.annonces.forEach( ( annonce ) =>
       {
              let ville = annonce.city[ 0 ]; // Supposons que chaque annonce a un champ "city"

              if ( ville )
              {
                     // Normaliser le nom de la ville
                     ville = normalizeCityName( ville );

                     // Compter les annonces par ville normalisée
                     cityCounts[ ville ] = ( cityCounts[ ville ] || 0 ) + 1;
              }
       } );

       // Convertir la map en un tableau de { ville, count }
       const cityArray = Object.keys( cityCounts ).map( ( ville ) => ( {
              ville,
              count: cityCounts[ ville ],
       } ) );

       // Trier les villes par nombre d'annonces (descendant)
       cityArray.sort( ( a, b ) => b.count - a.count );

       // Retourner les 5 premières villes
       const topCities = cityArray.slice( 0, 5 );

       res.json( { success: true, cities: topCities } );
} );

// Fonction pour normaliser un nom de ville
function normalizeCityName( name )
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











// 🔹 Récupérer le nombre de nouvelles annonces créées récemment
app.get( "/recent-count", ( req, res ) =>
{
       // console.log( 'requete appler' );

       let data = readData();

       // Vérifier si des annonces existent
       if ( !data.annonces || data.annonces.length === 0 )
       {
              return res.json( { success: true, count: 0 } );
       }

       // Définir une limite de temps (par exemple, les annonces créées dans les dernières 24 heures)
       const now = Date.now(); // Timestamp actuel
       const timeLimit = 7 * 24 * 60 * 60 * 1000; // 24 heures en millisecondes
       const recentAnnonces = data.annonces.filter( annonce =>
       {
              return annonce.createdAt && ( now - annonce.createdAt <= timeLimit );
       } );

       // Retourner le nombre d'annonces récentes
       res.json( { success: true, count: recentAnnonces.length } );
} );


server.listen( PORT, () => console.log( `🚀 Serveur lancé sur http://localhost:${ PORT }` ) );
