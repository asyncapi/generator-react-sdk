const ALLOWED_EXTS = ['js', 'jsx', 'cjs'];

export function isJsFile(filename: string) {
  const ext = filename.split('.').pop() || '';
  return ALLOWED_EXTS.includes(ext);
}
