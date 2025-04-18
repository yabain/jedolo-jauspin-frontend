import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { TourEditView } from 'src/sections/byTemplate/tour/view';

// ----------------------------------------------------------------------

export default function TourEditPage() {
       const params = useParams();

       const { id } = params;

       return (
              <>
                     <Helmet>
                            <title> Ndolo: Tour Edit</title>
                     </Helmet>

                     <TourEditView id={`${id}`} />
              </>
       );
}
