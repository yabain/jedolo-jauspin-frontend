import { Helmet } from 'react-helmet-async';

import { PostListView } from 'src/sections/byTemplate/blog/view';

// ----------------------------------------------------------------------

export default function PostListPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Post List</title>
                     </Helmet>

                     <PostListView />
              </>
       );
}
