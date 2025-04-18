import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { JobEditView } from 'src/sections/byTemplate/job/view';

// ----------------------------------------------------------------------

export default function JobEditPage() {
       const params = useParams();

       const { id } = params;

       return (
              <>
                     <Helmet>
                            <title> Ndolo: Ndolo: Job Edit</title>
                     </Helmet>

                     <JobEditView id={`${id}`} />
              </>
       );
}
