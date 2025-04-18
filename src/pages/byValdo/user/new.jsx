import { Helmet } from 'react-helmet-async';

import { UserCreateView } from 'src/sections/byValdo/user/view';

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
