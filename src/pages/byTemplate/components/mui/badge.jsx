import { Helmet } from 'react-helmet-async';

import BadgeView from 'src/sections/byTemplate/_examples/mui/badge-view';

// ----------------------------------------------------------------------

export default function BadgePage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Badge</title>
                     </Helmet>

                     <BadgeView />
              </>
       );
}
