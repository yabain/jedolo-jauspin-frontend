import { Helmet } from 'react-helmet-async';

import AnimateView from 'src/sections/byTemplate/_examples/extra/animate-view';

// ----------------------------------------------------------------------

export default function AnimatePage()
{
       return (
              <>
                     <Helmet>
                            <title> Components: Animate</title>
                     </Helmet>

                     <AnimateView />
              </>
       );
}
