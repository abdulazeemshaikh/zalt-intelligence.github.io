
import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Paperclip, 
  Camera, 
  FileText, 
  Pencil,
  X,
  Image as ImageIcon,
  Undo2,
  Redo2,
  Trash2,
  Check,
  Mic,
  Square,
  MoreHorizontal
} from 'lucide-react';
import { Attachment, AppSettings } from '../types';
import { CallInterface } from './CallInterface';
import { Whiteboard, WhiteboardRef, COLORS } from './Whiteboard';

interface InputAreaProps {
  input: string;
  setInput: (val: string | ((prev: string) => string)) => void;
  onSend: () => void;
  isLoading: boolean;
  onStop?: () => void;
  onAttach: (files: FileList) => void;
  onAddAttachment?: (attachment: Attachment) => void;
  attachments: Attachment[];
  removeAttachment: (index: number) => void;
  settings: AppSettings;
  updateSettings: (s: Partial<AppSettings>) => void;
  onToggleLive?: (withVideo?: boolean) => void;
  isLive?: boolean;
  isMini?: boolean;
  isConnectingLive?: boolean;
  localVideoStream?: MediaStream | null;
  onToggleMute?: () => void;
  onToggleVideo?: () => void;
  isMuted?: boolean;
  isVideoEnabled?: boolean;
  transcriptions?: {role: 'user' | 'model', text: string}[];
  audioAnalyser?: AnalyserNode | null;
}

export interface InputAreaHandle {
  toggleLive: (withVideo?: boolean) => void;
  toggleVideoLive: () => void;
}

