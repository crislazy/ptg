# Please Touch Grass 🌱

> You've spent enough time on your computer. Go outside and touch some grass!

[![Live Site](https://img.shields.io/badge/live-pleasetouchgrass.fyi-green)](https://pleasetouchgrass.fyi)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Time Tracking](https://hackatime.hackclub.com/api/v1/badge/U09TNMQ9MCZ/crislazy/ptg)](https://hackatime.hackclub.com)

A tiny website that encourages you to go outside. Click the button, touch grass, get confetti.

### Features

- **Global counter** — tracks how many times people have touched grass (powered by Supabase)
- **Confetti celebration** — falling particles when you touch grass
- **Streak tracking** — counts consecutive days you've touched grass (localStorage)
- **Last touched timestamp** — shows how long ago you last touched grass
- **Cooldown** — 3-second rate limit to prevent spam clicking
- **Responsive** — works on mobile and desktop
- **Analytics** — privacy-focused tracking via Umami

### Tech Stack

- HTML, CSS, vanilla JavaScript (no frameworks, no build tools)
- [Supabase](https://supabase.com) — database and RPC for the global counter
- [Umami](https://umami.is) — privacy-focused analytics
- Google Fonts — Pixelify Sans, Geist Pixel, JetBrains Mono

### Getting Started

Clone the repo and open it with a local server (the Supabase API calls need HTTP, not `file://`):

```bash
git clone https://github.com/crislazy/ptg.git
cd ptg
```

Then either:
- **VS Code** — install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html` → "Open with Live Server"
- **Python** — `python -m http.server`
- **Node** — `npx serve`

### Project Structure

```
ptg/
├── index.html          Home page — button, counter, streak display
├── script.js           Home page logic — Supabase, cooldown, streak, timestamp
├── script1.js          Grass page logic — counter loader + confetti animation
├── style.css           Global styles — green theme, confetti, responsive
├── grass/index.html    Celebration page — "HURRAY!" + confetti + play again
├── about/index.html    Static about page
├── 404.html            Custom 404 page
├── README.md           This file
└── LICENSE             MIT license
```

### Reuse Notes

If you fork this project, replace these with your own:

1. **Supabase credentials** — `SUPABASE_URL` and `SUPABASE_KEY` in `script.js` and `script1.js`
2. **Supabase RPC function** — create a `touch_grass` function in your Supabase project that increments a `stats` table
3. **Umami tracking script** — the `<script>` tag with `data-website-id` in every HTML file

### Vibe-Coded

This project was partially built with [opencode](https://opencode.ai) — an AI coding assistant. Features like confetti, streak tracking, responsive styles, and the cooldown system were AI-generated.

### License

[MIT](LICENSE) — Made by [Cris](https://crislzy.xyz).