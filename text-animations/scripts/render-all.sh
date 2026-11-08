#!/usr/bin/env bash
# Renders every animation to a transparent clip in ./out
# Default: WebM (VP8 + alpha). FORMAT=prores -> MOV ProRes 4444 (best for Premiere/DaVinci/FCP).
set -euo pipefail

IDS=(FadeUp Typewriter WordPop LetterBounce SlideReveal Glitch HighlightSweep BlurIn LowerThird LoopWave LoopMarquee LoopPulse LoopFloat LoopRainbow LoopShine LoopSpin3D LoopStagger LoopWordStack LoopNameFade LoopSlot LoopBlockStack LoopHighlightBar LoopMirror LoopSlice ScrambleDecode NeonFlicker WipeReveal ElasticStretch TrackingIn SplitFlip Counter Karaoke Extrude3D LoopPillCarousel LoopTiltedStrips LoopPillMarquee LoopSpiralText LoopWheel LoopColorStack)
FORMAT="${FORMAT:-webm}"
mkdir -p out

for id in "${IDS[@]}"; do
  if [ "$FORMAT" = "prores" ]; then
    npx remotion render "$id" "out/$id.mov" --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png
  else
    npx remotion render "$id" "out/$id.webm" --codec=vp8 --pixel-format=yuva420p --image-format=png
  fi
done
