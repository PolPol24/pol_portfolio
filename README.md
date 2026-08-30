# Portfolio website

This is a minimal, static portfolio site you can customize and publish.

## Customize

- Edit the content in `index.html` (name, about, project titles, contact).
- Update `styles.css` to change colors, spacing, and typography.
- Add or edit `activities` in `script.js` to show graded work (place images in `assets/activities/`).

## Preview locally

Open the folder in VS Code and use the Live Server extension, or run a simple static server. Example using Python 3:

```bash
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

## Deploy

You can publish this site with GitHub Pages or any static host. Push the repo to GitHub and enable Pages for the branch, or use Netlify/Vercel for easy deploys.

## Next steps

- Add project detail pages in the `work/` folder and link them from the projects section.
- Add real images into `assets/activities/` and update `script.js` entries.
- Want a contact backend? I can scaffold a serverless form endpoint next.
