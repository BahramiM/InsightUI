export type Post = {
  id: number;
  title: string;
  created_at: string;
  description: string;
  image_url?: string;
  author: {
    name: string;
  };
};
