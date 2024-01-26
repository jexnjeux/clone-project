import { useBookmarkStore } from '../stores/bookmark';
import { ImageItem } from '../types/image';

const useToggleBookmark = () => {
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  const handleToggleBookmark = (image: ImageItem) => {
    toggleBookmark(image);
  };

  const getBookmarkStatus = (id: string) => {
    return bookmarks[id] ?? false;
  };

  return { handleToggleBookmark, getBookmarkStatus };
};

export default useToggleBookmark;
