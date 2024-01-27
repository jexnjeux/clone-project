import { create } from 'zustand';
import { PhotoItem } from '../types/photos';
import { createJSONStorage, persist } from 'zustand/middleware';

interface BookmarkStore {
  bookmarks: { [id: string]: PhotoItem };
  toggleBookmark: (image: PhotoItem) => void;
}

export const useBookmarkStore = create(
  persist<BookmarkStore>(
    (set) => ({
      bookmarks: {},
      toggleBookmark: (image) => {
        const { id } = image;
        set((state) => {
          const newBookmarks = { ...state.bookmarks };
          if (newBookmarks[image.id]) {
            delete newBookmarks[image.id];
          } else {
            newBookmarks[id] = image;
          }
          return {
            ...state,
            bookmarks: newBookmarks,
          };
        });
      },
    }),
    {
      name: 'bookmark-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
// export const useBookmarkStore = create<BookmarkStore>((set) => ({
//   bookmarks: {},
//   toggleBookmark: (image) => {
//     const { id } = image;
//     set((state) => ({
//       bookmarks: {
//         ...state.bookmarks,
//         [id]: state.bookmarks[id] ? undefined : image,
//       },
//     }));
//   },
// }));
