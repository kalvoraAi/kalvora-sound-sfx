import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {Stage, TextProps} from '../types';

/**
 * Seamless loops: every motion is periodic over the composition length
 * (LOOP_FRAMES), so frame 0 === the frame after the last one.
 */
export const LOOP_FRAMES = 90;

const useLoop = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const p = (frame % durationInFrames) / durationInFrames; // 0..1
  return {p, tau: p * Math.PI * 2};
};

const textStyle = (p: TextProps): React.CSSProperties => ({
  color: p.color,
  fontSize: p.fontSize,
  fontFamily: p.fontFamily,
  fontWeight: p.fontWeight,
  whiteSpace: 'pre',
});

/** Letters ride a sine wave. */
export const LoopWave: React.FC<TextProps> = (p) => {
  const {tau} = useLoop();
  return (
    <Stage background={p.background}>
      <div style={textStyle(p)}>
        {p.text.split('').map((c, i) => (
          <span key={i} style={{display: 'inline-block', transform: `translateY(${Math.sin(tau - i * 0.5) * 30}px)`}}>
            {c}
          </span>
        ))}
      </div>
    </Stage>
  );
};

/** Infinite horizontal ticker. */
export const LoopMarquee: React.FC<TextProps> = (p) => {
  const {p: t} = useLoop();
  const copies = 6;
  return (
    <Stage background={p.background}>
      <div style={{width: '100%', overflow: 'hidden'}}>
        <div style={{display: 'flex', width: 'max-content', transform: `translateX(${-(t * 100) / copies}%)`}}>
          {Array.from({length: copies}).map((_, i) => (
            <div key={i} style={{...textStyle(p), flexShrink: 0, paddingRight: p.fontSize}}>
              {p.text}
              {'  •  '}
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
};

/** Heartbeat scale with a soft glow. */
export const LoopPulse: React.FC<TextProps> = (p) => {
  const {tau} = useLoop();
  const k = (Math.sin(tau) + 1) / 2;
  return (
    <Stage background={p.background}>
      <div
        style={{
          ...textStyle(p),
          transform: `scale(${1 + k * 0.1})`,
          textShadow: `0 0 ${20 + k * 50}px ${p.color}`,
        }}
      >
        {p.text}
      </div>
    </Stage>
  );
};

/** Gentle float and tilt. */
export const LoopFloat: React.FC<TextProps> = (p) => {
  const {tau} = useLoop();
  return (
    <Stage background={p.background}>
      <div style={{...textStyle(p), transform: `translateY(${Math.sin(tau) * 28}px) rotate(${Math.sin(tau + 1) * 3}deg)`}}>
        {p.text}
      </div>
    </Stage>
  );
};

/** Color cycles through the full hue wheel. */
export const LoopRainbow: React.FC<TextProps> = (p) => {
  const {p: t} = useLoop();
  return (
    <Stage background={p.background}>
      <div style={textStyle(p)}>
        {p.text.split('').map((c, i) => (
          <span key={i} style={{color: `hsl(${(t * 360 + i * 25) % 360} 90% 60%)`}}>
            {c}
          </span>
        ))}
      </div>
    </Stage>
  );
};

/** Bright shine sweeps across the text. */
export const LoopShine: React.FC<TextProps> = (p) => {
  const {p: t} = useLoop();
  const pos = 150 - t * 200; // starts and ends off-screen, so it loops cleanly
  return (
    <Stage background={p.background}>
      <div
        style={{
          ...textStyle(p),
          color: 'transparent',
          backgroundImage: `linear-gradient(110deg, ${p.color} 40%, #ffffff 50%, ${p.color} 60%)`,
          backgroundSize: '250% 100%',
          backgroundPosition: `${pos}% 0`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextStroke: `2px ${p.color}`,
          opacity: 1,
        }}
      >
        {p.text}
      </div>
    </Stage>
  );
};

/** Continuous 3D spin around the Y axis. */
export const LoopSpin3D: React.FC<TextProps> = (p) => {
  const {p: t} = useLoop();
  return (
    <Stage background={p.background}>
      <div style={{perspective: 1200}}>
        <div style={{...textStyle(p), transform: `rotateY(${t * 360}deg)`}}>{p.text}</div>
      </div>
    </Stage>
  );
};

/** Letters pulse one after another in a repeating wave of scale. */
export const LoopStagger: React.FC<TextProps> = (p) => {
  const {tau} = useLoop();
  return (
    <Stage background={p.background}>
      <div style={textStyle(p)}>
        {p.text.split('').map((c, i) => {
          const k = Math.max(0, Math.sin(tau - i * 0.45));
          return (
            <span key={i} style={{display: 'inline-block', transform: `scale(${1 + k * 0.45})`, opacity: 0.55 + k * 0.45}}>
              {c}
            </span>
          );
        })}
      </div>
    </Stage>
  );
};

/**
 * Tilted vertical word stack scrolling upward on a seamless loop.
 * The word nearest the center is highlighted, the rest are dimmed and shrunk.
 * Put one word per line in `text`.
 */
export const LoopWordStack: React.FC<TextProps & {dimColor: string; spacing: number}> = (p) => {
  const {p: t} = useLoop();
  const words = p.text.split('\n').filter(Boolean);
  const n = words.length;
  const total = n * p.spacing;
  const offset = t * total;
  return (
    <Stage background={p.background}>
      <div style={{perspective: 1400}}>
        <div style={{position: 'relative', width: 1100, height: 1000, transform: 'rotateY(-22deg) rotateZ(-9deg)'}}>
          {words.map((w, i) => {
            let y = (((i * p.spacing - offset) % total) + total) % total; // 0..total
            y -= total / 2; // centered around 0
            const d = Math.abs(y) / p.spacing; // distance from center in "rows"
            const focus = Math.max(0, 1 - d); // 1 at center, 0 one row away
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 500 + y - p.fontSize / 2,
                  fontSize: p.fontSize,
                  fontFamily: p.fontFamily,
                  fontWeight: p.fontWeight,
                  color: focus > 0.5 ? p.color : p.dimColor,
                  opacity: Math.max(0, 1 - d * 0.22) * Math.min(1, (n / 2 - d) * 1.5),
                  transform: `scale(${1 - Math.min(d, 4) * 0.06 + focus * 0.06})`,
                  transformOrigin: 'left center',
                  whiteSpace: 'pre',
                }}
              >
                {w}
              </div>
            );
          })}
        </div>
      </div>
    </Stage>
  );
};

/* ---------- Scrolling list loops (one item per line in `text`) ---------- */

type ListProps = TextProps & {dimColor: string; spacing: number};

/** Calls render(word, y, d, i) for each item; y = px from center, d = rows from center. Seamless. */
const useScrollList = (p: ListProps) => {
  const {p: t} = useLoop();
  const words = p.text.split('\n').filter(Boolean);
  const total = words.length * p.spacing;
  return words.map((word, i) => {
    const y = ((((i * p.spacing - t * total) % total) + total) % total) - total / 2;
    return {word, i, y, d: Math.abs(y) / p.spacing};
  });
};

const rowBase = (p: ListProps, y: number): React.CSSProperties => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 540 + y - p.fontSize / 2,
  height: p.fontSize,
  lineHeight: `${p.fontSize}px`,
  fontSize: p.fontSize,
  fontFamily: p.fontFamily,
  fontWeight: p.fontWeight,
  whiteSpace: 'pre',
});

