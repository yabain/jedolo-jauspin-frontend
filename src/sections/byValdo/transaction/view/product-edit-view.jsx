import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetProduct } from 'src/api/product';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProductNewEditForm from '../product-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductEditView( { id } )
{
       const settings = useSettingsContext();

       const { product: currentProduct } = useGetProduct( id );

       return (
              <Container maxWidth={ settings.themeStretch ? false : 'lg' }>
                     <CustomBreadcrumbs
                            heading="Modifier une annonce"
                            links={ [
                                   {
                                          name: 'Acceuil',
                                          href: paths.home,
                                   },
                                   {
                                          name: 'Annonce',
                                          href: paths.AnnoncesList,
                                   },
                                   { name: 'Nouvel Annonce' },
                            ] }
                            sx={ {
                                   mb: { xs: 3, md: 5 },
                            } }
                     />

                     <ProductNewEditForm currentProduct={ currentProduct } />
              </Container>
       );
}

ProductEditView.propTypes = {
       id: PropTypes.string,
};
