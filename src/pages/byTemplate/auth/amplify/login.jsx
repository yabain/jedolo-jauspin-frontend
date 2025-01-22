import { Helmet } from 'react-helmet-async';

import { AmplifyLoginView } from 'src/sections/byTemplate/auth/amplify';

// ----------------------------------------------------------------------

export default function LoginPage()
{
       return (
              <>
                     <Helmet>
                            <title> Amplify: Amplify Login</title>
                     </Helmet>

                     <AmplifyLoginView />
              </>
       );
}
