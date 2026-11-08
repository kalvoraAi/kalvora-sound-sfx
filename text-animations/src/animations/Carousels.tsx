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
