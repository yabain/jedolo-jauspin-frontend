import { Helmet } from 'react-helmet-async';

import ImageView from 'src/sections/byTemplate/_examples/extra/image-view';

// ----------------------------------------------------------------------

export default function ImagePage()
{
       return (
              <>
                     <Helmet>
                            <title> Components: Image</title>
                     </Helmet>

                     <ImageView />
              </>
       );
}
