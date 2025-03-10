import { Helmet } from 'react-helmet-async';

import ScrollView from 'src/sections/byTemplate/_examples/extra/scroll-view';

// ----------------------------------------------------------------------

export default function ScrollPage()
{
       return (
              <>
                     <Helmet>
                            <title> Components: Scroll</title>
                     </Helmet>

                     <ScrollView />
              </>
       );
}
