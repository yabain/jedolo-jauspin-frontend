import { Helmet } from 'react-helmet-async';

import ChipView from 'src/sections/byTemplate/_examples/mui/chip-view';

// ----------------------------------------------------------------------

export default function ChipPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Chip</title>
                     </Helmet>

                     <ChipView />
              </>
       );
}
