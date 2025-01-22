import { Helmet } from 'react-helmet-async';

import ListView from 'src/sections/byTemplate/_examples/mui/list-view';

// ----------------------------------------------------------------------

export default function ListPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: List</title>
                     </Helmet>

                     <ListView />
              </>
       );
}
