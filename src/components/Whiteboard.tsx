
import React, { forwardRef, useImperativeHandle } from 'react';

export const COLORS = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

interface WhiteboardProps {
  onClose: () => void;
  onDone: (imageData: string) => void;
  isEmbedded?: boolean;
  hideControls?: boolean;
}

export interface WhiteboardRef {
  setColor: (color: string) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  handleDone: () => void;
}

export const Whiteboard = forwardRef<WhiteboardRef, WhiteboardProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    setColor: () => {},
    undo: () => {},
    redo: () => {},
    clear: () => {},
    handleDone: () => {
        props.onDone('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');
    }
  }));

  return (
    <div className="bg-white border rounded-xl h-40 flex items-center justify-center text-gray-400">
      Mock Whiteboard
    </div>
  );
});
