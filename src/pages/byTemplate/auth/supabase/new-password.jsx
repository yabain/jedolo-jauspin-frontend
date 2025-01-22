import { Helmet } from 'react-helmet-async';

import { SupabaseNewPasswordView } from 'src/sections/byTemplate/auth/supabase';

// ----------------------------------------------------------------------

export default function NewPasswordPage()
{
       return (
              <>
                     <Helmet>
                            <title> Supabase: New Password</title>
                     </Helmet>

                     <SupabaseNewPasswordView />
              </>
       );
}
