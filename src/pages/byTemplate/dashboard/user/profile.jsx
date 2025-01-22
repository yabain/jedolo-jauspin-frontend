import { Helmet } from 'react-helmet-async';

import { UserProfileView } from 'src/sections/byTemplate/user/view';

// ----------------------------------------------------------------------

export default function UserProfilePage()
{
       return (
              <>
                     <Helmet>
                            <title> Dashboard: User Profile</title>
                     </Helmet>

                     <UserProfileView />
              </>
       );
}
