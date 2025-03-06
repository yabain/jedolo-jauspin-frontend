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
app.post( "/users", ( req, res ) =>
{
       const { email, ...rest } = req.body;
       let data = readData();

       if ( !email )
       {

              return res.status( 400 ).json( { error: "L'email est obligatoire." } );
       }

       if ( data.users[ email.trim() ] )
       {
              return res.status( 400 ).json( { error: "L'email existe déjà." } );
       }

       data.users[ email.trim() ] = { ...rest, annonces: [] };
       writeData( data );

       res.json( { success: true, user: data.users[ email.trim() ] } );
} );

// 🔹 Récupérer un utilisateur
app.get( "/users/:email", ( req, res ) =>
{
       const { email } = req.params;
       let data = readData();

       if ( !data.users[ email.trim() ] )
       {
              return res.status( 404 ).json( { error: "Utilisateur non trouvé." } );
       }

       res.json( data.users[ email.trim() ] );
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

// ✅ **ANNONCES**
// 🔹 Ajouter une annonce
app.post( "/annonces/:email", ( req, res ) =>
{
       const { email } = req.params;
       const { ...rest } = req.body;
       let data = readData();


       if ( !data.users[ email.trim() ] )
       {
              return res.status( 404 ).json( { "error": "Utilisateur non trouvé." } );
       }

       const newAnnonce = { "id": Date.now(), ...rest };


       data.users[ email.trim() ].annonces.push( newAnnonce );
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
app.get( "/annonces/:email", ( req, res ) =>
{
       const { email } = req.params;
       let data = readData();

       if ( !data.users[ email.trim() ] )
       {
              return res.status( 404 ).json( { error: "Utilisateur non trouvé." } );
       }

       res.json( data.users[ email.trim() ].annonces );
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

       let annonce = data.users[ email.trim() ].annonces.find( a => a.id == id );
       if ( !annonce )
       {
              return res.status( 404 ).json( { error: "Annonce non trouvée." } );
       }

       Object.assign( annonce, req.body );

       // Modifier l'annonce dans la liste globale
       let annonceGlobale = data.annonces.find( a => a.id == id );
       if ( annonceGlobale )
       {
              Object.assign( annonceGlobale, req.body );
       }

       writeData( data );

       io.emit( "update-annonce", req.body ); // Emission de l'événement 'new-annonce'

       res.json( { success: true, annonce } );
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

       let annonce = data.users[ email.trim() ].annonces.find( a => a.id == id );
       if ( !annonce )
       {
              return res.status( 404 ).json( { error: "Annonce non trouvée." } );
       }

       Object.assign( annonce, req.body );

       // Modifier l'annonce dans la liste globale
       let annonceGlobale = data.annonces.find( a => a.id == id );
       if ( annonceGlobale )
       {
              Object.assign( annonceGlobale, req.body );
       }

       writeData( data );

       io.emit( "banned-annonce", req.body ); // Emission de l'événement 'new-annonce'

       res.json( { success: true, annonce } );
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
       Object.keys( data.users ).forEach( email =>
       {
              data.users[ email.trim() ].annonces = data.users[ email.trim() ].annonces.filter( a => a.id != id );
       } );

       writeData( data );
       io.emit( "delete-annonce", { id } ); // Émettre l'ID de l'annonce supprimée

       res.json( { success: true, message: "Annonce supprimée." } );
} );


// ✅ **CATÉGORIES**
// 🔹 Ajouter une catégorie
app.post( "/categories", ( req, res ) =>
{
       const { name } = req.body;
       let data = readData();

       if ( !name )
       {
              return res.status( 400 ).json( { error: "Le nom de la catégorie est obligatoire." } );
       }

       if ( data.categories.includes( name ) )
       {
              return res.status( 400 ).json( { error: "Catégorie déjà existante." } );
       }

       data.categories.push( name );
       writeData( data );

       res.json( { success: true, categories: data.categories } );
} );

// 🔹 Récupérer toutes les catégories
app.get( "/categories", ( req, res ) =>
{
       const data = readData();
       res.json( data.categories );
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

server.listen( PORT, () => console.log( `🚀 Serveur lancé sur http://localhost:${ PORT }` ) );
