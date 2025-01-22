import { Helmet } from 'react-helmet-async';

import { ContactView } from 'src/sections/byTemplate/contact/view';

// ----------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title> Contact us</title>
      </Helmet>

      <ContactView />
    </>
  );
}
