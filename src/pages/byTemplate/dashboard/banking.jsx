import { Helmet } from 'react-helmet-async';

import { OverviewBankingView } from 'src/sections/byTemplate/overview/banking/view';

// ----------------------------------------------------------------------

export default function OverviewBankingPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Banking</title>
                     </Helmet>

                     <OverviewBankingView />
              </>
       );
}
