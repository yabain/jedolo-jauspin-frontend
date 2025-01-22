import { Helmet } from 'react-helmet-async';

import { ModernNewPasswordView } from 'src/sections/byTemplate/auth-demo/modern';

// ----------------------------------------------------------------------

export default function ModernNewPasswordPage()
{
       return (
              <>
                     <Helmet>
                            <title> Auth Classic: New Password</title>
                     </Helmet>

                     <ModernNewPasswordView />
              </>
       );
}
