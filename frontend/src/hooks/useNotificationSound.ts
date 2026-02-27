import { useRef } from "react";

type SoundName = "newMessage" | "sent";

const SOUNDS: Record<SoundName, string> = {
  newMessage: "/sounds/notification.mp3",
  sent: "/sounds/sent.mp3",
};

export function useNotificationSound() {
  const audioCache = useRef<Partial<Record<SoundName, HTMLAudioElement>>>({});

  const playSound = (sound: SoundName) => {
    // Reuse cached Audio instance
    if (!audioCache.current[sound]) {
      audioCache.current[sound] = new Audio(SOUNDS[sound]);
    }

    const audio = audioCache.current[sound]!;
    audio.currentTime = 0; // Restart when already playing
    audio.play().catch(() => {
      // Browser blocks autoplay before first user interaction -> Ignore
    });
  };

  return { playSound };
}
