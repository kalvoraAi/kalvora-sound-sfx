import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stage, TextProps} from '../types';

/** Each line slides up from behind a mask. Use \n in text for multiple lines. */
export const SlideReveal: React.FC<TextProps> = (p) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lines = p.text.split('\n');
  return (
    <Stage background={p.background}>
      <div
        style={{
          color: p.color,
          fontSize: p.fontSize,
          fontFamily: p.fontFamily,
          fontWeight: p.fontWeight,
          lineHeight: 1.1,
          textAlign: 'center',
        }}
      >
        {lines.map((line, i) => {
          const s = spring({frame: frame - i * 8, fps, config: {damping: 200}});
          return (
            <div key={i} style={{overflow: 'hidden', paddingBottom: 8}}>
              <div style={{transform: `translateY(${interpolate(s, [0, 1], [110, 0])}%)`}}>
                {line}
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};
