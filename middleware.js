import { next } from '@vercel/edge';

export default function middleware(req) {
  const origin = req.headers.get('origin') || '*';
  
  return next({
    headers: {
      // CORS Headers - Maximum Cross-Origin Access
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers, X-Custom-Header',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Expose-Headers': 'Content-Length, X-JSON-Response, X-Custom-Header, Content-Range',
      
      // Security Headers
      'Referrer-Policy': 'no-referrer',
      'X-Frame-Options': 'ALLOWALL',
      'X-Content-Type-Options': 'nosniff',
      'X-DNS-Prefetch-Control': 'on',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      
      // Additional Permissive Headers
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Permissions-Policy': '*=()',
    },
  });
}