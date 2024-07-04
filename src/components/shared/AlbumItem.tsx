import { Link } from "react-router-dom";
type AlbumItemProps = {
  image: string;
  name: string;
  desc: string;
  id: number;
  bgColor: string;
};
const AlbumItem = ({ image, name, desc, id }: AlbumItemProps) => {
  // const navigate = useNavigate();
  return (
    <Link to={`/songs/album/${id}`}>
      <div className="min-w-[260px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img className="rounded" src={image} alt="" />
        <p className="mt-2 mb-1 font-bold">{name}</p>
        <p className="text-sm text-slate-200">{desc}</p>
      </div>
    </Link>
  );
};

export default AlbumItem;
