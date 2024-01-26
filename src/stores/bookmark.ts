import { create } from 'zustand';
import { ImageItem } from '../types/image';
import { createJSONStorage, persist } from 'zustand/middleware';

interface BookmarkStore {
  bookmarks: { [id: string]: ImageItem | undefined };
  toggleBookmark: (image: ImageItem) => void;
}

export const useBookmarkStore = create(
  persist<BookmarkStore>(
    (set) => ({
      bookmarks: {},
      toggleBookmark: (image) => {
        const { id } = image;
        set((state) => ({
          bookmarks: {
            ...state.bookmarks,
            [id]: state.bookmarks[id] ? undefined : image,
          },
        }));
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
