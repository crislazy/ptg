# please touch grass

[pleasetouchgrass.fyi](https://pleasetouchgrass.fyi)

you know what to do.


## running it

open `index.html` in a browser. that's it.

to serve it locally:

```sh
npx serve .
```

## deploying

any static host works (Cloudflare Pages, Netlify, Vercel, GitHub Pages).

- point the host at the repo root, with no build command and no output directory.
- most hosts serve `404.html` automatically for unknown URLs.
- the footer on the main page links to `/other.html`, so keep that filename.

## analytics

anonymous tracking by [umami](https://umami.is). no cookies, no personal data.

## the look

there is no stylesheet to import. each page repeats the same few values at the top of its `<style>` block, so a tweak means editing each file.

| token | light | dark |
| --- | --- | --- |
| `--field` (background) | `#6cbf40` | `#3f8a2a` |
| `--ink` (text) | `#17210f` | `#0d1409` |
| `--soil` (footer) | `#5a3b22` | `#3b2715` |
| `--soil-ink` (footer text) | `#f2e6d0` | `#e3d6bc` |

rules to keep it from turning into a template:

- one flat green. no gradients, no glass, no shadows, no cards.
- one font, all lowercase, deadpan.
- the grass is crude on purpose.
- one gag per page, nothing else on it.
- the footer is always "this is also the whole website."

## the grass

the grass is a `<canvas>` of blades drawn as simple curved shapes. each blade is a small spring: moving a pointer over it pushes it sideways and it wobbles back.


## credits

created by [cris](https://crislzy.xyz).
