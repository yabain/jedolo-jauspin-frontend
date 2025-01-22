import { Helmet } from 'react-helmet-async';

import { SupabaseVerifyView } from 'src/sections/byTemplate/auth/supabase';

// ----------------------------------------------------------------------

export default function VerifyPage()
{
       return (
              <>
                     <Helmet>
                            <title> Supabase: Verify</title>
                     </Helmet>

                     <SupabaseVerifyView />
              </>
       );
}
