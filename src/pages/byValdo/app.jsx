import { Helmet } from 'react-helmet-async';

import { Home } from 'src/sections/byValdo/overview/app/view';

// ----------------------------------------------------------------------

export default function OverviewAppPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Acceuil</title>
                     </Helmet>

                     <Home />
              </>
       );
}
