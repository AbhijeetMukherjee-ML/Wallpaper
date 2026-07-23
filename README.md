# Premium Celestial Live Wallpaper Dashboard

A glassmorphic, browser-based live wallpaper dashboard that changes its background across a full 24-hour day/night cycle, layered with an interactive productivity UI — Pomodoro timer, notes, tasks, ambient particle effects, and procedurally synthesized soundscapes.

**Live demo:** https://abhijeetmukherjee-ml.github.io/Wallpaper/

<!-- Add a screenshot or short GIF here, e.g.: -->
<!-- ![Dashboard preview](./preview.png) -->

## Features

**Day/Night Celestial Cycle**
- 24 unique wallpapers mapped to each hour of the day, crossfaded smoothly between two buffered background layers
- Syncs to system time automatically, or explore any hour manually with the built-in Time Machine slider
- Ken Burns pan/zoom animation on the active wallpaper (zoom in, zoom out, pan left/right, or random)

**Ambient Overlay**
- Canvas-based particle system with four effects: floating stars, light orbs, rain, and snow
- Adjustable particle density and motion speed

**Procedural Soundscapes**
- Rain and ocean-wave ambience generated in real time with the Web Audio API — no audio files, fully synthesized
- Independent volume control

**Productivity Widgets**
- Pomodoro focus timer with start/pause/reset and a synthesized completion chime
- Quick Scribble notepad
- Task list (add/complete/persist)
- Analog or digital clock
- Google search bar

**Personalization**
- Light/dark interface mode with adjustable accent color
- Per-widget visibility toggles (notes, tasks, Pomodoro, search)
- Manual wallpaper navigation with slideshow auto-rotate and adjustable interval
- All settings, notes, and tasks persist locally via `localStorage`

## Tech Stack

- Vanilla JavaScript (no frameworks or build step)
- HTML5 Canvas for particle rendering
- Web Audio API for procedural sound synthesis
- CSS custom properties for theming / glassmorphism
- `localStorage` for state persistence

## Running Locally

This is a static site with no build step or dependencies.

```bash
git clone https://github.com/AbhijeetMukherjee-ML/Wallpaper.git
cd Wallpaper
```

Then just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

and visit `http://localhost:8000`.

## Project Structure

```
Wallpaper/
├── index.html      # Dashboard markup and settings panel
├── app.js          # Wallpaper cycling, particles, audio, widgets, state
├── style.css        # Glassmorphic UI styling
└── repo/            # Wallpaper image assets
```

## License

No license specified yet — all rights reserved by default until one is added.
