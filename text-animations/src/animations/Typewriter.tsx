import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, TextProps} from '../types';

export const Typewriter: React.FC<TextProps & {framesPerChar: number}> = (p) => {
  const frame = useCurrentFrame();
  const shown = Math.min(p.text.length, Math.floor(frame / p.framesPerChar));
  const cursorOn = Math.floor(frame / 15) % 2 === 0;
  return (
    <Stage background={p.background}>
      <div
        style={{
          color: p.color,
          fontSize: p.fontSize,
          fontFamily: 'Menlo, Consolas, monospace',
          fontWeight: p.fontWeight,
          whiteSpace: 'pre',
        }}
      >
        {p.text.slice(0, shown)}
        <span style={{opacity: cursorOn ? 1 : 0}}>|</span>
      </div>
    </Stage>
  );
};
