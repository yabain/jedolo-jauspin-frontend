import { Helmet } from 'react-helmet-async';

import TableView from 'src/sections/byTemplate/_examples/mui/table-view';

// ----------------------------------------------------------------------

export default function TablePage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Table</title>
                     </Helmet>

                     <TableView />
              </>
       );
}
