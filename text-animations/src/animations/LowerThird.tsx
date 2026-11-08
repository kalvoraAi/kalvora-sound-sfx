import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type LowerThirdProps = {
  name: string;
  title: string;
  accent: string;
  textColor: string;
  fontFamily: string;
  background: string;
};

export const LowerThird: React.FC<LowerThirdProps> = (p) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const inS = spring({frame, fps, config: {damping: 200}});
  const outS = spring({
    frame: frame - (durationInFrames - 20),
    fps,
    config: {damping: 200},
    durationInFrames: 20,
  });
  const progress = inS - outS; // 0 -> 1 -> 0
  return (
    <AbsoluteFill style={{background: p.background, justifyContent: 'flex-end'}}>
      <div style={{display: 'flex', margin: '0 0 140px 120px', alignItems: 'stretch'}}>
        <div
          style={{
            width: 12,
            background: p.accent,
            transformOrigin: 'top',
            transform: `scaleY(${progress})`,
          }}
        />
        <div
          style={{
            padding: '14px 28px',
            background: 'rgba(0,0,0,0.65)',
            fontFamily: p.fontFamily,
            color: p.textColor,
            opacity: progress,
            transform: `translateX(${interpolate(progress, [0, 1], [-60, 0])}px)`,
          }}
        >
          <div style={{fontSize: 56, fontWeight: 800}}>{p.name}</div>
          <div style={{fontSize: 32, fontWeight: 400, opacity: 0.85}}>{p.title}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
