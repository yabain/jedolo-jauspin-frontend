import { Helmet } from 'react-helmet-async';

import { OverviewAppView } from 'src/sections/byTemplate/overview/app/view';

// ----------------------------------------------------------------------

export default function OverviewAppPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: App</title>
                     </Helmet>

                     <OverviewAppView />
              </>
       );
}
