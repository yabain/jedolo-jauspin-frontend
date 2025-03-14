import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import
{
       _tags,
       PRODUCT_SIZE_OPTIONS,
       PRODUCT_GENDER_OPTIONS,
       PRODUCT_COLOR_NAME_OPTIONS,
       PRODUCT_CATEGORY_GROUP_OPTIONS,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
       RHFSelect,
       RHFEditor,
       RHFUpload,
       RHFSwitch,
       RHFTextField,
       RHFMultiSelect,
       RHFAutocomplete,
       RHFMultiCheckbox,
} from 'src/components/hook-form';
import { addAnnoncesToUsersList } from 'src/1functions/annonces';
import { useLocation, useNavigate } from 'react-router';
import { addData, setData } from 'src/store/annonces/data/dataReducer';
import { request, resetAfterRequest } from 'src/store/annonces/addAnnonce/reducer';
import { request as updateAnnoncesRequest, resetAfterRequest as resetAfterUpdate } from 'src/store/annonces/updateAnnonce/reducer'
import { useAuthContext } from 'src/auth/hooks';
import DialogAnnonceBuy from 'src/1VALDO/components/annonces/dialog-annonce-buy';
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

export default function ProductNewEditForm( { currentProduct2 } )
{

       const annonceFromStore = useSelector( ( state ) => state.annonces.data );
       const { user } = useAuthContext()

       const { isFulled, isPending } = useSelector( ( state ) => state.addAnnonces );
       const isFulledUpdate = useSelector( ( state ) => state.updateUserAnnonce.isFulled );
       const isPendingUpdate = useSelector( ( state ) => state.updateUserAnnonce.isPending );

       const [ selectedTag, setSelectedTag ] = useState( null );



       const redirect = useNavigate();
       const dispatch = useDispatch()
       const location = useLocation();
       const [ dataAdded, setDataAdded ] = useState( {} )

       const showDialog = useBoolean()
       const showPaiementStatut = useBoolean()
       const currentProduct = location.state?.data;
       const [ aLaUne, setChecked ] = useState( currentProduct?.aLaUne || false ); // État du switch
       // const currentProduct = location.state !== null ? location.state.data : undefined;
       // console.log( currentProduct );



       const router = useRouter();

       const mdUp = useResponsive( 'up', 'md' );

       const { enqueueSnackbar } = useSnackbar();

       const [ includeTaxes, setIncludeTaxes ] = useState( false );
       const [ dataToAdd, setDataToAdd ] = useState( {} );

       const NewProductSchema = Yup.object().shape( {
              // name: Yup.string().required( 'Name is required' ),
              // images: Yup.array().min( 1, 'Images is required' ),
              // tags: Yup.array().min( 2, 'Must have at least 2 tags' ),
              // category: Yup.string().required( 'Category is required' ),
              // price: Yup.number().moreThan( 0, 'Price should not be $0.00' ),
              // description: Yup.string().required( 'Description is required' ),
              // not required
              taxes: Yup.number(),
              newLabel: Yup.object().shape( {
                     enabled: Yup.boolean(),
                     content: Yup.string(),
              } ),
              saleLabel: Yup.object().shape( {
                     enabled: Yup.boolean(),
                     content: Yup.string(),
              } ),
       } );

       const ville = [


              'bangante', 'bafoussam', 'dschang',
              'yaounde',
              'omnisport',
              'ngousso',
              'douala', 'makepe', 'bonaberi'

       ];

       const catgOptions = [


              'categorie1',
              'categorie2',
              'categorie3',
              'categorie4',


       ];

       const genre = [
              { label: 'Homme', value: 'Homme' },
              { label: 'Femme', value: 'Femme' },
       ];

       const accept = [
              { label: 'Oui', value: 'Oui' },
              { label: 'Non', value: 'Non' },
       ];

       const defaultValues = useMemo(
              () => ( {
                     name: currentProduct?.name || '',
                     description: currentProduct?.description || '',
                     subDescription: currentProduct?.subDescription || '',
                     images: currentProduct?.images || [],
                     //
                     code: currentProduct?.code || '',
                     sku: currentProduct?.sku || '',
                     price: currentProduct?.price || 0,
                     prixMassage: currentProduct?.prixMassage || 0,
                     prixNuit: currentProduct?.prixNuit || 0,
                     prix1coup: currentProduct?.prix1coup || 0,
                     prix2coup: currentProduct?.prix2coup || 0,
                     quantity: currentProduct?.quantity || 0,
                     priceSale: currentProduct?.priceSale || 0,
                     city: currentProduct?.city || [],
                     categorie: currentProduct?.categorie || [],
                     taxes: currentProduct?.taxes || 0,
                     seDeplace: currentProduct?.seDeplace || '',
                     personAccept: currentProduct?.personAccept || '',
                     colors: currentProduct?.colors || [],
                     sizes: currentProduct?.sizes || [],
                     newLabel: currentProduct?.newLabel || { enabled: false, content: '' },
                     saleLabel: currentProduct?.saleLabel || { enabled: false, content: '' },
              } ),
              [ currentProduct ]
       );

       const methods = useForm( {
              resolver: yupResolver( NewProductSchema ),
              defaultValues,
       } );

       const {
              reset,
              watch,
              setValue,
              handleSubmit,
              formState: { isSubmitting },
       } = methods;

       const values = watch();

       useEffect( () =>
       {
              if ( currentProduct )
              {
                     reset( defaultValues );
              }
       }, [ currentProduct, defaultValues, reset ] );

       useEffect( () =>
       {
              if ( includeTaxes )
              {
                     setValue( 'taxes', 0 );
              } else
              {
                     setValue( 'taxes', currentProduct?.taxes || 0 );
              }
       }, [ currentProduct?.taxes, includeTaxes, setValue ] );









       useEffect( () =>
       {
              if ( isFulled && !isPending )
              {

                     dispatch( resetAfterRequest() )
                     dispatch( addData( dataToAdd ) )
                     enqueueSnackbar( 'annonce publier avec succes' );
                     redirect( -1 );


              }
       }, [ isFulled, isPending, dataToAdd, dispatch, redirect, enqueueSnackbar ] )











       useEffect( () =>
       {



              if ( !isPendingUpdate && isFulledUpdate )
              {


                     dispatch( resetAfterUpdate() )
                     redirect( -1 );



                     enqueueSnackbar( 'Annonce mis à jour avec succes!' );

              }

       }, [ enqueueSnackbar, dispatch, redirect, isFulledUpdate, isPendingUpdate ] );














       const onSubmit = handleSubmit( async ( data ) =>
       {
              try
              {


                     // console.log( 'datat to add', data );

                     await new Promise( ( resolve ) => setTimeout( resolve, 500 ) );

                     // reset();
                     // console.log( 'user du send ', user );

                     const object = {



                            "publish": "published",
                            "price": "2500",
                            "profile": "standard",
                            "metaKeywords": [
                                   "Fitness",
                                   "Nature",
                                   "Business"
                            ],
                            "content": "\n\n<h1>Heading H1</h1><br/><br/>\n\n<h2>Heading H2</h2><br/><br/>\n\n<h3>Heading H3</h3><br/><br/>\n\n<h4>Heading H4</h4><br/><br/>\n\n<h5>Heading H5</h5><br/><br/>\n\n<h6>Heading H6</h6><br/><br/>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Paragraph</h3><br/>\n\n\n<p>What is MTAweb Directory?</p><br/>\n\n<p>So you have heard about this site or you have been to it, but you cannot figure out what it is or what it can do. MTA web directory is the simplest way in which one can bid on a link, or a few links if they wish to do so. The link directory on MTA displays all of the links it currently has, and does so in alphabetical order, which makes it much easier for someone to find what they are looking for if it is something specific and they do not want to go through all the other sites and links as well. It allows you to start your bid at the bottom and slowly work your way to the top of the list.</p><br/>\n\n<p>With a very low costing starting bid of just $1, you are guaranteed to have a spot in MTA’s successful directory list. When you would like to increase your bid to one of the top positions, you have to know that this would be a wise decision to make as it will not only get your link to be at a higher point in the directory but it will also give you a chance to have your site advertised with the rest of the top ten on the home page of the website. This means that when visitors come to MTAweb.com, your site will be one of the first things they see. In other words, you stand a great chance at getting a comeback to your site sooner than you thought.</p><br/>\n\n<p><strong>This is strong text.</strong></p><br/>\n\n<p><em>This is italic text</em></p><br/>\n\n<p><u>This is underline text</u></p>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Unordered list</h3><br/>\n\n<ul>\n    <li>Implements\n        <a href=\"https://docs-minimals.vercel.app/introduction\">This is an external link</a>\n    </li>\n    <li>Implements\n        <a href=\"/dashboard/blog\">This is an inside link</a>\n    </li>\n    <li>Renders actual, \"native\" React DOM elements</li>\n    <li>Allows you to escape or skip HTML (try toggling the checkboxes above)</li>\n    <li>If you escape or skip the HTML, no dangerouslySetInnerHTML is used! Yay!</li>\n</ul>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Ordered list</h3>\n\n<br/>\n<ol>\n    <li>Analysis</li>\n    <li>Design</li>\n    <li>Implementation</li>\n</ol>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Blockquote</h3>\n<br/>\n\n<blockquote>Life is short, Smile while you still have teeth!&nbsp;</blockquote>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Block Code</h3>\n\n<br/>\n\n<pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">React</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactDOM</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-dom'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactMarkdown</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-markdown'</span>;\n<span class=\"hljs-keyword\">import</span> rehypeHighlight <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'rehype-highlight'</span>;\n\n<span class=\"hljs-title class_\">ReactDOM</span>.<span class=\"hljs-title function_\">render</span>(\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ReactMarkdown</span> <span class=\"hljs-attr\">rehypePlugins</span>=<span class=\"hljs-string\">{[rehypeHighlight]}</span>&gt;</span>{'# Your markdown here'}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ReactMarkdown</span>&gt;</span>,\n  <span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-title function_\">querySelector</span>(<span class=\"hljs-string\">'#content'</span>)\n);\n</pre>\n\n<br/>\n\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n\n<br/>\n<br/>\n<p>Why do we use it?</p>\n<br/>\n<br/>\n\n<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n\n<br/>\n<br/>\n<p>\n<img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg />\n</p>\n<br/>\n<br/>\n\n<p>\n    It is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine. Links are important and this is why you have to purchase a link in order to bid on something and the best part is that a link will only cost you $1, which is nothing compared to what you would pay if you decided to do it through any other company or website.\n</p>\n\n<br/>\n<br/>\n<p>\n    <img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_14.jpg />\n</p>\n<br/>\n<br/>\n",
                            "comments": [
                                   {
                                          "id": "b353aca8-352b-4755-a88d-2e6959eb24ce",
                                          "name": "Jayvion Simon",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg",
                                          "message": "She eagerly opened the gift, her eyes sparkling with excitement.",
                                          "postedAt": "2025-01-21T13:54:57.988Z",
                                          "users": [
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
                                                        "name": "Jayvion Simon",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
                                                        "name": "Lucian Obrien",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                                                 },
                                                 {
                                                        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
                                                        "name": "Deja Brady",
                                                        "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg"
                                                 }
                                          ],
                                          "replyComment": [
                                                 {
                                                        "id": "9daf4e57-df8a-402a-a362-8fca7fac4488",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
                                                        "message": "The old oak tree stood tall and majestic, its branches swaying gently in the breeze.",
                                                        "postedAt": "2025-01-20T12:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "8496c5bd-a47e-4c45-a78a-441607011a11",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
                                                        "message": "The aroma of freshly brewed coffee filled the air, awakening my senses.",
                                                        "tagUser": "Lucian Obrien",
                                                        "postedAt": "2025-01-19T11:54:57.988Z"
                                                 },
                                                 {
                                                        "id": "326ff38c-3df1-4102-8238-88d85bf2f33d",
                                                        "userId": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
                                                        "message": "The children giggled with joy as they ran through the sprinklers on a hot summer day.",
                                                        "postedAt": "2025-01-18T10:54:57.988Z"
                                                 }
                                          ]
                                   }
                            ],
                            "tags": [
                                   "Technology",
                                   "Marketing",
                                   "Design",
                                   "Photography",
                                   "Art"
                            ],
                            "metaTitle": "Minimal UI Kit",
                            "createdAt": Date.now(),
                            "title": "The Ultimate Guide to Productivity Hacks",
                            "coverUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg",
                            "totalViews": 1947,
                            "totalShares": 6984,
                            "totalComments": 9124,
                            "totalFavorites": 8488,
                            "totalRating": 12500,
                            "metaDescription": "The starting point for your next project with Minimal UI Kit",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
                            "author": {
                                   "name": "Lucian Obrien",
                                   "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"
                            },
                            "favoritePerson": [
                                   {
                                          "name": "Jayvion Simon",
                                          "avatarUrl": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg"
                                   }
                            ],

                            ...data,
                            aLaUne,
                            id: !currentProduct ? Date.now() : Number( currentProduct.id ),
                            userEmail: !currentProduct ? user.email : currentProduct.userEmail


                     }
                     if ( !currentProduct )
                     {

                            // dispatch( request( object ) )
                            setDataToAdd( object )
                            showDialog.onTrue()
                            // console.log( 'email du user', user.email, 'user email envoyer', object.userEmail );
                            // console.log( 'dtaa to add', object );

                     }


                     if ( currentProduct )
                     {

                            dispatch( updateAnnoncesRequest( object ) )
                            // console.log( 'dtaa to add', object );
                            // console.log( 'email du user', user.email, 'user email envoyer', object.userEmail );

                     }


              } catch ( error )
              {
                     console.error( error );
              }
       } );














       const handleDrop = useCallback(
              ( acceptedFiles ) =>
              {
                     const files = values.images || [];

                     const newFiles = acceptedFiles.map( ( file ) =>
                            Object.assign( file, {
                                   preview: URL.createObjectURL( file ),
                            } )
                     );

                     setValue( 'images', [ ...files, ...newFiles ], { shouldValidate: true } );
              },
              [ setValue, values.images ]
       );

       const handleRemoveFile = useCallback(
              ( inputFile ) =>
              {
                     const filtered = values.images && values.images?.filter( ( file ) => file !== inputFile );
                     setValue( 'images', filtered );
              },
              [ setValue, values.images ]
       );

       const handleRemoveAllFiles = useCallback( () =>
       {
              setValue( 'images', [] );
       }, [ setValue ] );

       const handleChangeIncludeTaxes = useCallback( ( event ) =>
       {
              setIncludeTaxes( event.target.checked );
       }, [] );

       const handleChange = ( event ) =>
       {
              setChecked( event.target.checked ); // Mettre à jour l'état
              console.log( "Valeur du Switch :", event.target.checked ); // Log de la valeur
       };


       const renderDetails = (
              <>
                     { mdUp && (
                            <Grid md={ 4 }>
                                   <Typography variant="h6" sx={ { mb: 0.5 } }>
                                          Details
                                   </Typography>
                                   <Typography variant="body2" sx={ { color: 'text.secondary' } }>
                                          titre, courte description, image...
                                   </Typography>
                            </Grid>
                     ) }

                     <Grid xs={ 12 } md={ 8 }>
                            <Card>
                                   { !mdUp && <CardHeader title="Details" /> }

                                   <Stack spacing={ 3 } sx={ { p: 3 } }>
                                          <RHFTextField name="name" label="Titre de l'annonce" />

                                          <RHFTextField name="subDescription" label="Description" multiline rows={ 4 } />

                                          {/* <Stack spacing={ 1.5 }>
                                                 <Typography variant="subtitle2">Content</Typography>
                                                 <RHFEditor simple name="description" />
                                          </Stack> */}

                                          <Stack spacing={ 1.5 }>
                                                 <Typography variant="subtitle2">Images</Typography>
                                                 <RHFUpload
                                                        multiple
                                                        thumbnail
                                                        name="images"
                                                        maxSize={ 3145728 }
                                                        onDrop={ handleDrop }
                                                        onRemove={ handleRemoveFile }
                                                        onRemoveAll={ handleRemoveAllFiles }
                                                        onUpload={ () => console.info( 'ON UPLOAD' ) }
                                                 />
                                          </Stack>
                                   </Stack>
                            </Card>
                     </Grid>
              </>
       );

       const renderProperties = (
              <>
                     { mdUp && (
                            <Grid md={ 4 }>
                                   <Typography variant="h6" sx={ { mb: 0.5 } }>
                                          Autre details
                                   </Typography>
                                   <Typography variant="body2" sx={ { color: 'text.secondary' } }>
                                          Details additionels
                                   </Typography>
                            </Grid>
                     ) }

                     <Grid xs={ 12 } md={ 8 }>
                            <Card>
                                   { !mdUp && <CardHeader title="Properties" /> }

                                   <Stack spacing={ 3 } sx={ { p: 3 } }>
                                          <Box
                                                 columnGap={ 2 }
                                                 rowGap={ 3 }
                                                 display="grid"
                                                 gridTemplateColumns={ {
                                                        xs: 'repeat(1, 1fr)',
                                                        md: 'repeat(2, 1fr)',
                                                 } }
                                          >
                                                 {/* <RHFTextField name="code" label="Product Code" />

                                                 <RHFTextField name="sku" label="Product SKU" /> */}

                                                 {/* <RHFTextField
                                                        name="quantity"
                                                        label="Quantity"
                                                        placeholder="0"
                                                        type="number"
                                                        InputLabelProps={ { shrink: true } }
                                                 /> */}
                                                 <RHFAutocomplete
                                                        name="city"
                                                        label="Villes"
                                                        placeholder="+"
                                                        multiple
                                                        freeSolo
                                                        options={ ville }
                                                        getOptionLabel={ ( option ) => option }
                                                        value={ watch( "city" ) } // Utiliser React Hook Form pour stocker la valeur

                                                        // value={ selectedTag ? [ selectedTag ] : [] } // Autoriser uniquement un élément
                                                        // onChange={ ( event, newValue ) =>
                                                        // {
                                                        //        if ( newValue.length > 1 )
                                                        //        {
                                                        //               return; // Bloquer l'ajout de plus d'un élément
                                                        //        }
                                                        //        setSelectedTag( newValue[ 0 ] || null ); // Stocker uniquement un élément
                                                        // } }
                                                        onChange={ ( event, newValue ) =>
                                                        {
                                                               if ( newValue.length > 1 )
                                                               {
                                                                      return; // Bloquer l'ajout de plus d'un élément
                                                               }
                                                               setValue( "city", newValue ); // Mettre à jour React Hook Form
                                                        } }
                                                        renderOption={ ( props, option ) => (
                                                               <li { ...props } key={ option }>
                                                                      { option }
                                                               </li>
                                                        ) }
                                                        renderTags={ ( selected, getTagProps ) =>
                                                               selected.map( ( option, index ) => (
                                                                      <Chip
                                                                             { ...getTagProps( { index } ) }
                                                                             key={ option }
                                                                             label={ option }
                                                                             size="small"
                                                                             color="info"
                                                                             variant="soft"
                                                                      />
                                                               ) )
                                                        }
                                                 />
                                                 <Stack >
                                                        <RHFAutocomplete
                                                               name="categorie"
                                                               label="categories"
                                                               placeholder="+"
                                                               multiple
                                                               freeSolo
                                                               options={ catgOptions }
                                                               getOptionLabel={ ( option ) => option }
                                                               value={ watch( "categorie" ) } // Utiliser React Hook Form pour stocker la valeur

                                                               // value={ selectedTag ? [ selectedTag ] : [] } // Autoriser uniquement un élément
                                                               // onChange={ ( event, newValue ) =>
                                                               // {
                                                               //        if ( newValue.length > 1 )
                                                               //        {
                                                               //               return; // Bloquer l'ajout de plus d'un élément
                                                               //        }
                                                               //        setSelectedTag( newValue[ 0 ] || null ); // Stocker uniquement un élément
                                                               // } }
                                                               onChange={ ( event, newValue ) =>
                                                               {
                                                                      if ( newValue.length > 1 )
                                                                      {
                                                                             return; // Bloquer l'ajout de plus d'un élément
                                                                      }
                                                                      setValue( "categorie", newValue ); // Mettre à jour React Hook Form
                                                               } }
                                                               renderOption={ ( props, option ) => (
                                                                      <li { ...props } key={ option }>
                                                                             { option }
                                                                      </li>
                                                               ) }
                                                               renderTags={ ( selected, getTagProps ) =>
                                                                      selected.map( ( option, index ) => (
                                                                             <Chip
                                                                                    { ...getTagProps( { index } ) }
                                                                                    key={ option }
                                                                                    label={ option }
                                                                                    size="small"
                                                                                    color="info"
                                                                                    variant="soft"
                                                                             />
                                                                      ) )
                                                               }
                                                        />
                                                 </Stack>

                                                 <Stack >
                                                        <Typography variant="subtitle2">Personne accepté</Typography>
                                                        <RHFMultiCheckbox row name="personAccept" spacing={ 2 } options={ genre } />
                                                 </Stack>

                                                 <Stack >
                                                        <Typography variant="subtitle2">Se deplace</Typography>
                                                        <RHFMultiCheckbox row name="seDeplace" spacing={ 2 } options={ accept } />
                                                 </Stack>


                                                 {/* <RHFMultiSelect
                                                        checkbox
                                                        name="colors"
                                                        label="Colors"
                                                        options={ PRODUCT_COLOR_NAME_OPTIONS }
                                                 />

                                                 <RHFMultiSelect checkbox name="sizes" label="Sizes" options={ PRODUCT_SIZE_OPTIONS } /> */}
                                          </Box>

                                          {/* <RHFAutocomplete
                                                 name="tags"
                                                 label="Tags"
                                                 placeholder="+ Tags"
                                                 multiple
                                                 freeSolo
                                                 options={ _tags.map( ( option ) => option ) }
                                                 getOptionLabel={ ( option ) => option }
                                                 renderOption={ ( props, option ) => (
                                                        <li { ...props } key={ option }>
                                                               { option }
                                                        </li>
                                                 ) }
                                                 renderTags={ ( selected, getTagProps ) =>
                                                        selected.map( ( option, index ) => (
                                                               <Chip
                                                                      { ...getTagProps( { index } ) }
                                                                      key={ option }
                                                                      label={ option }
                                                                      size="small"
                                                                      color="info"
                                                                      variant="soft"
                                                               />
                                                        ) )
                                                 }
                                          /> */}






                                          <Divider sx={ { borderStyle: 'dashed' } } />

                                          {/* <Stack direction="row" alignItems="center" spacing={ 3 }>
                                                 <RHFSwitch name="saleLabel.enabled" label={ null } sx={ { m: 0 } } />
                                                 <RHFTextField
                                                        name="saleLabel.content"
                                                        label="Sale Label"
                                                        fullWidth
                                                        disabled={ !values.saleLabel.enabled }
                                                 />
                                          </Stack>

                                          <Stack direction="row" alignItems="center" spacing={ 3 }>
                                                 <RHFSwitch name="newLabel.enabled" label={ null } sx={ { m: 0 } } />
                                                 <RHFTextField
                                                        name="newLabel.content"
                                                        label="New Label"
                                                        fullWidth
                                                        disabled={ !values.newLabel.enabled }
                                                 />
                                          </Stack> */}
                                   </Stack>
                            </Card>
                     </Grid>
              </>
       );

       const renderPricing = (
              <>


                     { mdUp && (
                            <Grid md={ 4 }>
                                   <Typography variant="h6" sx={ { mb: 0.5 } }>
                                          Tarif
                                   </Typography>
                                   <Typography variant="body2" sx={ { color: 'text.secondary' } }>
                                          Different prix
                                   </Typography>
                            </Grid>
                     ) }

                     <Grid xs={ 12 } md={ 8 }>
                            <Card>
                                   { !mdUp && <CardHeader title="Pricing" /> }

                                   <Stack direction="row" alignItems="center" flexWrap={ { xs: "wrap", md: "nowrap" } } spacing={ 3 } sx={ { p: 3 } }>
                                          <RHFTextField
                                                 name="prix1coup"
                                                 label="1 coup"
                                                 placeholder="0.00"
                                                 type="number"
                                                 InputLabelProps={ { shrink: true } }
                                                 InputProps={ {
                                                        startAdornment: (
                                                               <InputAdornment position="start">
                                                                      <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                             fcfa
                                                                      </Box>
                                                               </InputAdornment>
                                                        ),
                                                 } }
                                          />

                                          <RHFTextField
                                                 name="prix2coup"
                                                 label="2 coup"
                                                 placeholder="0.00"
                                                 type="number"
                                                 InputLabelProps={ { shrink: true } }
                                                 InputProps={ {
                                                        startAdornment: (
                                                               <InputAdornment position="start">
                                                                      <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                             fcfa
                                                                      </Box>
                                                               </InputAdornment>
                                                        ),
                                                 } }
                                          />

                                          {/* <FormControlLabel
                                                 control={ <Switch checked={ includeTaxes } onChange={ handleChangeIncludeTaxes } /> }
                                                 label="Price includes taxes"
                                          /> */}

                                          {/* { !includeTaxes && (
                                                 <RHFTextField
                                                        name="taxes"
                                                        label="Tax (%)"
                                                        placeholder="0.00"
                                                        type="number"
                                                        InputLabelProps={ { shrink: true } }
                                                        InputProps={ {
                                                               startAdornment: (
                                                                      <InputAdornment position="start">
                                                                             <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                                    %
                                                                             </Box>
                                                                      </InputAdornment>
                                                               ),
                                                        } }
                                                 />
                                          ) } */}
                                   </Stack>

                                   <Stack direction="row" alignItems="center" flexWrap={ { xs: "wrap", md: "nowrap" } } spacing={ 3 } sx={ { p: 3 } }>
                                          <RHFTextField
                                                 name="prixMassage"
                                                 label="Massage"
                                                 placeholder="0.00"
                                                 type="number"
                                                 InputLabelProps={ { shrink: true } }
                                                 InputProps={ {
                                                        startAdornment: (
                                                               <InputAdornment position="start">
                                                                      <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                             fcfa
                                                                      </Box>
                                                               </InputAdornment>
                                                        ),
                                                 } }
                                          />

                                          <RHFTextField
                                                 name="prixNuit"
                                                 label="Nuit Entiere"
                                                 placeholder="0.00"
                                                 type="number"
                                                 InputLabelProps={ { shrink: true } }
                                                 InputProps={ {
                                                        startAdornment: (
                                                               <InputAdornment position="start">
                                                                      <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                             fcfa
                                                                      </Box>
                                                               </InputAdornment>
                                                        ),
                                                 } }
                                          />

                                          {/* <FormControlLabel
                                                 control={ <Switch checked={ includeTaxes } onChange={ handleChangeIncludeTaxes } /> }
                                                 label="Price includes taxes"
                                          /> */}

                                          {/* { !includeTaxes && (
                                                 <RHFTextField
                                                        name="taxes"
                                                        label="Tax (%)"
                                                        placeholder="0.00"
                                                        type="number"
                                                        InputLabelProps={ { shrink: true } }
                                                        InputProps={ {
                                                               startAdornment: (
                                                                      <InputAdornment position="start">
                                                                             <Box component="span" sx={ { color: 'text.disabled' } }>
                                                                                    %
                                                                             </Box>
                                                                      </InputAdornment>
                                                               ),
                                                        } }
                                                 />
                                          ) } */}
                                   </Stack>
                            </Card>
                     </Grid>
              </>
       );

       const renderActions = (
              <>
                     { mdUp && <Grid md={ 4 } /> }
                     <Grid xs={ 12 } md={ 8 } sx={ { display: 'flex', alignItems: 'center' } }>


                            { user.role === "admin" && <FormControlLabel
                                   control={ <Switch checked={ aLaUne } onChange={ handleChange } /> }
                                   label="A la lune"
                                   sx={ { flexGrow: 1, pl: 3 } }
                            /> }

                            <LoadingButton sx={ { marginLeft: "auto" } } type="submit" variant="contained" size="large" loading={ isSubmitting }>
                                   { !currentProduct ? 'Publier' : 'Modifier' }
                            </LoadingButton>
                     </Grid>
              </>
       );

       return (
              <>
                     <DialogAnnonceBuy showDialog={ showDialog } dataGet={ dataToAdd } startPaiement={ showPaiementStatut } />
                     <FormProvider methods={ methods } onSubmit={ onSubmit }>
                            <Grid container spacing={ 3 }>
                                   { renderDetails }

                                   { renderProperties }

                                   { renderPricing }

                                   { renderActions }
                            </Grid>
                     </FormProvider>
              </>
       );
}

ProductNewEditForm.propTypes = {
       currentProduct2: PropTypes.object,
};
