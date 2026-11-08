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

import {
  Counter,
  ElasticStretch,
  Extrude3D,
  Karaoke,
  NeonFlicker,
  ScrambleDecode,
  SplitFlip,
  TrackingIn,
  WipeReveal,
} from './animations/More';

import {
  LoopColorStack,
  LoopPillCarousel,
  LoopPillMarquee,
  LoopSpiralText,
  LoopTiltedStrips,
  LoopWheel,
} from './animations/Carousels';

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
    <Composition id="ScrambleDecode" component={ScrambleDecode} durationInFrames={90} {...common} defaultProps={{...defaultTextProps, text: 'DECODING', framesPerChar: 5}} />
    <Composition id="NeonFlicker" component={NeonFlicker} durationInFrames={90} {...common} defaultProps={{...defaultTextProps, text: 'OPEN 24/7', glowColor: '#ff2bd6'}} />
    <Composition id="WipeReveal" component={WipeReveal} durationInFrames={75} {...common} defaultProps={{...defaultTextProps, barColor: '#ff3d71'}} />
    <Composition id="ElasticStretch" component={ElasticStretch} durationInFrames={75} {...common} defaultProps={{...defaultTextProps, text: 'BOING'}} />
    <Composition id="TrackingIn" component={TrackingIn} durationInFrames={90} {...common} defaultProps={{...defaultTextProps, text: 'THE FILM TITLE', fontWeight: 300, fontSize: 120}} />
    <Composition id="SplitFlip" component={SplitFlip} durationInFrames={90} {...common} defaultProps={{...defaultTextProps, text: 'FLIP BOARD', delayPerLetter: 3}} />
    <Composition id="Counter" component={Counter} durationInFrames={90} {...common} defaultProps={{...defaultTextProps, fontSize: 260, from: 0, to: 1250000, prefix: '', suffix: '+', countFrames: 60}} />
    <Composition id="Karaoke" component={Karaoke} durationInFrames={110} {...common} defaultProps={{...defaultTextProps, fontSize: 120, text: 'Highlight every word as it is spoken', highlightColor: '#ff3d71', dimColor: '#6b6b6b', wordFrames: 12}} />
    <Composition id="Extrude3D" component={Extrude3D} durationInFrames={75} {...common} defaultProps={{...defaultTextProps, text: 'BIG 3D', fontSize: 240, color: '#ffd23f', extrudeColor: '#b8641a'}} />
    <Composition
      id="LoopPillCarousel"
      component={LoopPillCarousel}
      durationInFrames={300}
      {...common}
      defaultProps={{
        ...defaultTextProps,
        fontSize: 56,
        fontWeight: 500,
        accent: '#ff3b14',
        spacing: 117,
        filledRows: 3,
        text: 'Sea Foam\nFirefall Waterfalls\nAurora Borealis\nSand Waves\nIce Flowers\nDust Whirlwinds\nBlue Glaciers\nRainbow Mountains\nBlooming Desert\nWater Rings',
      }}
    />
    <Composition
      id="LoopTiltedStrips"
      component={LoopTiltedStrips}
      durationInFrames={LOOP_FRAMES}
      {...common}
      defaultProps={{...defaultTextProps, fontSize: 96, accent: '#ff3b14', spacing: 190, text: 'Text carousel\nAnimated text\nText list\nLooped text\nKinetic type\nMarquee'}}
    />
    <Composition
      id="LoopPillMarquee"
      component={LoopPillMarquee}
      durationInFrames={LOOP_FRAMES}
      {...common}
      defaultProps={{
        ...defaultTextProps,
        fontSize: 52,
        fontWeight: 500,
        accent: '#f5c518',
        rowGap: 150,
        text: 'Clean style|Smooth|Text carousel|*Auto|Flexible customization\nObservable|*Auto|Clean style|Smooth|Text carousel\nSmooth|Text carousel|Flexible customization|Clean style|*Auto',
      }}
    />
    <Composition
      id="LoopSpiralText"
      component={LoopSpiralText}
      durationInFrames={LOOP_FRAMES}
      {...common}
      defaultProps={{
        ...defaultTextProps,
        fontSize: 54,
        fontWeight: 500,
        count: 14,
        amplitude: 320,
        text: 'Parallax effect\nFinal render\nScene transition\nText carousel\nAlpha matte\nKeyframe animation',
      }}
    />
    <Composition
      id="LoopWheel"
      component={LoopWheel}
      durationInFrames={480}
      {...common}
      defaultProps={{
        ...defaultTextProps,
        fontSize: 58,
        fontWeight: 800,
        fontFamily: 'Montserrat, Inter, Helvetica, Arial, sans-serif',
        label: 'Date',
        accent: '#2f6bff',
        radius: 940,
        centerX: 120,
        stepDeg: 12,
        holdRatio: 0.7,
        text: 'January\nFebruary\nMarch\nApril\nMay\nJune\nJuly\nAugust\nSeptember\nOctober\nNovember\nDecember',
      }}
    />
    <Composition
      id="LoopColorStack"
      component={LoopColorStack}
      durationInFrames={LOOP_FRAMES}
      {...common}
      defaultProps={{
        ...defaultTextProps,
        fontSize: 120,
        fontWeight: 800,
        lineHeight: 120,
        palette: ['#ffd23f', '#ff8a1f', '#ff3b14', '#9be15d', '#ffffff'],
        text: 'Animated text\nLooped text\nText list\nKinetic type\nMarquee\nText carousel\nSmooth motion\nClean style',
      }}
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
