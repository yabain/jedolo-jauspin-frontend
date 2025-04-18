import { Helmet } from 'react-helmet-async';

import { UserCardsView } from 'src/sections/byTemplate/user/view';

// ----------------------------------------------------------------------

export default function UserCardsPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: User Cards</title>
                     </Helmet>

                     <UserCardsView />
              </>
       );
}
