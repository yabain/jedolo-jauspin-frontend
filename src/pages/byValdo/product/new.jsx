import { Helmet } from 'react-helmet-async';
import { ProductCreateView } from 'src/sections/byValdo/product/view';


// ----------------------------------------------------------------------

export default function ProductCreatePage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Nouvelle annonce</title>
                     </Helmet>

                     <ProductCreateView />
              </>
       );
}
