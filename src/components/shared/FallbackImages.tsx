import { useEffect } from 'react';
import fallbackImages from '../../data/fallbackImages.json';
import Photo from './Photo';
import { PhotoItem } from '../../types/photos';

function FallbackImages() {
  useEffect(() => {});
  return (
    <>
      {fallbackImages.map((image: Partial<PhotoItem>) => {
        return (
          <>
            <Photo
              isFallback
              key={image.id}
              photo={image as PhotoItem}
              url={`/fallback/fallback-image${image.id}.jpeg`}
              alt="fallback"
              onClick={() => {}}
            />
          </>
        );
      })}
    </>
  );
}

export default FallbackImages;
