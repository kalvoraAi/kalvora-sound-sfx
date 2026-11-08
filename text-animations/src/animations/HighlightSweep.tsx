import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stage, TextProps} from '../types';

export const HighlightSweep: React.FC<TextProps & {highlightColor: string}> = (p) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const bar = spring({frame, fps, config: {damping: 200}, durationInFrames: 20});
  const text = spring({frame: frame - 8, fps, config: {damping: 200}});
  return (
    <Stage background={p.background}>
      <div style={{position: 'relative', padding: '10px 36px'}}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: p.highlightColor,
            borderRadius: 12,
            transformOrigin: 'left center',
            transform: `scaleX(${bar})`,
          }}
        />
        <div
          style={{
            position: 'relative',
            color: p.color,
            fontSize: p.fontSize,
            fontFamily: p.fontFamily,
            fontWeight: p.fontWeight,
            opacity: text,
            transform: `translateX(${interpolate(text, [0, 1], [-30, 0])}px)`,
          }}
        >
          {p.text}
        </div>
      </div>
    </Stage>
  );
};
