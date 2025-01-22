import { Helmet } from 'react-helmet-async';

import SliderView from 'src/sections/byTemplate/_examples/mui/slider-view';

// ----------------------------------------------------------------------

export default function SliderPage()
{
       return (
              <>
                     <Helmet>
                            <title> MUI: Slider</title>
                     </Helmet>

                     <SliderView />
              </>
       );
}
