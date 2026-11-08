import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Stage, TextProps} from '../types';

export const BlurIn: React.FC<TextProps> = (p) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <Stage background={p.background}>
      <div
        style={{
          color: p.color,
          fontSize: p.fontSize,
          fontFamily: p.fontFamily,
          fontWeight: p.fontWeight,
          opacity: t,
          filter: `blur(${interpolate(t, [0, 1], [24, 0])}px)`,
          transform: `scale(${interpolate(t, [0, 1], [1.3, 1])})`,
          letterSpacing: interpolate(t, [0, 1], [30, 0]),
        }}
      >
        {p.text}
      </div>
    </Stage>
  );
};
