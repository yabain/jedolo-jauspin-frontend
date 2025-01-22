import { Helmet } from 'react-helmet-async';

import TimelineView from 'src/sections/byTemplate/_examples/mui/timeline-view';

// ----------------------------------------------------------------------

export default function TimelinePage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Timeline</title>
                     </Helmet>

                     <TimelineView />
              </>
       );
}
