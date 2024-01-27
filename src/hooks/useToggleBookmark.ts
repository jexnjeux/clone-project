import { useBookmarkStore } from '../stores/bookmark';
import { PhotoItem } from '../types/photos';

const useToggleBookmark = () => {
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  const handleToggleBookmark = (image: PhotoItem) => {
    toggleBookmark(image);
  };

  const getBookmarkStatus = (id: string) => {
    return !!bookmarks[id] ?? false;
  };

  return { handleToggleBookmark, getBookmarkStatus };
};

export default useToggleBookmark;
