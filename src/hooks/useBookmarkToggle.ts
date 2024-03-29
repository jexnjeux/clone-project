import { useBookmarkStore } from '../stores/bookmark';
import { PhotoItem } from '../types/photos';

const useBookmarkToggle = () => {
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  const handleBookmarkToggle = (image: PhotoItem) => {
    toggleBookmark(image);
  };

  const getBookmarkStatus = (id: string) => {
    return !!bookmarks[id] || false;
  };

  return { handleBookmarkToggle, getBookmarkStatus };
};

export default useBookmarkToggle;
