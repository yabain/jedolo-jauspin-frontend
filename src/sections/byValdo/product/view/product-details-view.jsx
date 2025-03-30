import PropTypes from 'prop-types';
import { useState, useEffect, useCallback, useMemo } from 'react';

import { Chip } from '@mui/material';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useLocation, useNavigate } from 'react-router';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetProduct } from 'src/api/product';
import { PRODUCT_PUBLISH_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { ProductDetailsSkeleton } from '../product-skeleton';
import ProductDetailsReview from '../product-details-review';
import ProductDetailsSummary from '../product-details-summary';
import ProductDetailsToolbar from '../product-details-toolbar';
import ProductDetailsCarousel from '../product-details-carousel';
import ProductDetailsDescription from '../product-details-description';
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function ProductDetailsView( { id } )
{



       const location = useLocation();
       const navigate = useNavigate()
       const settings = useSettingsContext();
       const [ publish, setPublish ] = useState( '' );
       const [ hasConsulted, setHasConsulted ] = useState( false );

       const [ totalReviews, setTotalReviews ] = useState( 0 )
       const [ currentTab, setCurrentTab ] = useState( 'description' );

       const [ productLoading, setProductLoading ] = useState( true );
       const [ productError, setProductError ] = useState( false );
       const productGet = useMemo( () => location.state?.annonce || null, [ location ] );

       const product = useMemo( () =>
       (
              {
                     ...productGet,

              }
       )
              , [ productGet ] )


       const getChildValue = ( dataGet ) => setTotalReviews( dataGet )

       useEffect( () =>
       {
              if ( product )
              {
                     setProductLoading( false );
                     setProductError( false );



                     setHasConsulted( true );
              } else
              {
                     setProductError( true );
                     // console.log( 'erreurrrrrrrrrrrrrr' );
              }


       }, [ product, hasConsulted ] );


       useEffect( () =>
       {
              setHasConsulted( true );
       }, [ location.key ] );



       // console.log( productGet );


       useEffect( () =>
       {
              if ( product )
              {
                     setPublish( product?.publish );
              }
       }, [ product ] );

       const handleChangePublish = useCallback( ( newValue ) =>
       {
              setPublish( newValue );
       }, [] );

       const handleChangeTab = useCallback( ( event, newValue ) =>
       {
              setCurrentTab( newValue );
       }, [] );

       const service = '<li><p>The foam sockliner feels soft and comfortable</p></li>'
       const descriptSend = `



<h6>Prix minimum</h6>
              
<br/>
<ol>
  <li>Tout Services</li>
  <li>${ product.price } FCFA</li>
</ol>

<br/> 
<br/>
<br/>

<h6>Services Offerts</h6>
<br/>
<ul>
 ${ product.categorie.map( element => `<li>${ element }</li>` ).join( "" ) }
</ul>

<br/>
<br/>

<h6>Description</h6>
<br/>
<ul> 

<p>${ product.subDescription }</p> 
  
</ul>

<br/>
<br/>
 `


       const SUMMARY = [
              {
                     title: 'Compte Certifier',
                     description: product.certified && product.certified ? 'oui' : 'non',
                     icon: 'solar:verified-check-bold',
              },
              {
                     title: 'Annonce Sponsoriser',
                     description: product.sponsored !== '' ? 'oui' : 'non',
                     icon: 'solar:clock-circle-bold',
              },
              {
                     title: 'Compte Verifier',
                     description: product.verified && product.verified ? 'oui' : 'non',
                     icon: 'solar:shield-check-bold',
              },
       ];

       console.log( 'dddddd', product.sponsored !== '' ? 'oui' : 'non', );


       const renderSkeleton = <ProductDetailsSkeleton />;

       const renderError = (
              <EmptyContent
                     filled
                     title={ `${ productError?.message }` }
                     action={
                            <Button
                                   component={ RouterLink }
                                   href={ paths.dashboard.product.root }
                                   startIcon={ <Iconify icon="eva:arrow-ios-back-fill" width={ 16 } /> }
                                   sx={ { mt: 3 } }
                            >
                                   Back to List
                            </Button>
                     }
                     sx={ { py: 10 } }
              />
       );

       const renderProduct = product && (
              <>
                     <ProductDetailsToolbar

                            editLink={ paths.dashboard.product.edit( `${ product?.id }` ) }
                            liveLink={ paths.product.details( `${ product?.id }` ) }
                            publish={ publish || '' }
                            onChangePublish={ handleChangePublish }
                            publishOptions={ PRODUCT_PUBLISH_OPTIONS }
                            data={ product }
                     />

                     <Grid container spacing={ { xs: 3, md: 5, lg: 8 } } >
                            <Grid xs={ 12 } md={ 6 } lg={ 7 }>
                                   <ProductDetailsCarousel product={ product } />
                            </Grid>

                            <Grid xs={ 12 } md={ 6 } lg={ 5 }>
                                   <ProductDetailsSummary disabledActions product={ product } />
                            </Grid>
                     </Grid>

                     {/* <Box
                            gap={ 5 }
                            display="grid"
                            gridTemplateColumns={ {
                                   xs: 'repeat(1, 1fr)',
                                   md: 'repeat(3, 1fr)',
                            } }
                            sx={ { my: 10 } }
                     >
                            { SUMMARY.map( ( item ) => (
                                   <Box key={ item.title } sx={ { textAlign: 'center', px: 5 } }>


                                          <Iconify icon={ item.icon } width={ 32 } sx={ { color: 'primary.main' } } />

                                          <Typography variant="subtitle1" sx={ { mb: 1, mt: 2 } }>
                                                 { item.title }
                                          </Typography>

                                           <Chip
                                                 variant='soft'
                                                 label={ item.description }
                                                 color={ item.description === 'oui' ? 'info' : 'error' }
                                          />
                                    </Box>
                            ) ) }
                     </Box> */}

                     <Card sx={ { mt: 10, } }>
                            <Tabs
                                   value={ currentTab }
                                   onChange={ handleChangeTab }
                                   sx={ {
                                          px: 3,
                                          boxShadow: ( theme ) => `inset 0 -2px 0 0 ${ alpha( theme.palette.grey[ 500 ], 0.08 ) }`,
                                   } }
                            >
                                   { [
                                          {
                                                 value: 'description',
                                                 label: 'Description',
                                          },
                                          {
                                                 value: 'reviews',
                                                 label: `Avis Utilisateurs `,
                                          },
                                   ].map( ( tab ) => (
                                          <Tab key={ tab.value } value={ tab.value } label={ tab.label } />
                                   ) ) }
                            </Tabs>

                            { currentTab === 'description' && (
                                   <ProductDetailsDescription description={ descriptSend } />
                            ) }

                            { currentTab === 'reviews' && (
                                   <ProductDetailsReview
                                          annonce={ product }
                                          getChildValue={ getChildValue }
                                          ratings={ product.ratings }
                                          reviews={ product.reviews }
                                          totalRatings={ product.totalRatings }
                                          totalReviews={ product.totalReviews }
                                   />
                            ) }
                     </Card>
              </>
       );

       return (
              <Container maxWidth={ settings.themeStretch ? false : 'lg' }>
                     { productLoading && renderSkeleton }

                     { productError && renderError }

                     { product && renderProduct }
              </Container>
       );
}

ProductDetailsView.propTypes = {
       id: PropTypes.string,
};
