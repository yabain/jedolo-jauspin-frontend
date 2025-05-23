import { Helmet } from 'react-helmet-async';

import { ShadowsView } from 'src/sections/byTemplate/_examples/foundation';

// ----------------------------------------------------------------------

export default function ShadowsPage()
{
       return (
              <>
                     <Helmet>
                            <title> Foundations: Shadows</title>
                     </Helmet>

                     <ShadowsView />
              </>
       );
}
