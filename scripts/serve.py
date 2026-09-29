"""Local preview server that behaves like GitHub Pages.

    python scripts/serve.py [port]        (default port 4173)

Differences from `python -m http.server`, matching how GitHub Pages serves this site:
  * /privacy-policy is served from privacy-policy.html (extensionless URLs)
  * any missing path returns 404.html with a 404 status
"""
import http.server
import io
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class PagesHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        url_path = self.path.split("?", 1)[0].split("#", 1)[0]
        fs_path = self.translate_path(url_path)
        if not os.path.exists(fs_path) and os.path.isfile(fs_path + ".html"):
            self.path = url_path + ".html"
            return super().send_head()
        if not os.path.exists(fs_path):
            body = open(os.path.join(ROOT, "404.html"), "rb").read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            return io.BytesIO(body)
        return super().send_head()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    with http.server.ThreadingHTTPServer(("127.0.0.1", port), PagesHandler) as srv:
        print(f"Serving {ROOT} at http://127.0.0.1:{port}/")
        srv.serve_forever()
