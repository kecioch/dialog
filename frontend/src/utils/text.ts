export function getInitialsFromName(fullName: string): string {
  if (!fullName) return "";

  const words = fullName
    .trim()
    .split(/\s+/) // handles multiple spaces
    .filter(Boolean);

  if (words.length === 0) return "";

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  // Only first two words matter
  return (words[0][0] + words[1][0]).toUpperCase();
}
