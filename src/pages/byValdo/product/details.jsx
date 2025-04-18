import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import { ProductDetailsView } from 'src/sections/byValdo/product/view';


// ----------------------------------------------------------------------

export default function ProductDetailsPage() {
       const params = useParams();

       const { id } = params;

       return (
              <>
                     <Helmet>
                            <title> Ndolo: Detail Annonce</title>
                     </Helmet>

                     <ProductDetailsView id={`${id}`} />
              </>
       );
}
