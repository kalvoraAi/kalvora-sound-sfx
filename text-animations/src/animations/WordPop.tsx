import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stage, TextProps} from '../types';

export const WordPop: React.FC<TextProps & {delayPerWord: number}> = (p) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = p.text.split(' ');
  return (
    <Stage background={p.background}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: p.fontSize * 0.25,
          maxWidth: 1600,
          color: p.color,
          fontSize: p.fontSize,
          fontFamily: p.fontFamily,
          fontWeight: p.fontWeight,
        }}
      >
        {words.map((w, i) => {
          const s = spring({
            frame: frame - i * p.delayPerWord,
            fps,
            config: {damping: 12, stiffness: 180},
          });
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: interpolate(s, [0, 0.4], [0, 1], {extrapolateRight: 'clamp'}),
                transform: `scale(${interpolate(s, [0, 1], [0.3, 1])})`,
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </Stage>
  );
};
