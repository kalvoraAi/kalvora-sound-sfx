import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stage, TextProps} from '../types';

export const FadeUp: React.FC<TextProps> = (p) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame, fps, config: {damping: 200}});
  return (
    <Stage background={p.background}>
      <div
        style={{
          color: p.color,
          fontSize: p.fontSize,
          fontFamily: p.fontFamily,
          fontWeight: p.fontWeight,
          opacity: s,
          transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
        }}
      >
        {p.text}
      </div>
    </Stage>
  );
};
