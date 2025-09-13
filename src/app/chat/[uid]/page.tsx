'use client';
export const runtime = 'edge'; // or 'force-dynamic' if you prefer

import { useSession } from 'next-auth/react';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import of JitsiMeeting, SSR disabled
const JitsiMeeting = dynamic(
  () => import('@jitsi/react-sdk').then(mod => mod.JitsiMeeting),
  { ssr: false, loading: () => <p>Loading video…</p> }
);

// TypeScript type for props
interface ChatPageProps {
  params: {
    uid: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { data: session, status } = useSession();
  const [showMeet, setShowMeet] = useState(false);

  // Compute room name
  const room = useMemo(() => {
    if (status !== 'authenticated' || !params.uid) return null;

    const a = session?.user?.id ?? '';
    const b = params.uid;

    return `match_${[a, b].sort().join('_')}`;
  }, [status, session?.user?.id, params.uid]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!room) return <p>Please log in</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Chat + Video Call</h2>

      <button
        onClick={() => setShowMeet((v) => !v)}
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
            interfaceConfigOverwrite={{ TOOLBAR_BUTTONS: ['microphone', 'camera', 'hangup'] }}
            getIFrameRef={(node: HTMLDivElement | null) => {
              if (node) {
                const iframe = node.querySelector('iframe') as HTMLIFrameElement | null;
                if (iframe) iframe.style.height = '100%';
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

