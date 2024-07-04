import { PlayerContext } from "@/context/PlayerContext";
import { useContext } from "react";

type SongItemProps = {
  image: string;
  name: string;
  desc: string;
  id: number;
};
const SongItem = ({ name, image, desc, id }: SongItemProps) => {
  const context = useContext(PlayerContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { playWithId } = context;
  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded" src={image} alt="" />
      <p className="mt-2 mb-1 font-bold">{name}</p>
      <p className="text-sm text-slate-200">{desc}</p>
    </div>
  );
};

export default SongItem;
