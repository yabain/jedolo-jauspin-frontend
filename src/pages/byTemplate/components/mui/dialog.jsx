import { Helmet } from 'react-helmet-async';

import DialogView from 'src/sections/byTemplate/_examples/mui/dialog-view';

// ----------------------------------------------------------------------

export default function DialogPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Dialog</title>
                     </Helmet>

                     <DialogView />
              </>
       );
}
