import { Helmet } from 'react-helmet-async';

import { ClassicForgotPasswordView } from 'src/sections/byTemplate/auth-demo/classic';

// ----------------------------------------------------------------------

export default function ClassicForgotPasswordPage()
{
       return (
              <>
                     <Helmet>
                            <title> Auth Classic: Forgot Password</title>
                     </Helmet>

                     <ClassicForgotPasswordView />
              </>
       );
}
