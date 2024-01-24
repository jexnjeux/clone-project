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
  tags: Tag[];
  width: number;
  height: number;
  user: User;
  likes: number;
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
