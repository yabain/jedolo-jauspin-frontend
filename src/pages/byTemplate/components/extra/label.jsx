import { Helmet } from 'react-helmet-async';

import LabelView from 'src/sections/byTemplate/_examples/extra/label-view';

// ----------------------------------------------------------------------

export default function LabelPage()
{
       return (
              <>
                     <Helmet>
                            <title> Components: Label</title>
                     </Helmet>

                     <LabelView />
              </>
       );
}
