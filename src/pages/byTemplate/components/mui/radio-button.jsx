import { Helmet } from 'react-helmet-async';

import RadioButtonView from 'src/sections/byTemplate/_examples/mui/radio-button-view';

// ----------------------------------------------------------------------

export default function RadioButtonPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Radio Button</title>
                     </Helmet>

                     <RadioButtonView />
              </>
       );
}
