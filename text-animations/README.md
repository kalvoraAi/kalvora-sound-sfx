# Text Animations

Reusable text animations built with [Remotion](https://www.remotion.dev). Edit the text/colors, render a **transparent** clip, and drop it over your footage.

## Setup

```bash
npm install
npm run studio        # live preview + edit props in the sidebar
```

## Animations

| ID | What it does |
| --- | --- |
| `FadeUp` | Fades in while rising |
| `Typewriter` | Types out with a blinking cursor |
| `WordPop` | Words spring in one by one |
| `LetterBounce` | Letters drop in and bounce |
| `SlideReveal` | Lines slide up from a mask (`\n` = new line) |
| `Glitch` | RGB-split glitch |
| `HighlightSweep` | Colored bar sweeps behind text |
| `BlurIn` | Blur + scale + letter-spacing settle |
| `LowerThird` | Name / title bar, animates in and out |
| `LoopWave` | Seamless loop: letters ride a sine wave |
| `LoopMarquee` | Seamless loop: infinite scrolling ticker |
| `LoopPulse` | Seamless loop: heartbeat scale + glow |
| `LoopFloat` | Seamless loop: gentle float and tilt |
| `LoopRainbow` | Seamless loop: color cycles through the hue wheel |
| `LoopShine` | Seamless loop: shine sweeps across the text |
| `LoopSpin3D` | Seamless loop: continuous 3D spin |
| `LoopStagger` | Seamless loop: letters pulse in sequence |
| `LoopWordStack` | Seamless loop: tilted word list scrolls, center word highlighted (one word per line) |
| `LoopNameFade` | Seamless loop: scrolling name list fading toward the edges |
| `LoopSlot` | Seamless loop: slot-machine list, big center word |
| `LoopBlockStack` | Seamless loop: white label blocks growing as they scroll down |
| `LoopHighlightBar` | Seamless loop: words pass through a white highlight bar with an arrow |
| `LoopMirror` | Seamless loop: words scroll outward from a center axis, mirrored |
| `LoopSlice` | Seamless loop: word cut into strips that shift and snap back |
| `ScrambleDecode` | Random characters resolve into the text |
| `NeonFlicker` | Neon sign flickers on |
| `WipeReveal` | Bar wipes across to reveal the text |
| `ElasticStretch` | Rubber-band stretch with overshoot |
| `TrackingIn` | Cinematic letter-spacing tightens as it fades in |
| `SplitFlip` | Letters flip in like a split-flap board |
| `Counter` | Number counts up (`from`, `to`, `prefix`, `suffix`) |
| `Karaoke` | Caption words light up one at a time |
| `Extrude3D` | Chunky 3D extruded title pops in |
| `LoopPillCarousel` | Seamless loop: vertical pill labels, center ones filled and glowing (one label per line) |
| `LoopTiltedStrips` | Seamless loop: tilted marquee rows in boxes, alternating direction (one row per line) |
| `LoopPillMarquee` | Seamless loop: rows of outlined pill chips scrolling sideways (chips split by `\|`, start with `*` to fill) |
| `LoopSpiralText` | Seamless loop: words ride a scrolling S-shaped ribbon |

The `Loop*` clips are 90 frames and repeat with no visible jump, so you can stretch or repeat them on your timeline.

## Render

```bash
# One animation, custom text, transparent WebM
npx remotion render FadeUp out/hello.webm --codec=vp8 --pixel-format=yuva420p --image-format=png \
  --props='{"text":"Hello world","color":"#ffcc00"}'

# One animation, ProRes 4444 with alpha (Premiere / DaVinci / FCP)
npx remotion render Glitch out/glitch.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png

# Everything
npm run render:all            # WebM
npm run render:all:prores     # MOV ProRes 4444
```

Props common to the text animations: `text`, `color`, `fontSize`, `fontFamily`, `fontWeight`, `background` (`transparent` by default).

## Add a new animation

See `CLAUDE.md`.
