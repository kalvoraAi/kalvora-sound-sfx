import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {Stage, TextProps} from '../types';

const useLoopP = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (frame % durationInFrames) / durationInFrames;
};

/**
 * Vertical carousel of pill labels. Pills near the center are filled with the
 * accent color and glow; outer pills are outlined and fade out. One label per line.
 */
export const LoopPillCarousel: React.FC<TextProps & {accent: string; spacing: number; filledRows: number}> = (p) => {
  const t = useLoopP();
  const items = p.text.split('\n').filter(Boolean);
  const total = items.length * p.spacing;
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0}}>
        {items.map((label, i) => {
          // Pills travel downward: outlined above the center line, filled (glowing) below it.
          const y = ((((i * p.spacing + t * total) % total) + total) % total) - total / 2;
          const d = Math.abs(y) / p.spacing;
          const filled = y > -p.spacing * 0.35 && y < p.spacing * (p.filledRows + 0.2);
          const edge = Math.max(0, Math.min(1, (items.length / 2 - d) * 0.9)) * (y > 0 ? Math.max(0, 1 - Math.max(0, y / p.spacing - p.filledRows + 1) * 0.9) : 1);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 540 + y - p.fontSize,
                display: 'flex',
                justifyContent: 'center',
                opacity: edge * (filled ? 1 : 0.85),
              }}
            >
              <div
                style={{
                  fontSize: p.fontSize,
                  fontFamily: p.fontFamily,
                  fontWeight: p.fontWeight,
                  color: p.color,
                  padding: `${p.fontSize * 0.22}px ${p.fontSize * 0.8}px`,
                  borderRadius: 999,
                  border: filled ? `3px solid ${p.accent}` : `2px solid ${p.color}`,
                  background: filled ? `linear-gradient(180deg, ${p.accent}, #b81d00)` : 'transparent',
                  boxShadow: filled ? `0 0 ${p.fontSize * 0.6}px ${p.accent}` : 'none',
                  transform: `scale(${Math.max(0.7, 1 - d * 0.05)})`,
                  whiteSpace: 'pre',
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/**
 * Vertical carousel of label boxes. The box in the top slot is solid accent with
 * white text; the others are black boxes with an accent outline and a small random-looking
 * tilt. Labels scroll upward and overlap slightly as they pass. One label per line.
 */
export const LoopTiltedStrips: React.FC<TextProps & {accent: string; spacing: number}> = (p) => {
  const t = useLoopP();
  const labels = p.text.split('\n').filter(Boolean);
  const total = labels.length * p.spacing;
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
        {labels.map((label, i) => {
          const y = ((((i * p.spacing - t * total) % total) + total) % total) - total / 2;
          const top = y < -p.spacing * 0.6; // top slot = filled style
          const tilt = top ? 0 : Math.sin(i * 2.1) * 3.5 - 1;
          const edge = Math.max(0, Math.min(1, (labels.length / 2 - Math.abs(y) / p.spacing) * 1.2));
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 540 + y - p.fontSize,
                height: p.fontSize * 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: edge,
                transform: `rotate(${tilt}deg)`,
              }}
            >
              <div
                style={{
                  padding: `${p.fontSize * 0.12}px ${p.fontSize * 0.3}px`,
                  background: top ? p.accent : '#000',
                  color: p.color,
                  border: top ? 'none' : `4px solid ${p.accent}`,
                  fontSize: top ? p.fontSize * 1.1 : p.fontSize,
                  fontFamily: p.fontFamily,
                  fontWeight: p.fontWeight,
                  whiteSpace: 'pre',
                }}
              >
                {label.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/**
 * Rows of outlined pill chips scrolling sideways, alternating direction.
 * One row per line; chips separated by "|". Start a chip with "*" to fill it with the accent color.
 */
export const LoopPillMarquee: React.FC<TextProps & {accent: string; rowGap: number}> = (p) => {
  const t = useLoopP();
  const rows = p.text.split('\n').filter(Boolean);
  const copies = 4;
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
        {rows.map((row, r) => {
          const chips = row.split('|').map((c) => c.trim()).filter(Boolean);
          const dir = r % 2 === 0 ? 1 : -1;
          const shift = dir === 1 ? -(t * 100) / copies : -100 / copies + (t * 100) / copies;
          // Offset each row so rows don't line up.
          const nudge = (r % 3) * 6;
          return (
            <div
              key={r}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 540 + (r - (rows.length - 1) / 2) * p.rowGap - p.fontSize,
                height: p.fontSize * 2,
                display: 'flex',
                alignItems: 'center',
                transform: `translateX(${nudge}px)`,
              }}
            >
              <div style={{display: 'flex', width: 'max-content', transform: `translateX(${shift}%)`}}>
                {Array.from({length: copies}).flatMap((_, k) =>
                  chips.map((chip, i) => {
                    const filled = chip.startsWith('*');
                    const label = filled ? chip.slice(1).trim() : chip;
                    return (
                      <div
                        key={`${k}-${i}`}
                        style={{
                          flexShrink: 0,
                          marginRight: p.fontSize * 0.5,
                          padding: `${p.fontSize * 0.25}px ${p.fontSize * 0.8}px`,
                          borderRadius: 999,
                          border: `3px solid ${filled ? p.accent : p.color}`,
                          background: filled ? p.accent : 'transparent',
                          color: p.color,
                          fontSize: p.fontSize,
                          fontFamily: p.fontFamily,
                          fontWeight: p.fontWeight,
                          whiteSpace: 'pre',
                        }}
                      >
                        {label}
                      </div>
                    );
                  }),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/**
 * Words ride an S-shaped ribbon that scrolls forever; they shrink and fade toward both ends
 * for a sense of depth. One word or phrase per line.
 */
export const LoopSpiralText: React.FC<TextProps & {count: number; amplitude: number}> = (p) => {
  const t = useLoopP();
  const words = p.text.split('\n').filter(Boolean);
  const n = p.count;
  const H = 1000;
  const pos = (s: number) => ({
    x: Math.sin(s * Math.PI * 2 * 1.1) * p.amplitude,
    y: (s - 0.5) * H,
  });
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0}}>
        {Array.from({length: n}).map((_, k) => {
          const s = (((k / n - t) % 1) + 1) % 1;
          const a = pos(s);
          const b = pos(Math.min(1, s + 0.01));
          const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI - 90 + 90;
          const depth = Math.cos((s - 0.5) * Math.PI); // 1 center, 0 ends
          return (
            <div
              key={k}
              style={{
                position: 'absolute',
                left: 960 + a.x,
                top: 540 + a.y,
                transform: `translate(-50%, -50%) rotate(${angle * 0.35}deg) scale(${0.35 + depth * 0.75})`,
                opacity: Math.max(0, depth * 1.2 - 0.1),
                color: p.color,
                fontSize: p.fontSize,
                fontFamily: p.fontFamily,
                fontWeight: p.fontWeight,
                whiteSpace: 'pre',
              }}
            >
              {words[k % words.length]}
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/**
 * A big wheel of words rotating around an off-screen center. The word at the
 * 3 o'clock position is highlighted and a label with an arrow points at it.
 * One word per line. The wheel steps one word at a time: it pauses on a word, then
 * eases to the next. `holdRatio` (0..1) is the share of each step spent paused.
 * Total loop = words x frames-per-word, so set durationInFrames accordingly
 * (default: 12 words x 40 frames = 480 frames, ~1.3s per word at 30fps).
 */
export const LoopWheel: React.FC<
  TextProps & {label: string; accent: string; radius: number; holdRatio: number}
> = (p) => {
  const t = useLoopP();
  const words = p.text.split('\n').filter(Boolean);
  const n = words.length;
  const cx = 380;
  // Stepped, eased position measured in words (0..n).
  const x = t * n;
  const k = Math.floor(x);
  const f = Math.max(0, (x - k - p.holdRatio) / (1 - p.holdRatio)); // 0 while holding, then 0..1 while moving
  const eased = f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2;
  const pos = (k + eased) / n; // 0..1 around the wheel
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0}}>
        {words.map((w, i) => {
          const a = ((i / n - pos) % 1 + 1) % 1; // 0..1 around the wheel
          const deg = a > 0.5 ? (a - 1) * 360 : a * 360; // -180..180, 0 = selected (3 o'clock)
          const d = Math.abs(deg);
          const sel = d < 360 / n / 2;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: cx,
                top: 540,
                transformOrigin: '0 50%',
                transform: `rotate(${deg}deg) translateX(${p.radius}px) translateY(-50%)`,
                fontSize: p.fontSize,
                fontFamily: p.fontFamily,
                fontWeight: p.fontWeight,
                color: sel ? p.color : '#8a8a8a',
                opacity: Math.max(0, 1 - d / 75),
                whiteSpace: 'pre',
              }}
            >
              {w.toUpperCase()}
            </div>
          );
        })}
        <div
          style={{
            position: 'absolute',
            left: cx - 220,
            top: 540,
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: p.fontSize * 0.6,
            fontFamily: p.fontFamily,
            fontWeight: p.fontWeight,
            color: p.color,
          }}
        >
          {p.label.toUpperCase()}
          <div style={{width: p.radius - 120, height: 3, background: p.accent}} />
        </div>
      </div>
    </Stage>
  );
};

/** Tight vertical stack of bold words in a rotating palette, scrolling upward. One word per line. */
export const LoopColorStack: React.FC<TextProps & {palette: string[]; lineHeight: number}> = (p) => {
  const t = useLoopP();
  const words = p.text.split('\n').filter(Boolean);
  const total = words.length * p.lineHeight;
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0}}>
        {words.map((w, i) => {
          const y = ((((i * p.lineHeight - t * total) % total) + total) % total) - total / 2;
          const d = Math.abs(y) / p.lineHeight;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 540 + y - p.lineHeight / 2,
                height: p.lineHeight,
                lineHeight: `${p.lineHeight}px`,
                textAlign: 'center',
                fontSize: p.fontSize,
                fontFamily: p.fontFamily,
                fontWeight: p.fontWeight,
                color: p.palette[i % p.palette.length],
                opacity: Math.max(0, Math.min(1, (words.length / 2 - d) * 0.8)),
                whiteSpace: 'pre',
              }}
            >
              {w.toUpperCase()}
            </div>
          );
        })}
      </div>
    </Stage>
  );
};
