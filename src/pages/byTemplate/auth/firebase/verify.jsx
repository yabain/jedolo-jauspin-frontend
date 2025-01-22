import { Helmet } from 'react-helmet-async';

import { FirebaseVerifyView } from 'src/sections/byTemplate/auth/firebase';

// ----------------------------------------------------------------------

export default function VerifyPage()
{
       return (
              <>
                     <Helmet>
                            <title> Firebase: Verify</title>
                     </Helmet>

                     <FirebaseVerifyView />
              </>
       );
}
