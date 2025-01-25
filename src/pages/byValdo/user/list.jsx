import { Helmet } from 'react-helmet-async';

import { UserListView } from 'src/sections/byValdo/user/view';

// ----------------------------------------------------------------------

export default function UserListPage()
{
       return (
              <>
                     <Helmet>
                            <title> Dashboard: User List</title>
                     </Helmet>

                     <UserListView />
              </>
       );
}
