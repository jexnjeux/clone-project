import { PHOTOS_PER_PAGE } from '../../constants/pagination';
import PhotoSkeleton from '../shared/PhotoSkeleton';
import Photos from '../shared/Photos';

function RenderPhotoSkeleton() {
  return (
    <Photos totalImages={PHOTOS_PER_PAGE}>
      {Array.from({ length: PHOTOS_PER_PAGE }).map((_, index) => (
        <PhotoSkeleton key={index} />
      ))}
    </Photos>
  );
}

export default RenderPhotoSkeleton;
