import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { TourDetailsView } from 'src/sections/byTemplate/tour/view';

// ----------------------------------------------------------------------

export default function TourDetailsPage() {
       const params = useParams();

       const { id } = params;

       return (
              <>
                     <Helmet>
                            <title> Ndolo: Analytics</title>
                     </Helmet>

                     <TourDetailsView id={`${id}`} />
              </>
       );
}
