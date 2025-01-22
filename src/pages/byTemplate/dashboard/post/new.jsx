import { Helmet } from 'react-helmet-async';

import { PostCreateView } from 'src/sections/byTemplate/blog/view';

// ----------------------------------------------------------------------

export default function PostCreatePage()
{
       return (
              <>
                     <Helmet>
                            <title> Dashboard: Create a new post</title>
                     </Helmet>

                     <PostCreateView />
              </>
       );
}
