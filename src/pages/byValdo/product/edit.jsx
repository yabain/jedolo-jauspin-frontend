import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ProductEditView } from 'src/sections/byTemplate/product/view';

// ----------------------------------------------------------------------

export default function ProductEditPage()
{
       const params = useParams();

       const { id } = params;

       return (
              <>
                     <Helmet>
                            <title> Dashboard: Product Edit</title>
                     </Helmet>

                     <ProductEditView id={ `${ id }` } />
              </>
       );
}
