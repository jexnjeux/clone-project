import { PhotoItem } from '../../types/photos';
import Photo from '../shared/Photo';

interface PhotosProps {
  apiError: boolean;
  photos: PhotoItem[];
  onClickPhoto: (id: string) => Promise<void>;
}

function RenderPhotos({ photos, onClickPhoto }: PhotosProps) {
  return (
    <>
      {photos.map((photo) => {
        return (
          <Photo
            key={photo.id}
            photo={photo}
            alt={photo.alt_description ?? photo.id}
            url={photo.urls.small}
            onClick={() => void onClickPhoto(photo.id)}
          />
        );
      })}
    </>
  );
}

export default RenderPhotos;
