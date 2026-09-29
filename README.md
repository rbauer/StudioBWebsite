# Studio B LLC — website

Static site for **https://studiob.llc**, hosted on GitHub Pages. Plain HTML, CSS and JavaScript — no build step, no dependencies.

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

## Domain

The custom domain is **`studiob.llc`** (the bare domain), recorded in the `CNAME` file. GitHub redirects
`www.studiob.llc` and plain `http://` to `https://studiob.llc`, keeping the path, so older `www` links still work.
The certificate covers both hosts and renews automatically; **Enforce HTTPS** is on.

DNS at Dynadot (**Dynadot DNS** mode — leave that dropdown alone):

| Section | Type | Value |
|---|---|---|
| Domain record (root) | A | `185.199.108.153` |
| Domain record (root) | A | `185.199.109.153` |
| Domain record (root) | A | `185.199.110.153` |
| Domain record (root) | A | `185.199.111.153` |
| Domain record (root) | TXT | SPF and site-verification records — keep |
| Subdomain `www` | CNAME | `rbauer.github.io` |
| Subdomain `_github-pages-challenge-rbauer` | TXT | GitHub domain-verification value — keep |

Email (MX) is managed under Dynadot's email settings and is unaffected by the site. There must be **no Forward
record** on the root: it conflicts with the A records and sends every URL to the home page.

Optional IPv6 on the root: AAAA `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

To check both Dynadot nameservers agree (they should return only the four `185.199.x.153` addresses):

```
nslookup studiob.llc ns1.dyna-ns.net
nslookup studiob.llc ns2.dyna-ns.net
```

The domain is **verified** with GitHub (account **Settings → Pages**), which stops any other GitHub account from
claiming it. That depends on the `_github-pages-challenge-rbauer` TXT record staying in place.

If you ever switch the primary host to `www`, update the absolute URLs in the page `<head>`s, `sitemap.xml` and
`robots.txt` to match.

## Keep the privacy policy true

The policy describes what this site actually does: no cookies, no analytics, hosting on GitHub Pages, fonts from
Google Fonts. If any of that changes — analytics, a contact form, embeds, self-hosted fonts — update
Sections 1 and 3 of `privacy-policy.html` and its effective date.
