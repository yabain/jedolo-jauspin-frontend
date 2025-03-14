import { Helmet } from 'react-helmet-async';

import { MailView } from 'src/sections/byTemplate/mail/view';

// ----------------------------------------------------------------------

export default function MailPage()
{
       return (
              <>
                     <Helmet>
                            <title> Dashboard: Mail</title>
                     </Helmet>

                     <MailView />
              </>
       );
}
