import { Helmet } from 'react-helmet-async';

import CarouselView from 'src/sections/byTemplate/_examples/extra/carousel-view';

// ----------------------------------------------------------------------

export default function CarouselPage()
{
       return (
              <>
                     <Helmet>
                            <title> Components: Carousel</title>
                     </Helmet>

                     <CarouselView />
              </>
       );
}
