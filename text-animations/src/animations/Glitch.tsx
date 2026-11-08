import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {Stage, TextProps} from '../types';

export const Glitch: React.FC<TextProps> = (p) => {
  const frame = useCurrentFrame();
  // Glitch in bursts: strong for the first 20 frames, then occasional spikes.
  const burst = frame < 20 || random(`burst-${Math.floor(frame / 6)}`) > 0.8;
  const amt = burst ? 14 : 3;
  const dx = (random(`x-${frame}`) - 0.5) * 2 * amt;
  const dy = (random(`y-${frame}`) - 0.5) * 2 * (amt / 3);

  const base: React.CSSProperties = {
    position: 'absolute',
    color: p.color,
    fontSize: p.fontSize,
    fontFamily: p.fontFamily,
    fontWeight: p.fontWeight,
    whiteSpace: 'pre',
  };

  return (
    <Stage background={p.background}>
      <div style={{position: 'relative'}}>
        <div style={{...base, color: '#ff0040', transform: `translate(${dx}px, ${dy}px)`, mixBlendMode: 'screen'}}>
          {p.text}
        </div>
        <div style={{...base, color: '#00e5ff', transform: `translate(${-dx}px, ${-dy}px)`, mixBlendMode: 'screen'}}>
          {p.text}
        </div>
        <div style={{...base, position: 'relative'}}>{p.text}</div>
      </div>
    </Stage>
  );
};
