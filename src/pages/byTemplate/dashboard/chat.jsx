import { Helmet } from 'react-helmet-async';

import { ChatView } from 'src/sections/byTemplate/chat/view';

// ----------------------------------------------------------------------

export default function ChatPage() {
  return (
    <>
      <Helmet>
        <title> Ndolo: Chat</title>
      </Helmet>

      <ChatView />
    </>
  );
}
