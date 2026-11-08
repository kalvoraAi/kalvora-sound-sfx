import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Montserrat';
import {Stage, TextProps} from '../types';

const {fontFamily: montserrat} = loadFont();

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
 * A big wheel of words (like month names) turning around an off-screen-left center.
 * Words are ~12 degrees apart, so only a handful are visible: the selected word sits at
 * 3 o'clock, a thin accent arrow points from a label ("DATE") to it, words above are bright
 * white and words below are dim gray. The wheel steps one word at a time: it holds, then
 * snaps to the next with a quick ease (months advance as the list moves down).
 * Default: ~30 frames (1s) per word at 30fps. (The reference clip measured ~20 frames per word.)
 * One word per line. Loop length = words x frames-per-word (default 12 words x 30 = 360 frames).
 * To change speed, change durationInFrames in Root.tsx (= words x frames-per-word).
 * `holdRatio` (0..1) is the share of each step spent paused.
 */
export const LoopWheel: React.FC<
  TextProps & {label: string; accent: string; radius: number; holdRatio: number; stepDeg: number; centerX: number}
> = (p) => {
  const t = useLoopP();
  const words = p.text.split('\n').filter(Boolean);
  const n = words.length;
  const x = t * n;
  const k = Math.floor(x);
  const f = Math.max(0, (x - k - p.holdRatio) / (1 - p.holdRatio));
  const frac = f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2; // 0 while holding, then smooth ease-in-out 0..1
  const startX = p.centerX + p.radius;
  const slots = Array.from({length: 13}, (_, i) => i - 7); // -7 (high above) .. +5 (below)
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0}}>
        {slots.map((slot) => {
          const w = words[(((k - slot) % n) + n) % n];
          const deg = (slot + frac) * p.stepDeg; // negative = above the selector
          const d = Math.abs(deg) / p.stepDeg;
          const above = deg <= p.stepDeg * 0.5;
          return (
            <div
              key={slot}
              style={{
                position: 'absolute',
                left: p.centerX,
                top: 540,
                transformOrigin: '0 50%',
                transform: `rotate(${deg}deg) translateX(${p.radius}px) translateY(-50%)`,
                fontSize: p.fontSize,
                fontFamily: p.fontFamily,
                fontWeight: p.fontWeight,
                letterSpacing: 1,
                color: above ? p.color : '#6f6f6f',
                opacity: Math.max(0, 1 - Math.max(0, d - 1.5) * 0.25) * (above ? 1 : Math.max(0, 1 - d * 0.28)),
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
            left: startX - 195 - 26,
            top: 540,
            transform: 'translate(-100%, -50%)',
            fontSize: p.fontSize * 0.72,
            fontFamily: p.fontFamily,
            fontWeight: p.fontWeight,
            letterSpacing: 1,
            color: p.color,
          }}
        >
          {p.label.toUpperCase()}
        </div>
        <svg
          width={173}
          height={28}
          viewBox="0 0 173 28"
          style={{position: 'absolute', left: startX - 195, top: 540 - 14}}
        >
          <line x1="0" y1="14" x2="160" y2="14" stroke={p.accent} strokeWidth={3} />
          <polygon points="173,14 156,5 156,23" fill={p.accent} />
        </svg>
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
