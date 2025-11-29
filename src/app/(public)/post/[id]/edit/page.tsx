import { CreatePostForm } from "@/features/posts/components/forms/CreatePostForm";

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div>
      <div className="my-8">Edit Post</div>
      <CreatePostForm postId={id} />
    </div>
  );
}
