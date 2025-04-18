import { Helmet } from 'react-helmet-async';

import { OverviewBankingView } from 'src/sections/byTemplate/overview/booking/view';

// ----------------------------------------------------------------------

export default function OverviewBookingPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Booking</title>
                     </Helmet>

                     <OverviewBankingView />
              </>
       );
}
