'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import type { JitsiMeetingProps } from '@jitsi/react-sdk';

/* 1. Load the SDK only on the client */
const JitsiMeeting = dynamic(
  () => import('@jitsi/react-sdk').then((mod) => mod.JitsiMeeting),
  { ssr: false, loading: () => <p className="p-4">Loading video …</p> }
);

export default function ChatPage({ params }: { params: { uid: string } }) {
  const { data: session, status } = useSession();
  const [showMeet, setShowMeet] = useState(false);

  /* 2. + 3. Stable room name only when both ids are available */
  const room = useMemo(() => {
    if (!session?.user?.id || !params.uid) return null;
    const [a, b] = [session.user.id, params.uid].sort();
    return `match_${a}_${b}`;
  }, [session?.user?.id, params.uid]);

  /* 4. Loading state */
  if (status === 'loading') {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Chat + Video Call</h2>
        <p className="text-sm text-gray-500">Loading session …</p>
      </div>
    );
  }

  /* Still need both ids */
  if (!room) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Chat + Video Call</h2>
        <p className="text-sm text-red-600">
          Could not create room – missing user information.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chat + Video Call</h2>

      <button
        onClick={() => setShowMeet((v) => !v)}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
        disabled={status !== 'authenticated'}
      >
        {showMeet ? 'Close Video' : 'Start Video Call'}
      </button>

      {showMeet && (
        <div className="h-[500px] border rounded overflow-hidden">
          <JitsiMeeting
            domain="meet.jit.si"
            roomName={room}
            configOverwrite={{
              startWithAudioMuted: true,
              disableDeepLinking: true,
            }}
            getIFrameRef={(node) => {
              if (node) node.style.height = '100%';
            }}
          />
        </div>
      )}
    </div>
  );
}