const listText = (s: string) => s.toUpperCase();

/** Flat bold list that fades from bright white at the center to dark at the edges. */
export const LoopNameFade: React.FC<ListProps> = (p) => {
  const items = useScrollList(p);
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0}}>
        {items.map(({word, i, y, d}) => (
          <div
            key={i}
            style={{
              ...rowBase(p, y),
              textAlign: 'center',
              color: p.color,
              opacity: Math.max(0, 1 - d * 0.2),
            }}
          >
            {listText(word)}
          </div>
        ))}
      </div>
    </Stage>
  );
};

/** Slot-machine style: big centered word, smaller dim neighbors. */
export const LoopSlot: React.FC<ListProps> = (p) => {
  const items = useScrollList(p);
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0}}>
        {items.map(({word, i, y, d}) => {
          const focus = Math.max(0, 1 - d);
          return (
            <div
              key={i}
              style={{
                ...rowBase(p, y),
                textAlign: 'center',
                color: focus > 0.5 ? p.color : p.dimColor,
                opacity: Math.max(0, 1 - d * 0.25),
                transform: `scale(${0.55 + focus * 0.45})`,
              }}
            >
              {listText(word)}
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/** White label blocks that grow in size as they scroll toward the bottom. */
export const LoopBlockStack: React.FC<ListProps & {blockColor: string}> = (p) => {
  const items = useScrollList(p);
  const total = items.length * p.spacing;
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0}}>
        {items.map(({word, i, y}) => {
          const k = (y + total / 2) / total; // 0 top .. 1 bottom
          const scale = 0.5 + k * 0.7;
          const edge = Math.min(1, k * 6, (1 - k) * 6);
          return (
            <div key={i} style={{...rowBase(p, y), left: 360, right: 'auto', opacity: edge, transform: `scale(${scale})`, transformOrigin: 'left center'}}>
              <span style={{background: p.blockColor, color: p.color, padding: '0 28px', display: 'inline-block'}}>{listText(word)}</span>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/** A fixed white bar at the top; each word passes through it (black on white) with an arrow. */
export const LoopHighlightBar: React.FC<ListProps> = (p) => {
  const items = useScrollList(p);
  const barTop = 540 - p.spacing * 2.5;
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: barTop - p.spacing / 2, height: p.spacing, background: p.color}} />
        {items.map(({word, i, y}) => {
          const rowY = y + p.spacing * 0.0 - p.spacing * 2.5; // shift list so row 0 sits in the bar
          const inBar = Math.abs(rowY) < p.spacing / 2;
          const d = Math.max(0, rowY / p.spacing);
          return (
            <div
              key={i}
              style={{
                ...rowBase(p, rowY),
                textAlign: 'center',
                color: inBar ? '#000' : p.color,
                opacity: rowY < -p.spacing / 2 ? 0 : Math.max(0.15, 1 - d * 0.16),
              }}
            >
              {inBar ? '↗  ' : ''}
              {listText(word)}
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/**
 * Words are cut into horizontal strips. Strips fly apart at each word change,
 * then snap together. One word per line in `text`; the loop cycles through all of them.
 */
export const LoopSlice: React.FC<TextProps & {slices: number}> = (p) => {
  const {p: t} = useLoop();
  const words = p.text.split('\n').filter(Boolean);
  const x = t * words.length;
  const idx = Math.floor(x) % words.length;
  const local = x - Math.floor(x); // 0..1 within the current word
  const env = Math.pow(Math.abs(Math.cos(Math.PI * local)), 8); // 1 at word boundaries, 0 in between
  const h = 100 / p.slices;
  const word = words[idx];
  return (
    <Stage background={p.background}>
      <div style={{position: 'relative', ...textStyle(p), lineHeight: 1.1}}>
        <div style={{visibility: 'hidden'}}>{word}</div>
        {Array.from({length: p.slices}).map((_, k) => (
          <div
            key={k}
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `inset(${k * h + 0.6}% 0 ${100 - (k + 1) * h + 0.6}% 0)`,
              transform: `translateX(${(k % 2 ? 1 : -1) * (0.6 + (k % 3) * 0.2) * 900 * env}px)`,
              opacity: 1 - env * 0.5,
            }}
          >
            {word}
          </div>
        ))}
      </div>
    </Stage>
  );
};

/** Words emerge from a center axis and scroll outward, mirrored top and bottom. */
export const LoopMirror: React.FC<ListProps> = (p) => {
  const {p: t} = useLoop();
  const words = p.text.split('\n').filter(Boolean);
  const total = words.length * p.spacing;
  return (
    <Stage background={p.background}>
      <div style={{position: 'absolute', inset: 0}}>
        {words.map((w, i) => {
          const y = (((i * p.spacing + t * total) % total) + total) % total; // 0 = axis
          const fadeIn = Math.min(1, y / (p.spacing * 0.6));
          const fadeOut = Math.max(0, 1 - y / (total * 0.95));
          const shade = Math.max(0.25, 1 - y / total);
          const style = (flip: boolean): React.CSSProperties => ({
            ...rowBase(p, flip ? -(y + p.spacing / 2) : y + p.spacing / 2),
            textAlign: 'center',
            color: p.color,
            filter: `brightness(${shade})`,
            opacity: Math.min(fadeIn, fadeOut),
            transform: flip ? 'scaleY(-1)' : undefined,
          });
          return (
            <React.Fragment key={i}>
              <div style={style(false)}>{listText(w)}</div>
              <div style={style(true)}>{listText(w)}</div>
            </React.Fragment>
          );
        })}
      </div>
    </Stage>
  );
};
