import { useParams } from "react-router-dom";
import SongNav from "./SongNav";
import {
  albumsData,
  myassets,
  songsData,
} from "../../../public/spotify-assets/assets/assets";
import { PlayerContext } from "@/context/PlayerContext";
import { useContext } from "react";

const DisplayAlbum = () => {
  const { id } = useParams<{ id: string }>();
  const albumData = id !== undefined ? albumsData[parseInt(id)] : undefined;
  const context = useContext(PlayerContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { playWithId } = context;
  if (!albumData) {
    return <div>Album not found</div>;
  }

  console.log(albumData);

  return (
    <>
      <SongNav />
      <div className="flex flex-col gap-8 mt-10 md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="mb-4 text-5xl font-bold md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <b>Dimplify</b>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 pl-2 mt-10 mb-4 sm:grid-cols-4 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="w-4 m-auto" src={myassets.clock_icon} alt="" />
      </div>
      <hr />
      {songsData.map((item, index) => (
        <div
          onClick={() => playWithId(item.id)}
          key={index}
          className="grid grid-cols-3 gap-2 p-2 sm:grid-cols-4 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img className="inline w-10 mr-5" src={item.image} alt="" />
            {item.name}
          </p>
          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </>
  );
};

export default DisplayAlbum;
