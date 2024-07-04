import { useNavigate } from "react-router-dom";
import { myassets } from "../../../public/spotify-assets/assets/assets";

const SongNav = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between w-full font-semibold bg-transparent ">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 p-2 bg-black cursor-pointer rounded-2xl"
            src={myassets.arrow_left}
            alt="left-arrow"
          />
          <img
            onClick={() => navigate(+1)}
            className="w-8 p-2 bg-black cursor-pointer rounded-2xl"
            src={myassets.arrow_right}
            alt="right-arrow"
          />
        </div>
      </div>
    </>
  );
};

export default SongNav;
