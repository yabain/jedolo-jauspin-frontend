import { Helmet } from 'react-helmet-async';

import { View403 } from 'src/sections/byTemplate/error';

// ----------------------------------------------------------------------

export default function Page403()
{
       return (
              <>
                     <Helmet>
                            <title> 403 Forbidden</title>
                     </Helmet>

                     <View403 />
              </>
       );
}
