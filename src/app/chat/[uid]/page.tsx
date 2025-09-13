'use client';

import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ChatPageProps {
  params: {
    uid: string; // dynamic route [uid]
  };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
  const { uid } = params;
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const [jitsiApi, setJitsiApi] = useState<any>(null);

  useEffect(() => {
    const loadJitsi = async () => {
      if (!jitsiContainerRef.current) return;

      const domain = 'meet.jit.si';
      const options = {
        roomName: `SkillForSkill-${uid}-${uuidv4()}`, // unique room per chat
        width: '100%',
        height: 600,
        parentNode: jitsiContainerRef.current,
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone',
            'camera',
            'hangup',
            'chat',
            'fullscreen',
            'tileview',
          ],
        },
        configOverwrite: {
          prejoinPageEnabled: false,
        },
      };

      // @ts-ignore
      const JitsiMeetExternalAPI = (window as any).JitsiMeetExternalAPI;
      const api = new JitsiMeetExternalAPI(domain, options);
      setJitsiApi(api);

      // Cleanup on unmount
      return () => api?.dispose();
    };

    loadJitsi();
  }, [uid]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        1-to-1 Video Chat with User {uid}
      </h1>
      <div
        ref={jitsiContainerRef}
        className="w-full rounded-lg overflow-hidden shadow-md"
      />
    </div>
  );
};

export default ChatPage;
