const http = require('http');
const url = require('url');

const proxyHandler = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const targetUrl = parsedUrl.query.url;

    if (!targetUrl) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Error: No target URL provided.');
        return;
    }

    const options = {
        method: req.method,
        headers: req.headers,
    };

    const proxyReq = http.request(targetUrl, options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
        console.error('Proxy error:', err);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error occurred while handling the request.');
    });

    req.pipe(proxyReq, { end: true });
};

const server = http.createServer(proxyHandler);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(
        `Proxy server is running on port ${PORT}...`);
});