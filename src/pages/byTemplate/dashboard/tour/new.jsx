import { Helmet } from 'react-helmet-async';

import { TourCreateView } from 'src/sections/byTemplate/tour/view';

// ----------------------------------------------------------------------

export default function TourCreatePage()
{
       return (
              <>
                     <Helmet>
                            <title> Dashboard: Create a new tour</title>
                     </Helmet>

                     <TourCreateView />
              </>
       );
}
