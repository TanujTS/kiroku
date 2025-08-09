// Basic types for our blog application

export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: Date;
  updated_at: Date;
  published: boolean;
}

export interface Comment {
  id: number;
  content: string;
  post_id: number;
  author_id: number;
  created_at: Date;
}
