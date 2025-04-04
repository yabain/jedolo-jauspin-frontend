import { Helmet } from 'react-helmet-async';

import RatingView from 'src/sections/byTemplate/_examples/mui/rating-view';

// ----------------------------------------------------------------------

export default function RatingPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Rating</title>
                     </Helmet>

                     <RatingView />
              </>
       );
}
