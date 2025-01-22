import { Helmet } from 'react-helmet-async';

import TransferListView from 'src/sections/byTemplate/_examples/mui/transfer-list-view';

// ----------------------------------------------------------------------

export default function TransferListPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Transfer List</title>
                     </Helmet>

                     <TransferListView />
              </>
       );
}
