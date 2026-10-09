/**
 * String sanitizer to strip potential script injection and trim whitespace
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    // Strip HTML tags
    .replace(/<[^>]*>?/gm, '')
    // Normalize newlines
    .replace(/\r\n/g, '\n');
}

export function sanitizeOptionalString(input: unknown): string | undefined {
  if (typeof input !== 'string') return undefined;
  const sanitized = sanitizeString(input);
  return sanitized.length > 0 ? sanitized : undefined;
}

export function sanitizeStringArray(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  return input
    .map(item => sanitizeString(item))
    .filter(item => item.length > 0);
}
