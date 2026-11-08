import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stage, TextProps} from '../types';

export const LetterBounce: React.FC<TextProps & {delayPerLetter: number}> = (p) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <Stage background={p.background}>
      <div
        style={{
          color: p.color,
          fontSize: p.fontSize,
          fontFamily: p.fontFamily,
          fontWeight: p.fontWeight,
          whiteSpace: 'pre',
        }}
      >
        {p.text.split('').map((ch, i) => {
          const s = spring({
            frame: frame - i * p.delayPerLetter,
            fps,
            config: {damping: 8, stiffness: 150},
          });
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
                transform: `translateY(${interpolate(s, [0, 1], [-120, 0])}px)`,
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
    </Stage>
  );
};
