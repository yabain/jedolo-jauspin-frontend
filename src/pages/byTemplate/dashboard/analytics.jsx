import { Helmet } from 'react-helmet-async';

import { OverviewAnalyticsView } from 'src/sections/byTemplate/overview/analytics/view';

// ----------------------------------------------------------------------

export default function OverviewAnalyticsPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Analytics</title>
                     </Helmet>

                     <OverviewAnalyticsView />
              </>
       );
}
