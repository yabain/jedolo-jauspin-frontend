import { Helmet } from 'react-helmet-async';

import { ModernLoginView } from 'src/sections/byTemplate/auth-demo/modern';

// ----------------------------------------------------------------------

export default function ModernLoginPage()
{
       return (
              <>
                     <Helmet>
                            <title> Auth Classic: Login</title>
                     </Helmet>

                     <ModernLoginView />
              </>
       );
}
