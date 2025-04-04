import { Helmet } from 'react-helmet-async';

import { AmplifyVerifyView } from 'src/sections/byTemplate/auth/amplify';

// ----------------------------------------------------------------------

export default function VerifyPage()
{
       return (
              <>
                     <Helmet>
                            <title> Amplify: Verify</title>
                     </Helmet>

                     <AmplifyVerifyView />
              </>
       );
}
