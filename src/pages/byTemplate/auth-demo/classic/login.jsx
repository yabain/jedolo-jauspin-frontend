import { Helmet } from 'react-helmet-async';

import { ClassicLoginView } from 'src/sections/byTemplate/auth-demo/classic';

// ----------------------------------------------------------------------

export default function ClassicLoginPage()
{
       return (
              <>
                     <Helmet>
                            <title> Auth Classic: Login</title>
                     </Helmet>

                     <ClassicLoginView />
              </>
       );
}
