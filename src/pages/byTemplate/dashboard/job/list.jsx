import { Helmet } from 'react-helmet-async';

import { JobListView } from 'src/sections/byTemplate/job/view';

// ----------------------------------------------------------------------

export default function JobListPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Job List</title>
                     </Helmet>

                     <JobListView />
              </>
       );
}
