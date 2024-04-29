import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useInView } from "react-intersection-observer";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedValue);

  console.log(posts);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="w-full h-full flex-center">
        <Loader />
      </div>
    );
  }
  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every(
      (item) => item && item.documents && item.documents.length === 0
    );
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="w-full h3-bold md:h2-bold">Search Posts</h2>
        <div className="flex w-full gap-1 px-4 rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" width={24} />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full max-w-5xl mt-16 flex-between mb-7">
        <h2 className="body-bold md:h3-bold">Popular Today</h2>
        <div className="gap-3 px-4 py-2 cursor-pointer flex-center bg-dark-3 rounded-xl">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>
      <div className="flex flex-wrap w-full max-w-5xl gap-9">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="w-full mt-10 text-center text-light-4">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList
              key={`page-${index}`}
              posts={item && item.documents ? item.documents : []}
            />
          ))
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
