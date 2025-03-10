import { Helmet } from 'react-helmet-async';

import { UserCardsView } from 'src/sections/byValdo/user/view';

// ----------------------------------------------------------------------

export default function UserCardsPage()
{
       return (
              <>
                     <Helmet>
                            <title> Dashboard: User Cards</title>
                     </Helmet>

                     <UserCardsView />
              </>
       );
}
