import { Helmet } from 'react-helmet-async';

import { InvoiceCreateView } from 'src/sections/byTemplate/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceCreatePage()
{
       return (
              <>
                     <Helmet>
                            <title> Dashboard: Create a new invoice</title>
                     </Helmet>

                     <InvoiceCreateView />
              </>
       );
}
