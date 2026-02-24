export function getColorBasedOnText(text: string) {
  // Simple hash
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Map hash → hue (0–360)
  const hue = Math.abs(hash) % 360;

  // Fixed saturation + lightness for consistent look
  const saturation = 65;
  const lightness = 55;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function getContrastTextColor(hsl: string): string {
  const match = hsl.match(/(\d+)%\)$/);
  const lightness = match ? parseInt(match[1], 10) : 55;

  return lightness > 60 ? "#000000" : "#FFFFFF";
}