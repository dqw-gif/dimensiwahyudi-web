/**
 * Lightweight, zero-JSDOM HTML sanitizer for trusted editorial content (WordPress / Admin CMS).
 * Eliminates the heavy `jsdom` + `isomorphic-dompurify` CPU overhead on Vercel Serverless Functions
 * while stripping dangerous tags, inline event handlers, and unsafe URI schemes.
 */

const DANGEROUS_TAG_BLOCKS = /<(script|style|object|embed|applet|form|input|button|textarea|select|base|meta|link)\b[^>]*>[\s\S]*?<\/\1>/gi;
const DANGEROUS_SELF_CLOSING_TAGS = /<(script|style|object|embed|applet|form|input|button|textarea|select|base|meta|link)\b[^>]*\/?>/gi;
const EVENT_HANDLER_ATTRS = /\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const UNSAFE_URI_ATTRS = /\s+(href|src|action|formaction|xlink:href)\s*=\s*(?:"\s*(?:javascript|vbscript|data:text\/html)[^"]*"|'\s*(?:javascript|vbscript|data:text\/html)[^']*'|(?:\s*(?:javascript|vbscript|data:text\/html)[^\s>]+))/gi;

export function sanitizeEditorialHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(DANGEROUS_TAG_BLOCKS, '')
    .replace(DANGEROUS_SELF_CLOSING_TAGS, '')
    .replace(EVENT_HANDLER_ATTRS, '')
    .replace(UNSAFE_URI_ATTRS, '');
}

const EXCERPT_ALLOWED_TAGS = new Set(['p', 'br', 'strong', 'em', 'b', 'i', 'a', 'span']);

export function sanitizeExcerptHtml(html: string): string {
  if (!html) return '';
  const cleaned = sanitizeEditorialHtml(html);
  // Strip any tags not in EXCERPT_ALLOWED_TAGS while preserving inner text
  return cleaned.replace(/<\/?([a-zA-Z0-9-]+)\b[^>]*>/g, (match, tagName: string) => {
    const lower = tagName.toLowerCase();
    if (!EXCERPT_ALLOWED_TAGS.has(lower)) {
      return '';
    }
    return match;
  });
}
