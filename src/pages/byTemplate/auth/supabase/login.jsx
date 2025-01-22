import { Helmet } from 'react-helmet-async';

import { SupabaseLoginView } from 'src/sections/byTemplate/auth/supabase';

// ----------------------------------------------------------------------

export default function LoginPage()
{
       return (
              <>
                     <Helmet>
                            <title> Supabase: Login</title>
                     </Helmet>

                     <SupabaseLoginView />
              </>
       );
}
