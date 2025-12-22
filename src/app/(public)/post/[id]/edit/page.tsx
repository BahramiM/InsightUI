import TitleBar from "@/components/shared/TitleBar/TitleBar";
import { CreatePostForm } from "@/features/posts/components/forms/CreatePostForm";

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div>
      <TitleBar title="Edit Post" />
      <CreatePostForm postId={id} />
    </div>
  );
}
