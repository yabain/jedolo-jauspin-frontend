import { Helmet } from 'react-helmet-async';

import DataGridView from 'src/sections/byTemplate/_examples/mui/data-grid-view';

// ----------------------------------------------------------------------

export default function DataGridPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: DataGrid</title>
                     </Helmet>

                     <DataGridView />
              </>
       );
}
