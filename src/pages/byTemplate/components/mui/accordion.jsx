import { Helmet } from 'react-helmet-async';

import AccordionView from 'src/sections/byTemplate/_examples/mui/accordion-view';

// ----------------------------------------------------------------------

export default function AccordionPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Accordion</title>
                     </Helmet>

                     <AccordionView />
              </>
       );
}
