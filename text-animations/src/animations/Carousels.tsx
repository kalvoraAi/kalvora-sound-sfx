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
          const y = ((((i * p.spacing - t * total) % total) + total) % total) - total / 2;
          const d = Math.abs(y) / p.spacing;
          const filled = d <= p.filledRows / 2 + 0.2;
          const edge = Math.max(0, Math.min(1, (items.length / 2 - d) * 0.9));
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
                  border: `3px solid ${filled ? p.accent : p.color}`,
                  background: filled ? p.accent : 'rgba(0,0,0,0.35)',
                  boxShadow: filled ? `0 0 ${p.fontSize}px ${p.accent}` : 'none',
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

type RowStyle = {bg: string; color: string; border: string; rotate: number; dir: 1 | -1};

/**
 * Horizontal marquee rows inside boxes. Each line of `text` is one row; rows
 * cycle through three box styles (solid accent, dark with accent outline,
 * outlined + tilted) and alternate scroll direction.
 */
export const LoopTiltedStrips: React.FC<TextProps & {accent: string; rowHeight: number}> = (p) => {
  const t = useLoopP();
  const rows = p.text.split('\n').filter(Boolean);
  const copies = 6;
  const styles: RowStyle[] = [
    {bg: p.accent, color: '#fff', border: p.accent, rotate: 0, dir: 1},
    {bg: '#000', color: '#fff', border: p.accent, rotate: -2, dir: -1},
    {bg: '#000', color: '#fff', border: p.accent, rotate: -6, dir: 1},
  ];
  const gap = p.rowHeight * 1.25;
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
        {rows.map((row, r) => {
          const st = styles[r % styles.length];
          const shift = st.dir === 1 ? -(t * 100) / copies : -100 / copies + (t * 100) / copies;
          return (
            <div
              key={r}
              style={{
                position: 'absolute',
                left: -200,
                right: -200,
                top: 540 + (r - (rows.length - 1) / 2) * gap - p.rowHeight / 2,
                height: p.rowHeight,
                transform: `rotate(${st.rotate}deg)`,
              }}
            >
              <div style={{display: 'flex', width: 'max-content', height: '100%', transform: `translateX(${shift}%)`}}>
                {Array.from({length: copies}).map((_, k) => (
                  <div
                    key={k}
                    style={{
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      padding: `0 ${p.rowHeight * 0.4}px`,
                      marginRight: p.rowHeight * 0.4,
                      height: '100%',
                      background: st.bg,
                      color: st.color,
                      border: `4px solid ${st.border}`,
                      fontSize: p.fontSize,
                      fontFamily: p.fontFamily,
                      fontWeight: p.fontWeight,
                      whiteSpace: 'pre',
                    }}
                  >
                    {row.toUpperCase()}
                  </div>
                ))}
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
 * One word per line. Use durationInFrames (e.g. 180) to set speed.
 */
export const LoopWheel: React.FC<TextProps & {label: string; accent: string; radius: number}> = (p) => {
  const t = useLoopP();
  const words = p.text.split('\n').filter(Boolean);
  const n = words.length;
  const cx = 380;
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0}}>
        {words.map((w, i) => {
          const a = ((i / n - t) % 1 + 1) % 1; // 0..1 around the wheel
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
