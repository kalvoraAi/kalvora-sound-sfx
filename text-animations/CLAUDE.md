# Project notes for Claude Code

This repo is a library of Remotion text animations rendered as transparent clips for video editing.

## Adding an animation
1. Create `src/animations/<Name>.tsx`, exporting a component that takes `TextProps` (from `src/types.tsx`) plus any extras, and wraps output in `<Stage background={p.background}>`.
2. Register it in `src/Root.tsx` with `<Composition id="<Name>" ... />` (1920x1080, 30fps).
3. Add the id to the `IDS` array in `scripts/render-all.sh`, and a row in the README table.
4. Drive all motion from `useCurrentFrame()` (spring/interpolate). Never use CSS transitions or animations.

## Rules
- Default `background` must stay `"transparent"`.
- Transparent renders need `--image-format=png` and either `--codec=vp8 --pixel-format=yuva420p` (WebM) or `--codec=prores --prores-profile=4444 --pixel-format=yuva444p10le` (MOV).
- Keep renders in `out/` (git-ignored).
- Use `npx tsc --noEmit` to type-check before committing.