export const InputArea = forwardRef<InputAreaHandle, InputAreaProps>((props, ref) => {
  const {
    input, 
    setInput, 
    onSend, 
    isLoading, 
    onAttach,
    onAddAttachment,
    attachments, 
    removeAttachment,
    onToggleLive,
    isLive = false,
    isMini = false,
    isConnectingLive = false,
    localVideoStream = null,
    onToggleMute = () => {},
    onToggleVideo = () => {},
    isMuted = false,
    isVideoEnabled = false,
    transcriptions = [],
    audioAnalyser = null
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  
  const sentences = [
    "Open my email",
    "Tell Sarah I’ll be late",
    "Crop that photo and send it to David",
    "Where’s the receipt from last week?",
    "Is this claim about vaccines true?",
    "Send $20 to Alex using his phone number.",
    "If a teacher posts homework, finish it and submit it. Make no mistake.",
    "Track every idea I’ve ever had and bring them to life.",
    "Make money for me.",
    "Call my mom, tell her I am busy and will coming home late.",
    "I have an exam tomorrow, predict all questions that can come.",
    "Invest $10,000 based on low-risk strategy",
    "Find every mention of my name online and summarize what people think of me.",
    "Track everything I do for a week and optimize my life like a performance coach.",
    "I am absent today. You’re in charge. Get all work done. Make no mistake",
    "Run my life while I sleep",
    "I have $0. Invest in bitcoin",
    "Book me a dentist appointment next week after 4pm",
    "Book me an uber to the nearest burger king",
    "Book me a private jet to LA",
    "Reply to all unread messages"
  ];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let sentenceIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentSentence = sentences[sentenceIndex];
      
      if (isDeleting) {
        setPlaceholder(currentSentence.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 50;
      } else {
        setPlaceholder(currentSentence.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentSentence.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at the end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
        typingSpeed = 500; // Pause before new sentence
      }

      timerRef.current = setTimeout(type, typingSpeed);
    };

    timerRef.current = setTimeout(type, typingSpeed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const whiteboardRef = useRef<WhiteboardRef>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = (reader.result as string).split(',')[1];
          const attachment: Attachment = {
            name: `voice-note-${Date.now()}.webm`,
            type: 'audio/webm',
            url: reader.result as string,
            base64Data
          };
          onAddAttachment?.(attachment);
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Recording error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  useImperativeHandle(ref, () => ({
    toggleLive: (withVideo?: boolean) => onToggleLive?.(withVideo),
    toggleVideoLive: () => onToggleLive?.(true)
  }));

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isCameraOpen && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(err => {
          console.error("Camera error:", err);
          setIsCameraOpen(false);
        });
    }
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [isCameraOpen]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        const attachment: Attachment = {
          name: `photo-${Date.now()}.png`,
          type: 'image/png',
          url: imageData,
          base64Data: imageData.split(',')[1]
        };
        onAddAttachment?.(attachment);
        setIsCameraOpen(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && (input.trim() || attachments.length > 0)) {
        onSend();
      }
    }
  };

  const handleSketchDone = (imageData: string) => {
    const attachment: Attachment = {
      name: `sketch-${Date.now()}.png`,
      type: 'image/png',
      url: imageData,
      base64Data: imageData.split(',')[1]
    };
    onAddAttachment?.(attachment);
    setIsWhiteboardOpen(false);
  };

  const containerWidth = isMini ? 'w-[260px]' : 'w-[650px] max-w-[95%]';

  return (
    <div className={`relative ${containerWidth} flex flex-col items-center mx-auto mb-6 px-4 font-sans`}>
      <motion.div 
        layout
        className="rounded-[2.5rem] p-[6px] shadow-[0_12px_45px_rgba(39,151,202,0.15),inset_0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-2xl flex flex-col mx-auto w-full bg-[#F0F9FF]/90 border border-[#D1E9F7]"
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        {/* Top Drawer - Icons for: File, Photo, Text, Sketch, and Talk */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col items-center justify-center text-[#2797CA]"
            >
              {/* Call Interface - Only shown when live, above the buttons */}
              {isLive && (
                <div className="w-full pt-4">
                    <CallInterface 
                      onEndCall={() => onToggleLive?.()}
                      onToggleMute={onToggleMute}
                      onToggleVideo={onToggleVideo}
                      isMuted={isMuted}
                      isVideoEnabled={isVideoEnabled}
                      videoStream={localVideoStream}
                      isConnecting={isConnectingLive}
                      transcriptions={transcriptions}
                      audioAnalyser={audioAnalyser}
                      isEmbedded={true}
                    />
                </div>
              )}

              {/* Attachment Preview Chips - Shown in the menu */}
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 px-6 pt-4 w-full justify-center">
                  {attachments.map((file, index) => (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={index} 
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#D1E9F7] text-[#2797CA] text-sm shadow-sm backdrop-blur-sm"
                    >
                      {file.type.startsWith('image/') ? <ImageIcon size={14} /> : <FileText size={14} />}
                      <span className="max-w-[120px] truncate">{file.name}</span>
                      <button 
                        onClick={() => removeAttachment(index)}
                        className="hover:text-red-500 transition-colors"
                        title="Remove"
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Camera Interface - Shown when camera is active */}
              {isCameraOpen && (
                <div className="w-full px-4 pt-4">
                  <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-[#D1E9F7]">
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline
                      className="w-full h-auto block"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    
                    <button 
                      onClick={() => setIsCameraOpen(false)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                    >
                      <X size={20} />
                    </button>

                    <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
                      <button 
                        onClick={handleCapture}
                        className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-transparent active:scale-95 transition-transform"
                      >
                        <div className="w-12 h-12 rounded-full bg-white transition-all hover:scale-90" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Whiteboard - Shown when pencil is active, above buttons */}
              {isWhiteboardOpen && (
                <div className="w-full px-4 pt-4">
                  <Whiteboard 
                    ref={whiteboardRef}
                    onClose={() => setIsWhiteboardOpen(false)}
                    onDone={handleSketchDone}
                    isEmbedded={true}
                    hideControls={true}
                  />
                </div>
              )}

              {/* Recording Interface */}
              {isRecording && (
                <div className="w-full px-6 pt-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full py-4 flex items-center justify-between bg-[#2797CA]/5 rounded-2xl border border-[#D1E9F7]"
                  >
                    <div className="flex items-center gap-3 pl-4">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[#2797CA] font-medium text-sm">Recording Audio...</span>
                    </div>
                    <button 
                      onClick={stopRecording}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold shadow-lg hover:bg-red-600 transition-all active:scale-95 mr-4"
                    >
                      <Square size={14} fill="currentColor" />
                      Stop & Attach
                    </button>
                  </motion.div>
                </div>
              )}

              <div className="pb-4 pt-1 px-6 flex flex-col items-center justify-center gap-4 w-full relative">
                {/* More Menu Popup - Removed per user request */}

                {/* Whiteboard Toolbar row */}
                <AnimatePresence>
                  {isWhiteboardOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-4 items-center w-full justify-between overflow-hidden"
                    >
                      {/* External Whiteboard Colors */}
                      <div className="flex gap-1.5 items-center">
                        {COLORS.map(color => (
                          <button
                            key={color}
                            onClick={() => whiteboardRef.current?.setColor(color)}
                            className="w-4 h-4 rounded-full border border-[#D1E9F7] shadow-sm transition-transform hover:scale-125 focus:ring-1 focus:ring-[#2797CA] outline-none"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      <div className="flex gap-4 items-center">
                        <Undo2 
                          onClick={() => whiteboardRef.current?.undo()}
                          className="w-5 h-5 text-[#2797CA]/60 hover:text-[#2797CA] cursor-pointer active:scale-90 transition-all" 
                        />
                        <Redo2 
                          onClick={() => whiteboardRef.current?.redo()}
                          className="w-5 h-5 text-[#2797CA]/60 hover:text-[#2797CA] cursor-pointer active:scale-90 transition-all" 
                        />
                        <Trash2 
                          onClick={() => whiteboardRef.current?.clear()}
                          className="w-5 h-5 text-[#A0D8F0] hover:text-red-500 cursor-pointer active:scale-90 transition-all" 
                        />
                      </div>

                      <button 
                        onClick={() => whiteboardRef.current?.handleDone()}
                        className="p-1.5 rounded-full bg-[#2797CA] text-white hover:brightness-110 transition-all flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Always visible 5 main action buttons row */}
                <div className="flex gap-6 items-center justify-center">
                  {/* 1. Upload any file */}
                  <Paperclip 
                    className="w-5 h-5 stroke-[1.5] text-[#2797CA] cursor-default" 
                  />
                  {/* 2. Take photo */}
                  <Camera 
                    className="w-5 h-5 stroke-[1.5] text-[#2797CA] cursor-default" 
                  />
                  
                  {/* 6. More */}
                  <MoreHorizontal 
                    className="w-5 h-5 stroke-[1.5] text-[#2797CA] cursor-default" 
                  />
                  
                  {/* 7. Talk (Audio Lines Icon) */}
                  <div 
                    className="p-2 rounded-full transition-all cursor-default shadow-sm bg-[#2797CA]/10 text-[#2797CA]"
                  >
                    <WaveformIcon 
                      className="w-[18px] h-[18px] stroke-[1.5]" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Input Row */}
        <div className="flex bg-white rounded-full items-center p-1.5 pl-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.04)] z-20 border border-[#E6F4FC]">
          {/* Main Toggle Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_16px_rgba(39,151,202,0.25)] ${
              isOpen 
                ? 'brightness-90 scale-95' 
                : 'hover:brightness-110 hover:shadow-[0_10px_20px_rgba(39,151,202,0.35)] active:scale-95'
            }`}
            style={{ 
              background: 'linear-gradient(to bottom, #5EB9E6, #2797CA)',
              border: '1px solid rgba(255, 255, 255, 0.2)' 
            }}
          >
            <img src="25.png" alt="25" className="w-6 h-6 object-contain" />
          </button>

          <input
            type="text"
            value={input}
            readOnly
            placeholder={placeholder}
            spellCheck={false}
            className="flex-1 bg-transparent px-3 outline-none text-[#1A5D7D] placeholder:text-[#A0D8F0] text-[16px] tracking-tight font-normal selection:bg-[#D1E9F7] cursor-default"
          />

          {/* Send Button logic integration removed per user request */}
        </div>
      </motion.div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={(e) => e.target.files && onAttach(e.target.files)} 
        className="hidden" 
        multiple 
      />
    </div>
  );
});

// --- Helper Icons used in the input area ---

function WaveformIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v18"/>
      <path d="M8 8v8"/>
      <path d="M16 8v8"/>
      <path d="M4 11v2"/>
      <path d="M20 11v2"/>
    </svg>
  );
}
