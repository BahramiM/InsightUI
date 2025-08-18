import { Post } from "@/types/post";

export const PostCard = ({ post }: { post: Post }) => {
  return <div>{post.title}</div>;
};
