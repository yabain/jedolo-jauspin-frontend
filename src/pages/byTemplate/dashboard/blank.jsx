import { Helmet } from 'react-helmet-async';

import BlankView from 'src/sections/byTemplate/blank/view';

// ----------------------------------------------------------------------

export default function BlankPage() {
  return (
    <>
      <Helmet>
        <title> Ndolo: Blank</title>
      </Helmet>

      <BlankView />
    </>
  );
}
