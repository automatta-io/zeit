import { FeedItems } from "./FeedItems";
import { FeedListNavbar } from "./FeedListNavbar"

export const FeedList = async () => {
  return (
    <>
      <FeedListNavbar />
      <FeedItems />
    </>
  );
}
