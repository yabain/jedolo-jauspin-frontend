import { Helmet } from 'react-helmet-async';

import { OverviewFileView } from 'src/sections/byTemplate/overview/file/view';

// ----------------------------------------------------------------------

export default function OverviewFilePage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: File</title>
                     </Helmet>

                     <OverviewFileView />
              </>
       );
}
