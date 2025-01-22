import { Helmet } from 'react-helmet-async';

import { AboutView } from 'src/sections/byTemplate/about/view';

// ----------------------------------------------------------------------

export default function AboutPage()
{
       return (
              <>
                     <Helmet>
                            <title> About us</title>
                     </Helmet>

                     <AboutView />
              </>
       );
}
