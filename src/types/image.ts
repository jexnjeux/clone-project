export interface Image {
  alt_description: string | null;
  blur_hash: string;
  breadcrumbs?: {
    index: number;
    slug: string;
    title: string;
    type: string;
  }[];
  color: string;
  created_at: string;
  current_user_collections: [];
  description: string | null;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: Links;
  promoted_at: string | null;
  slug: string;
  sponsorship: string | null;
  tags: Tag[];
  topic_submissions?: TopicSubmissions;
  updated_at: string;
  urls: Urls;
  user: User;
  width: number;
}

interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}
interface User {
  accepted_tos: boolean;
  bio: string | null;
  first_name: string;
  for_hire: boolean;
  id: string;
  instagram_username: string | null;
  last_name: string;
  links: UserLinks;
  location: string | null;
  name: string;
  portfolio_url: string | null;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  social: UserSocial;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  twitter_username: string | null;
  updated_at: string;
  username: string;
}

interface UserLinks {
  followers: string;
  following: string;
  html: string;
  likes: string;
  photos: string;
  portfolio: string;
  self: string;
}

interface UserSocial {
  instagram_username: string | null;
  paypal_email: string | null;
  portfolio_url: string | null;
  twitter_username: string | null;
}

interface Urls {
  full: string;
  raw: string;
  regular: string;
  small: string;
  thumb: string;
}

interface Tag {
  type: string;
  title: string;
  source: TagSource;
}

interface TagSource {
  ancestry: TagAncestry;
  cover_photo: Image;
  description: string;
  meta_description: string;
  meta_title: string;
  subtitle: string;
  title: string;
  type: string;
}

interface TagAncestry {
  category: TagCategory;
  subcategory: TagSubcategory;
  type: TagType;
}

interface TagCategory {
  slug: string;
  pretty_slug: string;
}

interface TagSubcategory {
  slug: string;
  pretty_slug: string;
}

interface TagType {
  slug: string;
  pretty_slug: string;
}

interface TopicSubmissions {
  [key: string]: TopicSubmissionDetail;
}

interface TopicSubmissionDetail {
  status: string;
  approved_on?: string; // 선택적 필드
}

export interface ImageItem {
  id: string;
  alt_description: string | null;
  created_at: string;
  liked_by_user: boolean;
  urls: Urls;
  links: Links;
  tags: string[];
  width: number;
  height: number;
  user: User;
  downloads: number;
}

export interface SearchAxiosResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

export interface SearchResponse {
  results: ImageItem[];
  total: number;
  total_pages: number;
}

// 이미지 상세
export interface PhotoAxiosResponse {
  alt_description: string | null;
  blur_hash: string;
  breadcrumbs: Breadcrumbs[];
  color: string;
  created_at: string;
  current_user_collections: UserCollections[];
  description: string | null;
  downloads: number;
  exif: {
    aperture: string;
    exposure_time: string;
    focal_length: string;
    iso: number;
    make: string;
    model: string;
    name: string;
  };
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: Links;
  location: {
    city: string | null;
    country: string | null;
    name: string | null;
    position: {
      latitude: number | null;
      longitude: number | null;
    };
  };
  meta: {
    index: boolean;
  };
  promoted_at: string | null;
  public_domain: boolean;
  related_collections: {
    total: number;
    type: string;
    results: RelatedCollectionsResult[];
  };
  slug: string;
  sponsorship: string | null; // 모름
  tags: Tag[];
  tags_preview: Tag[];
  topic_submissions?: TopicSubmissions;
  topics: Topic[];
  updated_at: string;
  urls: Urls;
  user: User;
  views: number;
  width: number;
}

interface UserCollections {
  id: number;
  title: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  cover_photo: string | null;
  user: User | null;
}

interface Breadcrumbs {
  index: number;
  slug: string;
  title: string;
  type: string;
}

interface RelatedCollectionsResult {
  cover_photo: Image;
  description: string | null;
  featured: boolean;
  id: string;
  last_collected_at: string;
  links: {
    html: string;
    photos: string;
    related: string;
    self: string;
  };
  preview_photos: {
    blur_hash: string;
    created_at: string;
    id: string;
    slug: string;
    updated_at: string;
    urls: Urls;
  }[];
  private: boolean;
  published_at: string;
  share_key: string;
  tags: Tag;
  title: string;
  total_photos: number;
  updated_at: string;
  user: User;
}

interface Topic {
  id: string;
  slug: string;
  title: string;
  visibility: string;
}

export interface PhotoResponse {
  id: string;
  alt_description: string | null;
  created_at: string;
  liked_by_user: boolean;
  urls: Urls;
  links: Links;
  tags: string[];
  width: number;
  height: number;
  user: User;
  downloads: number;
}

export interface RandomResponse {
  results: ImageItem[];
}
