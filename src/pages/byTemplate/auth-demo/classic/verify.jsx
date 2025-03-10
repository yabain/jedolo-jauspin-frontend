import { Helmet } from 'react-helmet-async';

import { ClassicVerifyView } from 'src/sections/byTemplate/auth-demo/classic';

// ----------------------------------------------------------------------

export default function ClassicVerifyPage()
{
       return (
              <>
                     <Helmet>
                            <title> Auth Classic: Verify</title>
                     </Helmet>

                     <ClassicVerifyView />
              </>
       );
}
