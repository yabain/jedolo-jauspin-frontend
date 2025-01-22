import { Helmet } from 'react-helmet-async';

import ComingSoonView from 'src/sections/byTemplate/coming-soon/view';

// ----------------------------------------------------------------------

export default function ComingSoonPage()
{
       return (
              <>
                     <Helmet>
                            <title> Coming Soon</title>
                     </Helmet>

                     <ComingSoonView />
              </>
       );
}
