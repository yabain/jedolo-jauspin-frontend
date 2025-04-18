import { Helmet } from 'react-helmet-async';

import { KanbanView } from 'src/sections/byTemplate/kanban/view';

// ----------------------------------------------------------------------

export default function KanbanPage() {
       return (
              <>
                     <Helmet>
                            <title> Ndolo: Kanban</title>
                     </Helmet>

                     <KanbanView />
              </>
       );
}
