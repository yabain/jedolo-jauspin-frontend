import { Helmet } from 'react-helmet-async';

import CheckboxView from 'src/sections/byTemplate/_examples/mui/checkbox-view';

// ----------------------------------------------------------------------

export default function CheckboxPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Checkbox</title>
                     </Helmet>

                     <CheckboxView />
              </>
       );
}
