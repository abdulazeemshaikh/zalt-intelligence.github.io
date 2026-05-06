
import React from 'react';

interface CallInterfaceProps {
  onEndCall: () => void;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  isMuted: boolean;
  isVideoEnabled: boolean;
  videoStream: MediaStream | null;
  isConnecting: boolean;
  transcriptions: {role: 'user' | 'model', text: string}[];
  audioAnalyser: AnalyserNode | null;
  isEmbedded?: boolean;
}

export const CallInterface: React.FC<CallInterfaceProps> = ({ onEndCall }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl flex items-center justify-between">
      <span>Mock Call Interface</span>
      <button onClick={onEndCall} className="bg-red-500 px-3 py-1 rounded">End</button>
    </div>
  );
};
