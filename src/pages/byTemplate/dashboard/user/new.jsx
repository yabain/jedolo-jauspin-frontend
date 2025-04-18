import { Helmet } from 'react-helmet-async';

import { UserCreateView } from 'src/sections/byTemplate/user/view';

// ----------------------------------------------------------------------

export default function UserCreatePage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Create a new user</title>
                     </Helmet>

                     <UserCreateView />
              </>
       );
}
