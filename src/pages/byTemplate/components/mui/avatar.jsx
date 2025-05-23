import { Helmet } from 'react-helmet-async';

import AvatarView from 'src/sections/byTemplate/_examples/mui/avatar-view';

// ----------------------------------------------------------------------

export default function AvatarPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Avatar</title>
                     </Helmet>

                     <AvatarView />
              </>
       );
}
