export function getPasskeyName(
  transports: string[],
  authenticatorAttachment: string | undefined,
  userAgent: string,
): string {
  // Detect OS
  const os = /iphone|ipad/i.test(userAgent)
    ? 'iOS'
    : /mac/i.test(userAgent)
      ? 'macOS'
      : /android/i.test(userAgent)
        ? 'Android'
        : /win/i.test(userAgent)
          ? 'Windows'
          : /linux/i.test(userAgent)
            ? 'Linux'
            : 'Unknown OS';

  // Detect browser
  const browser = /edg\//i.test(userAgent)
    ? 'Edge'
    : /chrome/i.test(userAgent)
      ? 'Chrome'
      : /safari/i.test(userAgent)
        ? 'Safari'
        : /firefox/i.test(userAgent)
          ? 'Firefox'
          : 'Browser';

  // Hardware key
  if (
    transports.includes('usb') ||
    transports.includes('nfc') ||
    transports.includes('ble')
  ) {
    return 'Hardware Security Key';
  }

  // Synced passkey
  if (transports.includes('hybrid') || transports.includes('internal')) {
    return `${browser} on ${os}`;
  }

  return `${browser} on ${os}`;
}
