import { useEffect, useRef } from 'react';
import twilightZone from '../audio/SpotiDownloader.com - twilight zone - Aaron Hibell.mp3'; // ✅ Import your audio file

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0.3;
        audio
          .play()
          .then(() => {
            console.log('Music started successfully');
          })
          .catch((err) => {
            console.warn('Autoplay failed:', err);
          });
      }

      // Remove listeners after first interaction
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
    };

    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);

    // Cleanup
    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
    };
  }, []);

  return (
    <audio ref={audioRef} loop preload="auto" style={{ display: 'none' }}>
      <source src={twilightZone} type="audio/mpeg" />
    </audio>
  );
};

export default MusicPlayer;
