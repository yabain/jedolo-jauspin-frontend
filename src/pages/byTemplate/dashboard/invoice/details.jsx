import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { InvoiceDetailsView } from 'src/sections/byTemplate/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceDetailsPage() {
       const params = useParams();

       const { id } = params;

       return (
              <>
                     <Helmet>
                            <title> Ndolo: Invoice Details</title>
                     </Helmet>

                     <InvoiceDetailsView id={`${id}`} />
              </>
       );
}
