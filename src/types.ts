export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  isFollowed?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  location: string;
  date: string;
  images: string[];
  videoUrl?: string;
  seller: Seller;
  likesCount: number;
  viewsCount: number;
  sharesCount: number;
  comments: Comment[];
  hasDelivery: boolean;
  parameters: { [key: string]: string };
}
