import { Helmet } from 'react-helmet-async';

import { CalendarView } from 'src/sections/byTemplate/calendar/view';

// ----------------------------------------------------------------------

export default function CalendarPage() {
  return (
    <>
      <Helmet>
        <title> Ndolo: Calendar</title>
      </Helmet>

      <CalendarView />
    </>
  );
}
