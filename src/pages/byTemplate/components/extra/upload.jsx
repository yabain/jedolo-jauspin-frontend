import { Helmet } from 'react-helmet-async';

import UploadView from 'src/sections/byTemplate/_examples/extra/upload-view';

// ----------------------------------------------------------------------

export default function UploadPage()
{
       return (
              <>
                     <Helmet>
                            <title> Components: Upload</title>
                     </Helmet>

                     <UploadView />
              </>
       );
}
