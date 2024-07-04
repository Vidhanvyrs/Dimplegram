import { useContext } from "react";
import { myassets } from "../../../public/spotify-assets/assets/assets";
import { PlayerContext } from "@/context/PlayerContext";

const Player = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
  } = context;
  return (
    <div className="fixed bottom-0 left-56 right-0 h-[10%] bg-black flex justify-between items-center text-white px-4 gap-14">
      <div className="items-center hidden gap-4 lg:flex">
        <img className="w-12" src={track.image} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex-col items-center gap-1 px-4 m-auto">
        <div className="flex items-center justify-center gap-4">
          <img
            className="w-4 cursor-pointer"
            src={myassets.shuffle_icon}
            alt=""
          />
          <img
            onClick={previous}
            className="w-4 cursor-pointer"
            src={myassets.prev_icon}
            alt=""
          />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={myassets.pause_icon}
              alt=""
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={myassets.play_icon}
              alt=""
            />
          )}
          <img
            onClick={next}
            className="w-4 cursor-pointer"
            src={myassets.next_icon}
            alt=""
          />
          <img className="w-4 cursor-pointer" src={myassets.loop_icon} alt="" />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            onClick={seekSong}
            ref={seekBg}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="w-0 h-1 bg-purple-800 border-none rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>
      <div className="items-center hidden gap-2 opacity-75 lg:flex">
        <img className="w-4" src={myassets.queue_icon} alt="" />
        <img className="w-4" src={myassets.speaker_icon} alt="" />
        <img className="w-4" src={myassets.volume_icon} alt="" />
        <div className="w-20 h-1 rounded bg-slate-50"></div>
        <img className="w-4" src={myassets.mini_player_icon} alt="" />
        <img className="w-4" src={myassets.zoom_icon} alt="" />
      </div>
    </div>
  );
};

export default Player;
