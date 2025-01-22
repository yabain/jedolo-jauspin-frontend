import { Helmet } from 'react-helmet-async';

import { CheckoutView } from 'src/sections/byTemplate/checkout/view';

// ----------------------------------------------------------------------

export default function CheckoutPage()
{
       return (
              <>
                     <Helmet>
                            <title> Checkout</title>
                     </Helmet>

                     <CheckoutView />
              </>
       );
}
