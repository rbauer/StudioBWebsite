# Studio B LLC — website

Static site for **https://www.studiob.llc**, hosted on GitHub Pages. Plain HTML, CSS and JavaScript — no build step, no dependencies.

## Structure

```
index.html               Home
privacy-policy.html      Served at /privacy-policy
terms-of-service.html    Served at /terms-of-service
404.html                 Custom not-found page (self-contained on purpose)
assets/css/site.css      All styles
assets/js/site.js        Shared: scroll reveals, footer year, legal-page contents tracking
assets/js/home.js        The Design → Build → Launch demo phone
assets/mark-*.svg        Vector logo marks, traced from logo.png
assets/img/og-image.png  Link-preview image (1200 × 630)
favicon.*, apple-touch-icon.png
robots.txt, sitemap.xml, .nojekyll
scripts/serve.py         Local preview server
```

All internal links and asset paths are relative, so the site works both at the custom domain and at the
`rbauer.github.io/StudioBWebsite/` preview address.

## Preview locally

```
python scripts/serve.py
```

Then open http://127.0.0.1:4173. The script mimics GitHub Pages: `/privacy-policy` resolves to
`privacy-policy.html`, and missing paths return `404.html`. (`python -m http.server` does neither.)

## Publish

1. Push to `main`.
2. Repo **Settings → Pages → Build and deployment**: Source **Deploy from a branch**, branch **main**, folder **/ (root)**.
3. Check the preview at https://rbauer.github.io/StudioBWebsite/.

## Move the domain from Google Sites

Do these together, once the preview looks right.

1. **Verify the domain** (recommended; prevents takeover): GitHub account **Settings → Pages → Add a domain** →
   `studiob.llc`, then add the TXT record it gives you at Dynadot.
2. Repo **Settings → Pages → Custom domain**: `www.studiob.llc` → Save. GitHub commits a `CNAME` file.
3. At Dynadot (**Dynadot DNS** mode — leave that dropdown alone):

   | Section | Type | Value |
   |---|---|---|
   | Domain record (root) | A | `185.199.108.153` |
   | Domain record (root) | A | `185.199.109.153` |
   | Domain record (root) | A | `185.199.110.153` |
   | Domain record (root) | A | `185.199.111.153` |
   | Subdomain `www` | CNAME | `rbauer.github.io` |

   Optional IPv6 on the root: AAAA `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

   **Remove** the root **Forward** record — the A records replace it, and GitHub serves the bare domain itself,
   with its own certificate. **Keep** the MX record (email) and the TXT records.
4. When GitHub shows the certificate as issued, tick **Enforce HTTPS**.
5. Afterwards, unpublish the Google Site or remove its custom URL, so nothing else claims the domain.

## Keep the privacy policy true

The policy describes what this site actually does: no cookies, no analytics, hosting on GitHub Pages, fonts from
Google Fonts. If any of that changes — analytics, a contact form, embeds, self-hosted fonts — update
Sections 1 and 3 of `privacy-policy.html` and its effective date.
