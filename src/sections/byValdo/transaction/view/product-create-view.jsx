import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProductNewEditForm from '../product-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductCreateView()
{
       const settings = useSettingsContext();

       return (
              <Container maxWidth={ settings.themeStretch ? false : 'lg' }>
                     <CustomBreadcrumbs
                            heading="Publier une annonce"
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

                     <ProductNewEditForm />
              </Container>
       );
}
