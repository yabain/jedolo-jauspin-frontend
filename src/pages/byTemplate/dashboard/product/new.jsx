import { Helmet } from 'react-helmet-async';

import { ProductCreateView } from 'src/sections/byTemplate/product/view';

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Create a new product</title>
                     </Helmet>

                     <ProductCreateView />
              </>
       );
}
