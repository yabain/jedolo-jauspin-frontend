import { Helmet } from 'react-helmet-async';

import { FirebaseRegisterView } from 'src/sections/byTemplate/auth/firebase';

// ----------------------------------------------------------------------

export default function RegisterPage()
{
       return (
              <>
                     <Helmet>
                            <title> Firebase: Register</title>
                     </Helmet>

                     <FirebaseRegisterView />
              </>
       );
}
