import { Helmet } from 'react-helmet-async';

import AlertView from 'src/sections/byTemplate/_examples/mui/alert-view';

// ----------------------------------------------------------------------

export default function AlertPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Alert</title>
                     </Helmet>

                     <AlertView />
              </>
       );
}
