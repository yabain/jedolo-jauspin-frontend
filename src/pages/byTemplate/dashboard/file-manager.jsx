import { Helmet } from 'react-helmet-async';

import { FileManagerView } from 'src/sections/byTemplate/file-manager/view';

// ----------------------------------------------------------------------

export default function FileManagerPage() {
  return (
    <>
      <Helmet>
        <title> Ndolo: File Manager</title>
      </Helmet>

      <FileManagerView />
    </>
  );
}
