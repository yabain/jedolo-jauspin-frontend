import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PostEditView } from 'src/sections/byTemplate/blog/view';

// ----------------------------------------------------------------------

export default function PostEditPage() {
       const params = useParams();

       const { title } = params;

       return (
              <>
                     <Helmet>
                            <title> Ndolo: Post Edit</title>
                     </Helmet>

                     <PostEditView title={`${title}`} />
              </>
       );
}
