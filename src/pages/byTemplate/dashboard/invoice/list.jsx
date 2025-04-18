import { Helmet } from 'react-helmet-async';

import { InvoiceListView } from 'src/sections/byTemplate/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceListPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Invoice List</title>
                     </Helmet>

                     <InvoiceListView />
              </>
       );
}
