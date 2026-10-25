# Saad Mirza — Portfolio

A Vite + React + TypeScript portfolio scaffold built around the supplied résumé. The portrait-video/frame pipeline is intentionally left optional because no source video was supplied. Until frames are added, the site uses a lightweight CSS portrait placeholder and still works end-to-end.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run build
npm run preview
```

## Add a source video later

1. Place your source clip at `video.mp4` in the project root.
2. Extract source frames with `ffmpeg -i video.mp4 -start_number 0 full/f%03d.png`.
3. Run your segmentation/masking workflow to generate transparent WebP frames in `public/frames/lg/` and half-size frames in `public/frames/sm/`.
4. Update `public/frames/manifest.json` with `w`, `h`, `count`, and `shots` (`from`, `to`, `box`, `cx`).

`src/engine/frames.ts` already loads the manifest, selects the mobile/desktop frame directory, decodes frames, and tolerates missing frame assets. Keep the manifest count at `0` until actual transparent frames are present.

## Project structure

- `src/data.ts` — all portfolio content
- `src/engine/director.ts` — Lenis + GSAP ticker scroll director
- `src/engine/frames.ts` — optional frame loader
- `src/engine/hooks.ts` — director subscription hook
- `src/components/` — Stage, Chrome, Odometer, TiltCard
- `src/scenes/` — Hero, About, Work, Journey, Skills, Awards, Contact
- `src/styles.css` — visual system and responsive styling
- `public/resume.pdf` — supplied résumé image converted to a PDF
