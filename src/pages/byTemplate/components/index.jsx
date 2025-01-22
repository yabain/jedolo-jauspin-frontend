import { Helmet } from 'react-helmet-async';

import ComponentsView from 'src/sections/byTemplate/_examples/view';

// ----------------------------------------------------------------------

export default function ComponentsPage()
{
       return (
              <>
                     <Helmet>
                            <title> Components</title>
                     </Helmet>

                     <ComponentsView />
              </>
       );
}
