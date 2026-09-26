# Haam.food

Marketing website for **Haam.food** — a small family brand that turns farm-grown
mangoes into pickles, dehydrated snacks, puree, fruit leather and gifting mangoes.

Plain HTML/CSS/JS, no build step, deployed with GitHub Pages.

## Structure

```
index.html          Page markup and copy
css/style.css        All styling
js/main.js           Mobile nav + scroll reveal
images/              Logo and hand-drawn SVG illustrations
```

## Editing content

All copy lives directly in [`index.html`](index.html) — product descriptions,
the story section, and the contact email are plain text, easy to edit without
touching CSS or JS.

Placeholders to update before launch:
- Contact email in the "Get in Touch" section (`hello@haam.food`)
- Add real product photos in `images/` and swap them in for the SVG icons if desired
- Social links in the footer, once accounts exist

## Running locally

Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

This site deploys automatically to GitHub Pages via the workflow in
`.github/workflows/deploy.yml` on every push to `main`.
