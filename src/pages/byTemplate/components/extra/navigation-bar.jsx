import { Helmet } from 'react-helmet-async';

import NavigationBarView from 'src/sections/byTemplate/_examples/extra/navigation-bar-view';

// ----------------------------------------------------------------------

export default function NavigationBarPage()
{
       return (
              <>
                     <Helmet>
                            <title> Components: Navigation Bar</title>
                     </Helmet>

                     <NavigationBarView />
              </>
       );
}
