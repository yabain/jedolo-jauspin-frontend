import { Helmet } from 'react-helmet-async';

import { ColorsView } from 'src/sections/byTemplate/_examples/foundation';

// ----------------------------------------------------------------------

export default function ColorsPage()
{
       return (
              <>
                     <Helmet>
                            <title> Foundations: Colors</title>
                     </Helmet>

                     <ColorsView />
              </>
       );
}
