import { Helmet } from 'react-helmet-async';

import { AccountView } from 'src/sections/byTemplate/account/view';

// ----------------------------------------------------------------------

export default function AccountPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Account Settings</title>
                     </Helmet>

                     <AccountView />
              </>
       );
}
