'use client';

import { useState, useEffect } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useSession } from 'next-auth/react';

export default function ChatPage({ params }: { params: { uid: string } }) {
  const { data: session } = useSession();
  const [showMeet, setShowMeet] = useState(false);
  const room = `match_${[session?.user?.id, params.uid].sort().join('_')}`;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chat + Video Call</h2>

      <button
        onClick={() => setShowMeet(!showMeet)}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        {showMeet ? 'Close Video' : 'Start Video Call'}
      </button>

      {showMeet && (
        <div className="h-[500px] border rounded">
          <JitsiMeeting
            domain="meet.jit.si"
            roomName={room}
            configOverwrite={{ startWithAudioMuted: true }}
            getIFrameRef={(node) => {
              if (node) node.style.height = '100%';
            }}
          />
        </div>
      )}
    </div>
  );
}