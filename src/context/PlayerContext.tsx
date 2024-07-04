import { songsData } from "../../public/spotify-assets/assets/assets";
import {
  createContext,
  ReactNode,
  useRef,
  RefObject,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

// Define the structure for the track
interface Track {
  id: number; // Added id to Track structure
  name: string;
  desc: string;
  image: string;
  file: string;
}

// Define the structure for the time
interface Time {
  currentTime: {
    second: number;
    minute: number;
  };
  totalTime: {
    second: number;
    minute: number;
  };
}

// Define the context value type
interface PlayerContextType {
  audioRef: RefObject<HTMLAudioElement>;
  seekBg: RefObject<HTMLDivElement>;
  seekBar: RefObject<HTMLHRElement>;
  track: Track;
  setTrack: Dispatch<SetStateAction<Track>>;
  playStatus: boolean;
  setPlayStatus: Dispatch<SetStateAction<boolean>>;
  time: Time;
  setTime: Dispatch<SetStateAction<Time>>;
  play: () => void;
  pause: () => void;
  playWithId: (id: number) => Promise<void>;
  previous: () => Promise<void>;
  next: () => Promise<void>;
  seekSong: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>;
}

// Create the context with a default value or undefined
export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);

interface PlayerContextProviderProps {
  children: ReactNode;
}

const PlayerContextProvider: React.FC<PlayerContextProviderProps> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekBg = useRef<HTMLDivElement>(null);
  const seekBar = useRef<HTMLHRElement>(null);

  const [track, setTrack] = useState<Track>(songsData[0]);
  const [playStatus, setPlayStatus] = useState<boolean>(false);
  const [time, setTime] = useState<Time>({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  // Function to play the song
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Function to pause the song
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  // Function to play any song by id
  const playWithId = async (id: number) => {
    setTrack(songsData[id]);
  };

  // Function to play the previous song
  const previous = async () => {
    if (track.id > 0) {
      setTrack(songsData[track.id - 1]);
    }
  };

  // Function to play the next song
  const next = async () => {
    if (track.id < songsData.length - 1) {
      setTrack(songsData[track.id + 1]);
    }
  };

  // Monitor track state change and play the song
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.3;
      setPlayStatus(true);
    }
  }, [track]);

  const seekSong = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): Promise<void> => {
    if (audioRef.current && seekBg.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
      console.log(audioRef.current.currentTime);
    }
  };

  // Function to handle time updates
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current && seekBar.current) {
        // To increase the bar which is under the controls
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.ontimeupdate = handleTimeUpdate;
    }

    // Clean up the event listener on component unmount
    return () => {
      if (audioElement) {
        audioElement.ontimeupdate = null;
      }
    };
  }, [audioRef]);

  const contextValue: PlayerContextType = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
