# Movies9Hub (Legal Movie Catalog Template)

Movies9Hub is a static, legal movie catalog template. It showcases a grid of 100 placeholder movies with search, filters, sorting, and a details modal. No copyrighted content is included.

## Features
- 100 placeholder movies pre-populated
- Search by title
- Filter by genre and year
- Sort by title, year, or rating
- Responsive, accessible UI
- Details modal with optional trailer and download link support (for lawful content only)

## Legal Notice
- Do not upload or link to any content you do not own or have explicit rights to share.
- If you work with public domain films, verify public domain status in your jurisdiction.
- This template intentionally does not include any copyrighted media.

## Getting Started

Open `index.html` directly in a browser, or serve the folder with a simple static server:

```bash
# Python 3
python3 -m http.server 8080 --directory ./movies9hub
# Then open http://localhost:8080
```

## Customizing Content
- Edit `app.js` and replace placeholder data with your own catalog entries.
- For each movie object, you may optionally add `trailerUrl` and `downloadUrl` fields.
  - Only set `downloadUrl` for content you own or have rights to distribute.
  - Consider hosting your own lawful files or using platforms that you have rights to use.
- Update the site name, branding, and colors in `index.html` and `styles.css`.

## Deployment
Any static host works:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

Just deploy the `movies9hub` directory.

## Attribution
This template was auto-generated as a safe alternative to piracy sites. Use responsibly.