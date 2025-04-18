import { Helmet } from 'react-helmet-async';

import { MailView } from 'src/sections/byTemplate/mail/view';

// ----------------------------------------------------------------------

export default function MailPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Mail</title>
                     </Helmet>

                     <MailView />
              </>
       );
}
