import { Helmet } from 'react-helmet-async';

import StepperView from 'src/sections/byTemplate/_examples/mui/stepper-view';

// ----------------------------------------------------------------------

export default function StepperPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Stepper</title>
                     </Helmet>

                     <StepperView />
              </>
       );
}
