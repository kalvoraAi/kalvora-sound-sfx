import React from 'react';
import {Composition} from 'remotion';
import {defaultTextProps} from './types';
import {FadeUp} from './animations/FadeUp';
import {Typewriter} from './animations/Typewriter';
import {WordPop} from './animations/WordPop';
import {LetterBounce} from './animations/LetterBounce';
import {SlideReveal} from './animations/SlideReveal';
import {Glitch} from './animations/Glitch';
import {HighlightSweep} from './animations/HighlightSweep';
import {BlurIn} from './animations/BlurIn';
import {LowerThird} from './animations/LowerThird';
import {
  LOOP_FRAMES,
  LoopFloat,
  LoopMarquee,
  LoopPulse,
  LoopRainbow,
  LoopShine,
  LoopSpin3D,
  LoopStagger,
  LoopWave,
  LoopWordStack,
  LoopNameFade,
  LoopSlot,
  LoopBlockStack,
  LoopHighlightBar,
  LoopSlice,
  LoopMirror,
} from './animations/Loops';

const common = {width: 1920, height: 1080, fps: 30};

const loops = [
  {id: 'LoopWave', component: LoopWave, text: 'WAVE MOTION'},
  {id: 'LoopMarquee', component: LoopMarquee, text: 'KEEP SCROLLING'},
  {id: 'LoopPulse', component: LoopPulse, text: 'PULSE'},
  {id: 'LoopFloat', component: LoopFloat, text: 'Floating'},
  {id: 'LoopRainbow', component: LoopRainbow, text: 'RAINBOW'},
  {id: 'LoopShine', component: LoopShine, text: 'SHINE'},
  {id: 'LoopSpin3D', component: LoopSpin3D, text: 'SPIN'},
  {id: 'LoopStagger', component: LoopStagger, text: 'STAGGER'},
] as const;

const listDefaults = {
  ...defaultTextProps,
  fontSize: 110,
  dimColor: '#7a7a7a',
  spacing: 130,
};
const lists = [
  {id: 'LoopNameFade', component: LoopNameFade, text: 'Luca Rossi\nAnna Becker\nSofi Lopez\nHugo Silva\nMia Jensen\nTariq Khan\nLeo Dubois\nNina Chen'},
  {id: 'LoopSlot', component: LoopSlot, text: 'Kazakhstan\nUzbekistan\nEl Salvador\nMauritania\nMontenegro\nPortugal'},
  {id: 'LoopBlockStack', component: LoopBlockStack, text: 'Persistence\nAccountability\nAdaptability\nConsistency\nDetermination'},
  {id: 'LoopMirror', component: LoopMirror, text: 'Active\nBright\nTrend\nSpirit\nEnergy'},
  {id: 'LoopHighlightBar', component: LoopHighlightBar, text: 'Copywriter\nArt director\nReporter\nBartender\nHairdresser\nPhotographer\nEditor\nDesigner'},
] as const;

// IMPORTANT: keep scripts/render-all.sh IDs in sync with the ids below.
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="LoopWordStack"
      component={LoopWordStack}
      durationInFrames={LOOP_FRAMES}
      {...common}
      defaultProps={{
        ...defaultTextProps,
        fontSize: 120,
        text: 'Discipline\nPerseverance\nDetermination\nConsistency\nAdaptability\nAccountability\nPersistence',
        dimColor: '#8a8a8a',
        spacing: 140,
      }}
    />
    <Composition
      id="LoopSlice"
      component={LoopSlice}
      durationInFrames={LOOP_FRAMES}
      {...common}
      defaultProps={{...defaultTextProps, text: 'ENERGY\nTREND\nBRIGHT\nACTIVE', fontSize: 380, slices: 6}}
    />
    {lists.map((l) => (
      <Composition
        key={l.id}
        id={l.id}
        component={l.component as React.FC<any>}
        durationInFrames={LOOP_FRAMES}
        {...common}
        defaultProps={{...listDefaults, blockColor: '#1f4dff', text: l.text}}
      />
    ))}
    {loops.map((l) => (
      <Composition
        key={l.id}
        id={l.id}
        component={l.component}
        durationInFrames={LOOP_FRAMES}
        {...common}
        defaultProps={{...defaultTextProps, text: l.text}}
      />
    ))}
    <Composition id="FadeUp" component={FadeUp} durationInFrames={90} {...common} defaultProps={defaultTextProps} />
    <Composition
      id="Typewriter"
      component={Typewriter}
      durationInFrames={120}
      {...common}
      defaultProps={{...defaultTextProps, text: 'Typing this out...', framesPerChar: 3}}
    />
    <Composition
      id="WordPop"
      component={WordPop}
      durationInFrames={90}
      {...common}
      defaultProps={{...defaultTextProps, text: 'Pop each word in', delayPerWord: 6}}
    />
    <Composition
      id="LetterBounce"
      component={LetterBounce}
      durationInFrames={90}
      {...common}
      defaultProps={{...defaultTextProps, text: 'BOUNCE', delayPerLetter: 3}}
    />
    <Composition
      id="SlideReveal"
      component={SlideReveal}
      durationInFrames={75}
      {...common}
      defaultProps={{...defaultTextProps, text: 'Line one\nLine two'}}
    />
    <Composition id="Glitch" component={Glitch} durationInFrames={90} {...common} defaultProps={{...defaultTextProps, text: 'GLITCH'}} />
    <Composition
      id="HighlightSweep"
      component={HighlightSweep}
      durationInFrames={75}
      {...common}
      defaultProps={{...defaultTextProps, fontSize: 110, highlightColor: '#ff3d71'}}
    />
    <Composition id="BlurIn" component={BlurIn} durationInFrames={75} {...common} defaultProps={defaultTextProps} />
    <Composition
      id="LowerThird"
      component={LowerThird}
      durationInFrames={120}
      {...common}
      defaultProps={{
        name: 'Rahul Sain',
        title: 'Video Editor',
        accent: '#ff3d71',
        textColor: '#ffffff',
        fontFamily: 'Inter, Helvetica, Arial, sans-serif',
        background: 'transparent',
      }}
    />
  </>
);
