import { Helmet } from 'react-helmet-async';

import { GridView } from 'src/sections/byTemplate/_examples/foundation';

// ----------------------------------------------------------------------

export default function GridPage()
{
       return (
              <>
                     <Helmet>
                            <title> Foundations: Grid</title>
                     </Helmet>

                     <GridView />
              </>
       );
}
