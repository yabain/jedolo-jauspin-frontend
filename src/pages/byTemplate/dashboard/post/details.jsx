import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PostDetailsView } from 'src/sections/byTemplate/blog/view';

// ----------------------------------------------------------------------

export default function PostDetailsPage() {
       const params = useParams();

       const { title } = params;

       return (
              <>
                     <Helmet>
                            <title> Ndolo: Post Details</title>
                     </Helmet>

                     <PostDetailsView title={`${title}`} />
              </>
       );
}
