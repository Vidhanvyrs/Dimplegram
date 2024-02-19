import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  //what are the current likes on the specific post
  const likesList = post?.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeleteSavedPost();
  //we need to know about the recently logged in user
  const { data: currentUser } = useGetCurrentUser();
  //this function will give us information about which post has the user saved and all the information that the useUserContext is usually was giving before
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
    //or you can do like this !!savedPostRecord
    //{saved: true} => !savedPostedRecord => !false = true;
    //{saved: false} => !savedPostedRecord => !true = false;
  }, [currentUser]);
  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation(); //clicking this won't take you to postDetails which we are doing through Link tag
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };
  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    // const savedPostRecord = currentUser?.save.find(
    //   (record: Models.Document) => record.$id === post.$id
    // );
    //if statement to delete the save
    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      console.log({ userId });
      savePost({ postId: post?.$id || "", userId: userId });
      setIsSaved(true);
    }
  };
  return (
    <div className="z-20 flex items-center justify-between">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />

        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isSavingPost || isDeletingSaved ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="like"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
