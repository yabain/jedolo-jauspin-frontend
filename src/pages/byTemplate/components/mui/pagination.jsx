import { Helmet } from 'react-helmet-async';

import PaginationView from 'src/sections/byTemplate/_examples/mui/pagination-view';

// ----------------------------------------------------------------------

export default function PaginationPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Pagination</title>
                     </Helmet>

                     <PaginationView />
              </>
       );
}
