import { Helmet } from 'react-helmet-async';

import { JobCreateView } from 'src/sections/byTemplate/job/view';

// ----------------------------------------------------------------------

export default function JobCreatePage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Create a new job</title>
                     </Helmet>

                     <JobCreateView />
              </>
       );
}
