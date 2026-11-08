import React from 'react';
import {
  Easing,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Stage, TextProps} from '../types';

const textStyle = (p: TextProps): React.CSSProperties => ({
  color: p.color,
  fontSize: p.fontSize,
  fontFamily: p.fontFamily,
  fontWeight: p.fontWeight,
  whiteSpace: 'pre',
});

/** Random characters resolve into the real text, left to right. */
export const ScrambleDecode: React.FC<TextProps & {framesPerChar: number}> = (p) => {
  const frame = useCurrentFrame();
  const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@';
  const revealed = Math.floor(frame / p.framesPerChar);
  return (
    <Stage background={p.background}>
      <div style={{...textStyle(p), fontFamily: 'Menlo, Consolas, monospace'}}>
        {p.text.split('').map((c, i) => {
          if (c === ' ' || i < revealed) return <span key={i}>{c}</span>;
          const ch = pool[Math.floor(random(`${i}-${frame}`) * pool.length)];
          return (
            <span key={i} style={{opacity: 0.6}}>
              {ch}
            </span>
          );
        })}
      </div>
    </Stage>
  );
};

/** Neon sign that flickers on. */
export const NeonFlicker: React.FC<TextProps & {glowColor: string}> = (p) => {
  const frame = useCurrentFrame();
  const flicker = frame < 36 ? (random(`n-${Math.floor(frame / 2)}`) > 0.4 ? 1 : 0.15) : 1;
  const g = p.glowColor;
  return (
    <Stage background={p.background}>
      <div
        style={{
          ...textStyle(p),
          color: '#ffffff',
          opacity: flicker,
          textShadow: `0 0 8px ${g}, 0 0 20px ${g}, 0 0 40px ${g}, 0 0 80px ${g}`,
        }}
      >
        {p.text}
      </div>
    </Stage>
  );
};

/** Text is revealed by a bar wiping left to right. */
export const WipeReveal: React.FC<TextProps & {barColor: string}> = (p) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame, fps, config: {damping: 200}, durationInFrames: 28});
  return (
    <Stage background={p.background}>
      <div style={{position: 'relative'}}>
        <div style={{...textStyle(p), clipPath: `inset(0 ${(1 - s) * 100}% 0 0)`}}>{p.text}</div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${s * 100}%`,
            width: 14,
            background: p.barColor,
            opacity: s < 1 ? 1 : 0,
          }}
        />
      </div>
    </Stage>
  );
};

/** Rubber-band stretch with overshoot. */
export const ElasticStretch: React.FC<TextProps> = (p) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame, fps, config: {damping: 6, stiffness: 110}});
  return (
    <Stage background={p.background}>
      <div style={{...textStyle(p), transform: `scale(${s}, ${Math.max(0.2, 2 - s)})`}}>{p.text}</div>
    </Stage>
  );
};

/** Cinematic letter-spacing that tightens as the title fades in. */
export const TrackingIn: React.FC<TextProps> = (p) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 60], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: 'clamp',
  });
  return (
    <Stage background={p.background}>
      <div
        style={{
          ...textStyle(p),
          letterSpacing: interpolate(t, [0, 1], [90, 4]),
          opacity: interpolate(t, [0, 0.5], [0, 1], {extrapolateRight: 'clamp'}),
          transform: `scale(${interpolate(t, [0, 1], [1.08, 1])})`,
          paddingLeft: interpolate(t, [0, 1], [90, 4]), // keeps text visually centered
        }}
      >
        {p.text}
      </div>
    </Stage>
  );
};

/** Letters flip in like a split-flap board. */
export const SplitFlip: React.FC<TextProps & {delayPerLetter: number}> = (p) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <Stage background={p.background}>
      <div style={{...textStyle(p), perspective: 900}}>
        {p.text.split('').map((c, i) => {
          const s = spring({frame: frame - i * p.delayPerLetter, fps, config: {damping: 14, stiffness: 140}});
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: interpolate(s, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}),
                transform: `rotateX(${interpolate(s, [0, 1], [-90, 0])}deg)`,
                transformOrigin: '50% 100%',
              }}
            >
              {c}
            </span>
          );
        })}
      </div>
    </Stage>
  );
};

/** Number counts up. Edit from / to / prefix / suffix. */
export const Counter: React.FC<
  TextProps & {from: number; to: number; prefix: string; suffix: string; countFrames: number}
> = (p) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [0, p.countFrames], [p.from, p.to], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: 'clamp',
  });
  return (
    <Stage background={p.background}>
      <div style={{...textStyle(p), fontVariantNumeric: 'tabular-nums'}}>
        {p.prefix}
        {Math.round(v).toLocaleString('en-US')}
        {p.suffix}
      </div>
    </Stage>
  );
};

/** Caption-style: each word lights up in turn. */
export const Karaoke: React.FC<
  TextProps & {highlightColor: string; dimColor: string; wordFrames: number}
> = (p) => {
  const frame = useCurrentFrame();
  const words = p.text.split(' ');
  const active = Math.floor(frame / p.wordFrames);
  return (
    <Stage background={p.background}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: p.fontSize * 0.3,
          maxWidth: 1600,
          fontSize: p.fontSize,
          fontFamily: p.fontFamily,
          fontWeight: p.fontWeight,
        }}
      >
        {words.map((w, i) => {
          const isActive = i === active;
          return (
            <span
              key={i}
              style={{
                color: isActive ? p.color : i < active ? p.highlightColor : p.dimColor,
                background: isActive ? p.highlightColor : 'transparent',
                padding: '0 18px',
                borderRadius: 14,
                transform: `scale(${isActive ? 1.1 : 1})`,
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

/** Chunky 3D extruded title that pops in. */
export const Extrude3D: React.FC<TextProps & {extrudeColor: string}> = (p) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame, fps, config: {damping: 12, stiffness: 120}});
  const depth = Math.round(interpolate(s, [0, 1], [0, 22]));
  const shadows = Array.from({length: depth}, (_, i) => `${i + 1}px ${i + 1}px 0 ${p.extrudeColor}`).join(', ');
  return (
    <Stage background={p.background}>
      <div
        style={{
          ...textStyle(p),
          textShadow: shadows || 'none',
          transform: `scale(${interpolate(s, [0, 1], [0.6, 1])}) rotate(${interpolate(s, [0, 1], [-6, -2])}deg)`,
          opacity: Math.min(1, s * 3),
        }}
      >
        {p.text}
      </div>
    </Stage>
  );
};
