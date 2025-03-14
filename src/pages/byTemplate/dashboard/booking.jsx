import { Helmet } from 'react-helmet-async';

import { OverviewBankingView } from 'src/sections/byTemplate/overview/booking/view';

// ----------------------------------------------------------------------

export default function OverviewBookingPage()
{
       return (
              <>
                     <Helmet>
                            <title> Dashboard: Booking</title>
                     </Helmet>

                     <OverviewBankingView />
              </>
       );
}
