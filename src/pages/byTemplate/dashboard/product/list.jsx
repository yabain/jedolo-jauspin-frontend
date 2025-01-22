import { Helmet } from 'react-helmet-async';

import { ProductListView } from 'src/sections/byTemplate/product/view';

// ----------------------------------------------------------------------

export default function ProductListPage()
{
       return (
              <>
                     <Helmet>
                            <title> Dashboard: Product List</title>
                     </Helmet>

                     <ProductListView />
              </>
       );
}
