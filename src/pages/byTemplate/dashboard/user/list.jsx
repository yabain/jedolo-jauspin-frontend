import { Helmet } from 'react-helmet-async';

import { UserListView } from 'src/sections/byTemplate/user/view';

// ----------------------------------------------------------------------

export default function UserListPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: User List</title>
                     </Helmet>

                     <UserListView />
              </>
       );
}
