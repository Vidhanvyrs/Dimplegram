import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { albumsData } from "../../../public/spotify-assets/assets/assets";
import { useEffect, useRef } from "react";

const Display = () => {
  const displayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isAlbumPage = location.pathname.includes("/album/");
  const albumId = isAlbumPage ? location.pathname.split("/").pop() : "";
  const bgColor = albumId ? albumsData[Number(albumId)].bgColor : "#121212";

  useEffect(() => {
    if (displayRef.current) {
      if (isAlbumPage) {
        displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
      } else {
        displayRef.current.style.background = `#121212`;
      }
    }
  }, [isAlbumPage, bgColor]);

  return (
    <div
      ref={displayRef}
      className={`m-2 px-6 pt-4 rounded text-white overflow-auto ${
        isAlbumPage ? "w-full" : "lg:w-[75%] lg:ml-0"
      }`}
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
