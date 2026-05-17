# RouteUp 🗺️

A single-file, accessible HTML app for planning and sharing routes.
Built with [Tailwind CSS](https://tailwindcss.com) (CDN browser runtime).

## Getting started

Just open `index.html` in any browser — no build step needed.

```bash
open index.html
# or: python3 -m http.server 8080
```

## Files

| File | Description |
|------|-------------|
| `index.html` | Main accessible HTML page (loads Tailwind from CDN) |
| `tailwind.js` | Self-hosted Tailwind CDN runtime (offline fallback) |

### Using the self-hosted bundle

Swap the `<script>` in `index.html`:

```html
<!-- CDN (default) -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Self-hosted (offline) -->
<script src="tailwind.js"></script>
```

## Accessibility

`index.html` follows WCAG 2.1 AA guidelines:

- **Skip navigation** link for keyboard / screen-reader users
- **Semantic landmarks** — `<header>`, `<main>`, `<nav>`, `<footer>` with ARIA roles
- **Labelled sections** via `aria-labelledby` + `id` pairs
- **Correct heading hierarchy** — `h1` → `h2` → `h3`, no skipped levels
- **`role="list"`** on every `<ul>` used as a navigation or content list
- **`aria-hidden="true"`** on all decorative SVGs and emoji
- **Descriptive labels** (`role="img"` + `aria-label`) on decorative elements
- **Visible focus styles** — 3 px blue outline via `focus-visible`
- **Sufficient contrast** — Tailwind blue-700 on white passes WCAG AA

## License

MIT
